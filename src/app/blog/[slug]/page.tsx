import { BLOG_POSTS } from "../page";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/shared/CTASection";
import { Metadata } from "next";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | VoltMetric India`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="container px-4 md:px-8 py-16 max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center text-sm text-primary font-semibold mb-4 space-x-2">
            <span>{post.category}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between border-y py-4">
            <div className="font-medium">Published on {post.date}</div>
            <div className="text-sm text-muted-foreground">VoltMetric Editorial Team</div>
          </div>
        </div>

        <div className="prose prose-blue max-w-none text-foreground/80">
          <p className="lead">
            This is a placeholder for the full article content. In a production environment, this content would be fetched from a CMS like Sanity, Contentful, or rendered from local MDX files.
          </p>
          <h2>The Impact of Rising Energy Demands</h2>
          <p>
            As household energy consumption in India grows, driven by increased appliance usage and rising temperatures, understanding your electricity bill structure has never been more important.
          </p>
          <h2>How to Take Action</h2>
          <ul>
            <li>Monitor your usage during peak hours.</li>
            <li>Invest in 5-star BEE rated appliances.</li>
            <li>Consider rooftop solar if you consume more than 300 units per month.</li>
          </ul>
        </div>
      </article>
      
      <CTASection />
    </>
  );
}
