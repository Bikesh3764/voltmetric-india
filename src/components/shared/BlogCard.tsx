import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  category: string;
}

export function BlogCard({ title, excerpt, date, readTime, slug, category }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <Card className="h-full border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/30 overflow-hidden">
        <div className="h-48 bg-muted w-full relative">
          {/* Placeholder for image */}
          <div className="absolute top-4 left-4">
            <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
              {category}
            </span>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-4">
            <span>{date}</span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" /> {readTime}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {excerpt}
          </p>
          <div className="flex items-center text-primary text-sm font-semibold">
            Read Article <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
