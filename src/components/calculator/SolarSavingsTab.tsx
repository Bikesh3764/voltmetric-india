"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";

export function SolarSavingsTab() {
  const [capacity, setCapacity] = useState("3");
  const [cost, setCost] = useState("180000");
  const [result, setResult] = useState<{ savings: number; payback: number } | null>(null);

  const handleCalculate = () => {
    const cap = parseFloat(capacity);
    const cst = parseFloat(cost);
    if (!isNaN(cap) && !isNaN(cst)) {
      // 1kW generates ~120 units per month. Average unit cost ~₹7.
      const monthlyUnits = cap * 120;
      const monthlySavings = monthlyUnits * 7;
      const annualSavings = monthlySavings * 12;
      const paybackYears = cst / annualSavings;
      
      setResult({ savings: monthlySavings, payback: paybackYears });
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wider uppercase font-geist text-muted-foreground">
            System Capacity (kW)
          </label>
          <Input
            type="number"
            placeholder="e.g. 3"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="text-lg py-6"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wider uppercase font-geist text-muted-foreground">
            Installation Cost (₹)
          </label>
          <Input
            type="number"
            placeholder="e.g. 180000"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="text-lg py-6"
          />
        </div>
      </div>

      <Button 
        onClick={handleCalculate} 
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white h-12 text-lg shadow-md"
      >
        <Sun className="mr-2 h-5 w-5" /> Calculate Savings
      </Button>

      {result && (
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-center">
            <div className="text-sm text-amber-700 dark:text-amber-400 font-medium mb-1">Monthly Savings</div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">₹{result.savings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center">
            <div className="text-sm text-emerald-700 dark:text-emerald-400 font-medium mb-1">Payback Period</div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">{result.payback.toFixed(1)} Years</div>
          </div>
        </div>
      )}
    </div>
  );
}
