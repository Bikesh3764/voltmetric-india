"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

interface MeterReadingTabProps {
  onCalculate: (units: number) => void;
}

export function MeterReadingTab({ onCalculate }: MeterReadingTabProps) {
  const [prev, setPrev] = useState("");
  const [current, setCurrent] = useState("");

  const handleCalculate = () => {
    const p = parseFloat(prev);
    const c = parseFloat(current);
    if (!isNaN(p) && !isNaN(c) && c >= p) {
      onCalculate(c - p);
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wider uppercase font-geist text-muted-foreground">
            Previous Reading
          </label>
          <Input
            type="number"
            placeholder="e.g. 10250"
            value={prev}
            onChange={(e) => setPrev(e.target.value)}
            className="text-lg py-6"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wider uppercase font-geist text-muted-foreground">
            Current Reading
          </label>
          <Input
            type="number"
            placeholder="e.g. 10500"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="text-lg py-6"
          />
        </div>
      </div>
      
      {prev && current && parseFloat(current) >= parseFloat(prev) && (
        <div className="bg-primary/10 text-primary p-4 rounded-lg text-center font-medium">
          Calculated Consumption: {parseFloat(current) - parseFloat(prev)} Units
        </div>
      )}

      <Button 
        onClick={handleCalculate} 
        disabled={!prev || !current || parseFloat(current) < parseFloat(prev)}
        className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white h-12 text-lg shadow-md"
      >
        <Calculator className="mr-2 h-5 w-5" /> Calculate Bill
      </Button>
    </div>
  );
}
