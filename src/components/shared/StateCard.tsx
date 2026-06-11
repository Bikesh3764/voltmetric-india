import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MapPin } from "lucide-react";

interface StateCardProps {
  state: string;
  board: string;
  slug: string;
  color?: string;
}

export function StateCard({ state, board, slug, color = "bg-primary" }: StateCardProps) {
  return (
    <Link href={`/calculator/${slug}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 relative overflow-hidden bg-card/50 backdrop-blur-sm">
        {/* Top accent border as per Lumina Grid */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${color}`}></div>
        
        <CardHeader className="pb-2 pt-6 px-6">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-muted rounded-md mb-4 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
          </div>
          <CardTitle className="text-xl font-bold font-sans tracking-tight">{state}</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <p className="text-sm text-muted-foreground">{board}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
