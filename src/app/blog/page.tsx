import { BlogCard } from "@/components/shared/BlogCard";
import { CTASection } from "@/components/shared/CTASection";

export const BLOG_POSTS = [
  {
    title: "Understanding Time of Day (ToD) Electricity Tariffs in India",
    excerpt: "Learn how the new ToD tariffs proposed by the Ministry of Power will affect your electricity bill and how to optimize your usage to save money.",
    date: "June 10, 2026",
    readTime: "5 min read",
    slug: "understanding-tod-tariffs-india",
    category: "Policy & Tariffs"
  },
  {
    title: "Top 5 Energy Efficient Air Conditioners for Indian Summers",
    excerpt: "A comprehensive guide to choosing the right AC for your room size, focusing on ISEER ratings and long-term electricity cost savings.",
    date: "May 28, 2026",
    readTime: "7 min read",
    slug: "top-energy-efficient-ac-india",
    category: "Appliances"
  },
  {
    title: "PM Surya Ghar Muft Bijli Yojana: Complete Application Guide",
    excerpt: "Everything you need to know about the rooftop solar scheme, subsidies available, and how to apply for free electricity up to 300 units.",
    date: "May 15, 2026",
    readTime: "8 min read",
    slug: "pm-surya-ghar-yojana-guide",
    category: "Solar & Renewables"
  },
  {
    title: "Phantom Loads: The Hidden Culprits Inflating Your Power Bill",
    excerpt: "Discover which appliances consume power even when turned off and simple habits to eliminate standby power drain in your household.",
    date: "April 22, 2026",
    readTime: "4 min read",
    slug: "phantom-loads-standby-power",
    category: "Energy Savings"
  }
];

export const metadata = {
  title: "Energy Guides & Resources Blog | VoltMetric India",
  description: "Read the latest articles on electricity tariffs, energy-saving tips, appliance efficiency, and solar power in India."
};

export default function BlogPage() {
  return (
    <>
      <div className="bg-muted/30 pt-16 pb-24 border-b">
        <div className="container px-4 md:px-8 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
            Energy Guides & Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Actionable insights, tariff updates, and expert advice to help you reduce your carbon footprint and electricity bills.
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-8 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </div>

      <CTASection />
    </>
  );
}
