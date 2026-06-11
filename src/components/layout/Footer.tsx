import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg tracking-tight">VoltMetric India</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering Indian households and businesses with precise, state-specific electricity bill calculations and energy insights.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Calculators</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/calculator/kseb" className="hover:text-primary transition-colors">KSEB (Kerala)</Link></li>
              <li><Link href="/calculator/tneb" className="hover:text-primary transition-colors">TNEB (Tamil Nadu)</Link></li>
              <li><Link href="/calculator/bsphcl" className="hover:text-primary transition-colors">BSPHCL (Bihar)</Link></li>
              <li><Link href="/calculator/bescom" className="hover:text-primary transition-colors">BESCOM (Karnataka)</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/appliances/ac" className="hover:text-primary transition-colors">Appliance Costs</Link></li>
              <li><Link href="/solar-savings" className="hover:text-primary transition-colors">Solar ROI</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Energy Blog</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} VoltMetric India. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            {/* Social icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
