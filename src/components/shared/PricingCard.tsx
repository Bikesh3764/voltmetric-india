import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Slab {
  range: string;
  rate: number;
}

interface PricingCardProps {
  title: string;
  slabs: Slab[];
  fixedCharge?: string;
  revisionDate?: string;
  sourceAuthority?: string;
  orderNumber?: string;
}

export function PricingCard({ title, slabs, fixedCharge, revisionDate, sourceAuthority, orderNumber }: PricingCardProps) {
  return (
    <Card className="shadow-sm border border-border bg-card">
      <CardHeader className="bg-muted/30 border-b pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground font-geist text-xs uppercase">
            <tr>
              <th className="px-6 py-3 font-medium">Consumption (Units)</th>
              <th className="px-6 py-3 font-medium text-right">Rate (₹/Unit)</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {slabs.map((slab, index) => (
              <tr key={index} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4 font-medium">{slab.range}</td>
                <td className="px-6 py-4 text-right font-geist">{slab.rate.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {fixedCharge && (
          <div className="p-4 bg-muted/20 text-sm border-t flex justify-between items-center">
            <span className="font-medium">Fixed Charges</span>
            <span className="font-geist font-medium">{fixedCharge}</span>
          </div>
        )}
        {(revisionDate || sourceAuthority) && (
          <div className="p-4 bg-card text-xs text-muted-foreground border-t space-y-1">
            {sourceAuthority && <div><strong>Source Authority:</strong> {sourceAuthority} {orderNumber && `(Order: ${orderNumber})`}</div>}
            {revisionDate && <div><strong>Effective Date:</strong> {revisionDate}</div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
