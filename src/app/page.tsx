import { HeroSection } from "@/components/shared/HeroSection";
import { CTASection } from "@/components/shared/CTASection";
import { StateCard } from "@/components/shared/StateCard";
import { AdsensePlaceholder } from "@/components/shared/AdsensePlaceholder";

const STATES = [
  { state: "Kerala", board: "KSEB", slug: "kseb" },
  { state: "Tamil Nadu", board: "TNEB", slug: "tneb" },
  { state: "Bihar", board: "BSPHCL", slug: "bsphcl" },
  { state: "West Bengal", board: "WBSEDCL", slug: "wbsedcl" },
  { state: "Uttar Pradesh", board: "UPPCL", slug: "uppcl" },
  { state: "Karnataka", board: "BESCOM", slug: "bescom" },
  { state: "Maharashtra", board: "MSEDCL", slug: "msedcl" },
  { state: "Punjab", board: "PSPCL", slug: "pspcl" },
  { state: "Andhra Pradesh", board: "APSPDCL", slug: "apspdcl" },
  { state: "Telangana", board: "TSSPDCL", slug: "tsspdcl" },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">State Electricity Boards</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select your state to calculate your precise electricity bill based on the latest tariff slabs and fixed charges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {STATES.map((s) => (
              <StateCard 
                key={s.slug}
                state={s.state}
                board={s.board}
                slug={s.slug}
              />
            ))}
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto">
            <AdsensePlaceholder />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
