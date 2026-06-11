"use client";

import { CalculationResult } from "./types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function InsightsAndCharts({ result }: { result: CalculationResult | null }) {
  if (!result) return null;

  const data = [
    { name: "Energy", value: result.energyCharge },
    { name: "Fixed", value: result.fixedCharge },
    { name: "Duty/Tax", value: result.electricityDuty + result.tax },
    { name: "FAC", value: result.fac }
  ];

  const colors = ["hsl(var(--primary))", "#8b5cf6", "#ec4899", "#f59e0b"];

  return (
    <div className="mt-8 space-y-6 print:hidden">
      <h4 className="font-semibold mb-3 border-b pb-2">Energy Insights</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-muted rounded-lg p-4">
          <div className="text-xs text-muted-foreground mb-1">Cost Per Day</div>
          <div className="font-geist font-medium text-lg">₹{(result.totalBill / 30).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-xs text-muted-foreground mb-1">Cost Per Year</div>
          <div className="font-geist font-medium text-lg">₹{(result.totalBill * 12).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-xs text-muted-foreground mb-1">Units Per Day</div>
          <div className="font-geist font-medium text-lg">{(result.consumedUnits / 30).toFixed(1)}</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-xs text-muted-foreground mb-1">Units Per Year</div>
          <div className="font-geist font-medium text-lg">{(result.consumedUnits * 12).toLocaleString('en-IN')}</div>
        </div>
      </div>

      <div className="h-64 mt-8 w-full border rounded-xl p-4 bg-card">
        <h5 className="text-sm text-muted-foreground text-center mb-4 font-semibold">Cost Breakdown</h5>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip 
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [`₹${Number(value).toFixed(2)}`, 'Cost']}
              cursor={{fill: 'transparent'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
