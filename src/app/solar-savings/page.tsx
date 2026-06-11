import { CalculatorCard } from "@/components/shared/CalculatorCard";
import { CTASection } from "@/components/shared/CTASection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Savings & ROI Calculator | VoltMetric India",
  description: "Calculate your potential savings and Return on Investment (ROI) by switching to rooftop solar panels."
};

export default function SolarSavingsPage() {
  return (
    <>
      <div className="bg-muted/30 pt-10 pb-20 border-b">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-4 text-sm text-muted-foreground">
            Home / <span className="text-foreground font-medium">Solar Savings</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Solar ROI Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Estimate your monthly savings and the payback period for installing a rooftop solar system.
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-8 max-w-7xl mx-auto py-12 -mt-16">
        <div className="max-w-2xl mx-auto">
          <CalculatorCard 
            state="Average Bill" 
            board="Solar Savings" 
            type="solar"
          />
          {/* Note: In a real implementation, the CalculatorCard text would be customized for "Monthly Bill Amount (₹)" instead of "Units Consumed". We'll use the generic one for this mock. */}
        </div>
      </div>
      
      <CTASection />
    </>
  );
}
