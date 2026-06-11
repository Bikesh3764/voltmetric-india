import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTASection } from "@/components/shared/CTASection";

const FAQS = [
  {
    question: "How accurate is the electricity bill calculator?",
    answer: "Our calculator uses the latest tariff slabs and fixed charges published by respective State Electricity Regulatory Commissions (SERC). While highly accurate, actual bills may include local municipal taxes, arrears, or varying fuel surcharges."
  },
  {
    question: "How do I find my total units consumed?",
    answer: "You can find your total units consumed (kWh) on your physical electricity bill, usually under 'Current Reading' minus 'Previous Reading', or by checking your smart meter display."
  },
  {
    question: "What are fixed charges?",
    answer: "Fixed charges are a mandatory monthly fee levied by the electricity board based on your sanctioned load (kW) or contracted demand, regardless of your actual energy consumption."
  },
  {
    question: "Does the calculator include taxes and duties?",
    answer: "Yes, our calculation includes an estimated average electricity duty and tax percentage applicable in your state."
  },
  {
    question: "How is the EV charging cost calculated?",
    answer: "EV charging cost is calculated based on your vehicle's battery capacity (kWh), charging efficiency, and your state's specific EV tariff or highest residential slab rate."
  }
];

export const metadata = {
  title: "Frequently Asked Questions | VoltMetric India",
  description: "Find answers to common questions about electricity bill calculation, tariffs, and energy savings in India."
};

export default function FAQPage() {
  return (
    <>
      <div className="bg-muted/30 pt-16 pb-24">
        <div className="container px-4 md:px-8 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about understanding and calculating your power bill.
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-8 py-16 mx-auto -mt-16">
        <FAQAccordion faqs={FAQS} />
      </div>

      <CTASection />
    </>
  );
}
