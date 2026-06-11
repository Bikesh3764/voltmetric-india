import { NextResponse } from 'next/server';
import { RealAIExtractionResult } from '@/components/calculator/types';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only images (JPEG, PNG, WEBP) are supported for OCR at this time.' }, { status: 400 });
    }

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    const dataURI = `data:${file.type};base64,${base64Image}`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not configured.");
    }

    const systemPrompt = `You are an expert Document AI specialized in extracting data from electricity bills in India.
Your task is to analyze the provided image of a document and extract the billing information strictly matching the JSON schema below.

Important Rules:
1. isElectricityBill: boolean. True if the document is actually an electricity bill. False otherwise (e.g. if it's a random image, a grocery receipt, or a cat).
2. overallConfidence: number between 0 and 1. How confident are you that this is a readable electricity bill? If it's blurry, return a low score.
3. For each field, provide:
   - "value": The extracted value (string or number). Use null if missing or unreadable.
   - "confidence": number between 0 and 1 representing your confidence in this specific extraction.
   - "evidence": The exact raw text snippet from the document that proves this value. Keep it short.

Return ONLY a valid JSON object matching this TypeScript interface exactly:
{
  "isElectricityBill": boolean,
  "documentType": string,
  "overallConfidence": number,
  "consumerNumber": { "value": string | null, "confidence": number, "evidence": string },
  "billNumber": { "value": string | null, "confidence": number, "evidence": string },
  "billingPeriod": { "value": string | null, "confidence": number, "evidence": string },
  "unitsConsumed": { "value": number | null, "confidence": number, "evidence": string },
  "totalAmount": { "value": number | null, "confidence": number, "evidence": string },
  "tariffCategory": { "value": string | null, "confidence": number, "evidence": string }
}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: "Extract the billing information from this document." },
              { type: "image_url", image_url: { url: dataURI, detail: "high" } },
            ],
          },
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI Error:", errorText);
      throw new Error(`OpenAI API failed with status ${response.status}`);
    }

    const resultData = await response.json();
    const content = resultData.choices[0].message.content;
    const parsedData = JSON.parse(content) as RealAIExtractionResult;

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("OCR API Error:", error);
    return NextResponse.json({ error: 'Failed to process document. ' + (error instanceof Error ? error.message : '') }, { status: 500 });
  }
}
