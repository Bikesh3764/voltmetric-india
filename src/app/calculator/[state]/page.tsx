import { EnergyManagementPlatform } from "@/components/calculator/EnergyManagementPlatform";
import { TariffData } from "@/components/calculator/types";
import { PricingCard } from "@/components/shared/PricingCard";
import { CTASection } from "@/components/shared/CTASection";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const STATE_DATA: Record<string, TariffData> = {
  "kseb": {
    state: "Kerala", board: "KSEB", fixedCharge: "₹40 / month",
    revisionDate: "01 Nov 2023", sourceAuthority: "KSERC", orderNumber: "105/2023",
    slabs: [{ range: "0-250", rate: 3.15 }, { range: "251-500", rate: 4.80 }, { range: "501-99999", rate: 6.80 }]
  },
  "tneb": {
    state: "Tamil Nadu", board: "TNEB", fixedCharge: "₹30 / month",
    revisionDate: "01 Jul 2023", sourceAuthority: "TNERC", orderNumber: "7/2023",
    slabs: [{ range: "0-100", rate: 0 }, { range: "101-200", rate: 2.25 }, { range: "201-400", rate: 4.50 }, { range: "401-99999", rate: 6.00 }]
  },
  "bsphcl": {
    state: "Bihar", board: "BSPHCL", fixedCharge: "₹40 / kW / month",
    revisionDate: "01 Apr 2023", sourceAuthority: "BERC", orderNumber: "4/2023",
    slabs: [{ range: "0-100", rate: 4.27 }, { range: "101-200", rate: 5.02 }, { range: "201-99999", rate: 6.02 }]
  },
  "wbsedcl": {
    state: "West Bengal", board: "WBSEDCL", fixedCharge: "₹15 / kVA / month",
    revisionDate: "01 Apr 2023", sourceAuthority: "WBERC", orderNumber: "9/2023",
    slabs: [{ range: "0-102", rate: 5.30 }, { range: "103-180", rate: 5.97 }, { range: "181-300", rate: 6.97 }, { range: "301-99999", rate: 7.31 }]
  },
  "uppcl": {
    state: "Uttar Pradesh", board: "UPPCL", fixedCharge: "₹110 / kW / month",
    revisionDate: "01 Apr 2023", sourceAuthority: "UPERC", orderNumber: "12/2023",
    slabs: [{ range: "0-150", rate: 5.50 }, { range: "151-300", rate: 6.00 }, { range: "301-500", rate: 6.50 }, { range: "501-99999", rate: 7.00 }]
  },
  "bescom": {
    state: "Karnataka", board: "BESCOM", fixedCharge: "₹110 / kW / month",
    revisionDate: "01 Apr 2023", sourceAuthority: "KERC", orderNumber: "2/2023",
    slabs: [{ range: "0-100", rate: 4.75 }, { range: "101-99999", rate: 7.00 }]
  },
  "msedcl": {
    state: "Maharashtra", board: "MSEDCL", fixedCharge: "₹115 / month",
    revisionDate: "01 Apr 2023", sourceAuthority: "MERC", orderNumber: "5/2023",
    slabs: [{ range: "0-100", rate: 4.71 }, { range: "101-300", rate: 8.69 }, { range: "301-500", rate: 11.72 }, { range: "501-99999", rate: 13.21 }]
  },
  "pspcl": {
    state: "Punjab", board: "PSPCL", fixedCharge: "₹50 / kW / month",
    revisionDate: "01 Apr 2023", sourceAuthority: "PSERC", orderNumber: "3/2023",
    slabs: [{ range: "0-100", rate: 3.49 }, { range: "101-300", rate: 5.84 }, { range: "301-99999", rate: 7.30 }]
  },
  "apspdcl": {
    state: "Andhra Pradesh", board: "APSPDCL", fixedCharge: "₹10 / kW / month",
    revisionDate: "01 Apr 2023", sourceAuthority: "APERC", orderNumber: "6/2023",
    slabs: [{ range: "0-30", rate: 1.45 }, { range: "31-75", rate: 2.60 }, { range: "76-125", rate: 3.60 }, { range: "126-225", rate: 6.90 }, { range: "226-99999", rate: 7.60 }]
  },
  "tsspdcl": {
    state: "Telangana", board: "TSSPDCL", fixedCharge: "₹10 / kW / month",
    revisionDate: "01 Apr 2023", sourceAuthority: "TSERC", orderNumber: "8/2023",
    slabs: [{ range: "0-100", rate: 1.95 }, { range: "101-200", rate: 3.10 }, { range: "201-99999", rate: 5.10 }]
  }
};

export function generateStaticParams() {
  return Object.keys(STATE_DATA).map((state) => ({
    state,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = STATE_DATA[resolvedParams.state];
  if (!data) return { title: "Not Found" };
  return {
    title: `${data.board} Electricity Bill Calculator (${data.state}) | VoltMetric India`,
    description: `Calculate your electricity bill for ${data.board} in ${data.state}. Accurate rates, slabs, and fixed charges based on latest tariffs.`,
  };
}

export default async function StateCalculatorPage({ params }: { params: Promise<{ state: string }> }) {
  const resolvedParams = await params;
  const data = STATE_DATA[resolvedParams.state];
  
  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="bg-muted/30 pt-10 pb-20 border-b">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-4 text-sm text-muted-foreground">
            Home / Calculators / <span className="text-foreground font-medium">{data.state}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            {data.board} Bill Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Calculate your estimated electricity bill for {data.state} based on the latest {data.board} tariffs.
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-8 max-w-7xl mx-auto py-12 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EnergyManagementPlatform tariff={data} />
          </div>
          <div className="lg:col-span-1">
            <PricingCard 
              title={`${data.board} Tariff Slabs`} 
              slabs={data.slabs} 
              fixedCharge={data.fixedCharge}
              revisionDate={data.revisionDate}
              sourceAuthority={data.sourceAuthority}
              orderNumber={data.orderNumber}
            />
          </div>
        </div>
      </div>
      
      <CTASection />
    </>
  );
}
