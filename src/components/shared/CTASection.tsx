import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { StateSelectionModal } from "./StateSelectionModal";

export function CTASection() {
  return (
    <section className="border-t bg-muted/30 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -z-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
      <div className="container px-4 md:px-8 max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Ready to optimize your energy consumption?
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Take control of your electricity bills today. Explore our state-specific calculators or analyze individual appliances to start saving.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <StateSelectionModal>
            <button className={cn(buttonVariants({ size: "lg" }), "bg-primary shadow-lg shadow-primary/20 cursor-pointer w-full sm:w-auto")}>
              Select Your State
            </button>
          </StateSelectionModal>
          <Link href="/solar-savings" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "bg-background")}>
            Explore Solar ROI
          </Link>
        </div>
      </div>
    </section>
  );
}
