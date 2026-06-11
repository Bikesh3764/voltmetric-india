"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface CalculatorCardProps {
  state: string;
  board: string;
  type?: "state" | "appliance" | "solar";
  slabs?: { range: string; rate: number }[];
  fixedCharge?: number;
  avgWattage?: number;
}

export function CalculatorCard({ state, board, type = "state", slabs = [], fixedCharge = 100, avgWattage = 1000 }: CalculatorCardProps) {
  const [units, setUnits] = useState("");
  const [result, setResult] = useState<{ bill: number; fixed: number; energy: number; tax: number } | null>(null);

  const handleCalculate = () => {
    const parsedUnits = parseFloat(units);
    if (!isNaN(parsedUnits) && parsedUnits >= 0) {
      if (type === "state") {
        let energy = 0;
        if (slabs.length > 0) {
            energy = parsedUnits * slabs[Math.min(1, slabs.length - 1)].rate;
        }
        const tax = (energy + fixedCharge) * 0.05;
        setResult({ bill: energy + fixedCharge + tax, energy, fixed: fixedCharge, tax });
      } else if (type === "appliance") {
        const avgRate = 6.5;
        const energyUnits = (avgWattage * parsedUnits) / 1000;
        const energy = energyUnits * avgRate;
        const tax = energy * 0.05;
        setResult({ bill: energy + tax, energy, fixed: 0, tax });
      } else {
        // Solar mock
        const energy = parsedUnits * 0.7;
        const fixed = parsedUnits * 12;
        const tax = fixed - (energy * 12);
        setResult({ bill: energy, energy: fixed, fixed: tax, tax: 3 });
      }
    }
  };

  return (
    <Card className="w-full relative bg-card/80 backdrop-blur-md shadow-sm border-t-primary border-t-4">
      {result && (
        <div className="absolute inset-0 -z-10 bg-primary/5 rounded-xl blur-xl transition-all"></div>
      )}
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">{board} Electricity Bill Calculator</CardTitle>
        <CardDescription>Calculate your estimated {state} power bill</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="units" className="text-sm font-semibold tracking-wider uppercase font-geist text-muted-foreground">
            Units Consumed (kWh)
          </label>
          <div className="relative">
            <Input
              id="units"
              type="number"
              placeholder="e.g. 250"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="text-lg font-geist py-6"
            />
            <Zap className="absolute right-4 top-4 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <Button 
          onClick={handleCalculate} 
          className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white h-12 text-lg shadow-md"
        >
          Calculate Bill
        </Button>

        {result && (
          <div className="mt-8 pt-6 border-t animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-6">
              <span className="text-sm font-semibold tracking-wider uppercase font-geist text-muted-foreground">Estimated Total Bill</span>
              <div className="text-5xl font-bold font-geist text-foreground mt-2">
                ₹{result.bill.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-muted rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Energy Charge</div>
                <div className="font-geist font-medium">₹{result.energy.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Fixed Charge</div>
                <div className="font-geist font-medium">₹{result.fixed.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Duty / Tax</div>
                <div className="font-geist font-medium">₹{result.tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
