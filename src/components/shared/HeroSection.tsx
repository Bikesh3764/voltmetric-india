import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { StateSelectionModal } from "./StateSelectionModal";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-5xl text-center">
        <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm text-primary mb-8 backdrop-blur-sm">
          <Zap className="mr-2 h-4 w-4" />
          <span>India&apos;s Most Accurate Electricity Calculator</span>
        </div>
        
        <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
          Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Power Bill</span>
          <br /> With Absolute Precision
        </h1>
        
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
          State-specific tariff calculations, appliance energy costs, and solar ROI estimations tailored for Indian households and businesses.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <StateSelectionModal>
            <button className={cn(buttonVariants({ size: "lg" }), "bg-primary hover:bg-primary/90 text-white w-full sm:w-auto text-base h-12 px-8 shadow-lg shadow-primary/25 cursor-pointer")}>
              Start Calculating <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </StateSelectionModal>
          <Link href="/appliances/ac" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto text-base h-12 px-8 bg-background/50 backdrop-blur-sm")}>
            Appliance Costs
          </Link>
        </div>
      </div>
    </section>
  );
}
