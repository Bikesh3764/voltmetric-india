import { CalculatorCard } from "@/components/shared/CalculatorCard";
import { CTASection } from "@/components/shared/CTASection";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const APPLIANCE_DATA: Record<string, { title: string; desc: string; avgWattage: number }> = {
  "ac": { title: "Air Conditioner", desc: "Calculate running cost for Window/Split ACs", avgWattage: 1500 },
  "fan": { title: "Ceiling Fan", desc: "Calculate running cost for standard fans", avgWattage: 75 },
  "refrigerator": { title: "Refrigerator", desc: "Calculate running cost for fridges", avgWattage: 400 },
  "tv": { title: "Television", desc: "Calculate running cost for LED/Smart TVs", avgWattage: 100 },
  "ev": { title: "EV Charging", desc: "Calculate cost to charge your Electric Vehicle", avgWattage: 3300 },
};

export function generateStaticParams() {
  return Object.keys(APPLIANCE_DATA).map((type) => ({
    type,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = APPLIANCE_DATA[resolvedParams.type];
  if (!data) return { title: "Not Found" };
  return {
    title: `${data.title} Electricity Cost Calculator | VoltMetric India`,
    description: data.desc,
  };
}

export default async function ApplianceCalculatorPage({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = await params;
  const data = APPLIANCE_DATA[resolvedParams.type];
  
  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="bg-muted/30 pt-10 pb-20 border-b">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-4 text-sm text-muted-foreground">
            Home / Appliances / <span className="text-foreground font-medium">{data.title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            {data.title} Cost Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {data.desc}. Assumes an average wattage of {data.avgWattage}W.
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-8 max-w-7xl mx-auto py-12 -mt-16">
        <div className="max-w-2xl mx-auto">
          {/* Note: The CalculatorCard here is reused, so 'units' implies 'hours' for this specific mock */}
          <CalculatorCard 
            state="All India Avg" 
            board={data.title} 
            type="appliance"
            avgWattage={data.avgWattage}
          />
        </div>
      </div>
      
      <CTASection />
    </>
  );
}
