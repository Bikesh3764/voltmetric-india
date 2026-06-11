"use client";

import { useState, useRef } from "react";
import { TariffData, RealAIExtractionResult, ExtractedField } from "./types";
import { calculateBill } from "./utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText, ScanSearch, CheckCircle2, AlertTriangle, Lightbulb, Receipt, Zap, ShieldAlert, Fingerprint, CalendarDays, Hash } from "lucide-react";

interface Props {
  tariff: TariffData;
}

export function AIBillAnalyzer({ tariff }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [processingState, setProcessingState] = useState<"idle" | "uploading" | "scanning" | "analyzing" | "complete" | "error">("idle");
  const [result, setResult] = useState<RealAIExtractionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setProcessingState("uploading");
    setErrorMsg(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      setProcessingState("scanning");
      const res = await fetch("/api/analyze-bill", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const errData: Record<string, unknown> = await res.json().catch(() => ({}));
        throw new Error((errData.error as string) || "API request failed");
      }

      const data: RealAIExtractionResult = await res.json();
      setProcessingState("analyzing");
      
      // Simulate slight delay for analysis feel
      setTimeout(() => {
        setResult(data);
        
        if (!data.isElectricityBill) {
          setErrorMsg("This document does not appear to be an electricity bill.");
          setProcessingState("error");
          return;
        }

        if (data.overallConfidence < 0.6) {
          setErrorMsg("Unable to verify this electricity bill. The document might be too blurry or not supported.");
          setProcessingState("error");
          return;
        }

        setProcessingState("complete");
      }, 800);

    } catch (err: unknown) {
      console.error(err);
      setErrorMsg((err as Error).message || "An error occurred while communicating with the extraction API.");
      setProcessingState("error");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setErrorMsg(null);
    setProcessingState("idle");
  };

  const renderConfidenceBadge = (confidence: number) => {
    const percent = Math.round(confidence * 100);
    let color = "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
    if (confidence < 0.8) color = "text-amber-600 bg-amber-500/10 border-amber-500/20";
    if (confidence < 0.5) color = "text-red-600 bg-red-500/10 border-red-500/20";
    
    return (
      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${color} font-medium`}>
        {percent}% Match
      </span>
    );
  };

  const renderField = (label: string, icon: React.ReactNode, field: ExtractedField<unknown>, formatValue?: (val: unknown) => string) => {
    if (field.value === null) return null;
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              {icon} {label}
            </div>
            {renderConfidenceBadge(field.confidence)}
          </div>
          <div className="text-xl font-bold font-geist mb-3">
            {formatValue ? formatValue(field.value) : String(field.value)}
          </div>
          <div className="bg-muted p-2 rounded-md text-xs font-mono text-muted-foreground break-words relative group">
            <span className="block opacity-70 mb-1 uppercase tracking-wider text-[10px]">Evidence:</span>
            &quot;{field.evidence}&quot;
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderProcessing = () => {
    return (
      <Card className="w-full mt-6">
        <CardContent className="p-12 flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <ScanSearch className="h-16 w-16 text-primary animate-pulse" />
            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">OCR Processing Engine</h3>
            <p className="text-muted-foreground animate-pulse">
              {processingState === "uploading" && "Uploading document securely..."}
              {processingState === "scanning" && "Running Vision OCR to extract line items..."}
              {processingState === "analyzing" && "Validating evidence and confidence scores..."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 mt-6 animate-in fade-in duration-500">
      
      {processingState === "idle" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-primary" /> Real-time Bill Analyzer
            </CardTitle>
            <CardDescription>
              Upload a clear image of your electricity bill. Our vision API (Powered by OpenAI) will extract structured data with verified evidence.
              <br/><br/>
              <em>Note: Only images (JPG, PNG, WEBP) are supported for real-time OCR right now.</em>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="border-2 border-dashed border-primary/20 hover:border-primary/50 transition-colors rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer bg-primary/5"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handleFileChange}
              />
              <div className="p-4 bg-background rounded-full shadow-sm mb-4">
                <UploadCloud className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Click or drag an image to upload</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Supports JPG, PNG, WEBP up to 10MB. Document data is processed securely via OpenAI Vision OCR.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {(processingState === "uploading" || processingState === "scanning" || processingState === "analyzing") && renderProcessing()}

      {processingState === "error" && (
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <ShieldAlert className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Verification Failed</h3>
            <p className="text-red-600/80 dark:text-red-400/80 mb-6">{errorMsg}</p>
            <Button variant="outline" onClick={reset}>Try Another File</Button>
          </CardContent>
        </Card>
      )}

      {processingState === "complete" && result && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Extraction Verified</h2>
              <div className="flex items-center gap-2 mt-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-muted-foreground">Document Type: {result.documentType}</span>
                <span className="text-sm text-muted-foreground px-2">•</span>
                <span className="text-sm text-muted-foreground">Overall Confidence: {Math.round(result.overallConfidence * 100)}%</span>
              </div>
            </div>
            <Button variant="outline" onClick={reset}>Scan Another Bill</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderField("Consumer Number", <Fingerprint className="h-4 w-4 text-blue-500" />, result.consumerNumber)}
            {renderField("Bill Number", <Hash className="h-4 w-4 text-slate-500" />, result.billNumber)}
            {renderField("Billing Period", <CalendarDays className="h-4 w-4 text-orange-500" />, result.billingPeriod)}
            {renderField("Tariff Category", <FileText className="h-4 w-4 text-purple-500" />, result.tariffCategory)}
            {renderField("Units Consumed", <Zap className="h-4 w-4 text-yellow-500" />, result.unitsConsumed, (val) => `${val as number} kWh`)}
            {renderField("Total Amount", <Receipt className="h-4 w-4 text-emerald-500" />, result.totalAmount, (val) => `₹${(val as number).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`)}
          </div>

          {/* AI Insights - Strictly Gated by Extracted Values */}
          {result.unitsConsumed.value !== null && result.totalAmount.value !== null && result.unitsConsumed.confidence > 0.8 && result.totalAmount.confidence > 0.8 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
              <Card className="border-amber-500/20">
                <CardHeader className="bg-amber-500/5 pb-4">
                  <CardTitle className="text-lg flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="h-5 w-5" /> Why is my bill high?
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {(() => {
                      const fixedValue = parseFloat(tariff.fixedCharge.replace(/\D/g, '')) || 100;
                      const officialCalc = calculateBill(result.unitsConsumed.value as number, tariff.slabs, fixedValue, "Residential", "Monthly");
                      const diff = (result.totalAmount.value as number) - officialCalc.totalBill;
                      
                      const points = [];
                      if (diff > 50) {
                        points.push(`Extracted billed amount is ₹${diff.toFixed(2)} higher than the official base tariff estimate for ${result.unitsConsumed.value} units.`);
                      } else {
                        points.push("Bill amount aligns closely with official state tariff expectations.");
                      }
                      
                      if ((result.unitsConsumed.value as number) > 400) {
                        points.push(`High consumption detected (${result.unitsConsumed.value} units). You are hitting the highest tariff slabs, making each additional unit significantly more expensive.`);
                      }

                      return points.map((p, i) => (
                        <li key={i} className="flex gap-3">
                          <div className="mt-1 bg-amber-500/20 p-1 shrink-0 rounded-full"><AlertTriangle className="h-3 w-3 text-amber-600" /></div>
                          <span className="text-sm">{p}</span>
                        </li>
                      ));
                    })()}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-emerald-500/20">
                <CardHeader className="bg-emerald-500/5 pb-4">
                  <CardTitle className="text-lg flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <Lightbulb className="h-5 w-5" /> Evidence-Based Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                     <li className="flex gap-3">
                        <div className="mt-1 bg-emerald-500/20 p-1 shrink-0 rounded-full"><CheckCircle2 className="h-3 w-3 text-emerald-600" /></div>
                        <span className="text-sm">Since your usage is {result.unitsConsumed.value} units, upgrading old appliances (AC, Fridge) could yield a ~15% reduction (saving ~₹{((result.totalAmount.value as number) * 0.15).toFixed(0)}/mo).</span>
                      </li>
                      {(result.unitsConsumed.value as number) > 300 && (
                        <li className="flex gap-3">
                          <div className="mt-1 bg-emerald-500/20 p-1 shrink-0 rounded-full"><CheckCircle2 className="h-3 w-3 text-emerald-600" /></div>
                          <span className="text-sm">Your consumption profile perfectly matches a 3kW rooftop solar installation.</span>
                        </li>
                      )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  )
}
