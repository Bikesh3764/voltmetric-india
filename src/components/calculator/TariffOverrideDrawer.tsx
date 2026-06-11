"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings2, RotateCcw } from "lucide-react";
import { TariffOverrides } from "./types";

interface Props {
  onOverridesChange: (overrides: TariffOverrides | null) => void;
}

export function TariffOverrideDrawer({ onOverridesChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [perUnitRate, setPerUnitRate] = useState<string>("");
  const [fixedCharge, setFixedCharge] = useState<string>("");
  const [meterRent, setMeterRent] = useState<string>("");
  const [fac, setFac] = useState<string>("");
  const [duty, setDuty] = useState<string>("");
  const [taxPercentage, setTaxPercentage] = useState<string>("");
  const [subsidy, setSubsidy] = useState<string>("");

  const handleReset = () => {
    setPerUnitRate("");
    setFixedCharge("");
    setMeterRent("");
    setFac("");
    setDuty("");
    setTaxPercentage("");
    setSubsidy("");
    onOverridesChange(null);
  };

  useEffect(() => {
    const hasOverrides = perUnitRate || fixedCharge || meterRent || fac || duty || taxPercentage || subsidy;
    
    if (hasOverrides) {
      onOverridesChange({
        perUnitRate: perUnitRate ? parseFloat(perUnitRate) : undefined,
        fixedCharge: fixedCharge ? parseFloat(fixedCharge) : undefined,
        meterRent: meterRent ? parseFloat(meterRent) : undefined,
        fac: fac ? parseFloat(fac) : undefined,
        duty: duty ? parseFloat(duty) : undefined,
        taxPercentage: taxPercentage ? parseFloat(taxPercentage) : undefined,
        subsidy: subsidy ? parseFloat(subsidy) : undefined,
      });
    } else {
      onOverridesChange(null);
    }
  }, [perUnitRate, fixedCharge, meterRent, fac, duty, taxPercentage, subsidy, onOverridesChange]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 print:hidden">
        <Settings2 className="h-4 w-4" />
        Edit Charges
      </SheetTrigger>
      <SheetContent className="overflow-y-auto sm:max-w-md">
        <SheetHeader className="mb-6">
          <SheetTitle>Custom Tariff Scenario</SheetTitle>
          <SheetDescription>
            Override official tariff values to simulate custom billing scenarios. Changes apply instantly.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Per Unit Rate (₹)</label>
            <Input 
              type="number" 
              placeholder="e.g. 6.50 (Bypasses Slabs)" 
              value={perUnitRate} 
              onChange={(e) => setPerUnitRate(e.target.value)} 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Fixed Charges (₹)</label>
            <Input 
              type="number" 
              placeholder="e.g. 150" 
              value={fixedCharge} 
              onChange={(e) => setFixedCharge(e.target.value)} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Meter Rent (₹)</label>
              <Input 
                type="number" 
                placeholder="e.g. 20" 
                value={meterRent} 
                onChange={(e) => setMeterRent(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">FAC (₹)</label>
              <Input 
                type="number" 
                placeholder="e.g. 0.15" 
                value={fac} 
                onChange={(e) => setFac(e.target.value)} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Electricity Duty (₹)</label>
              <Input 
                type="number" 
                placeholder="e.g. 50" 
                value={duty} 
                onChange={(e) => setDuty(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tax (%)</label>
              <Input 
                type="number" 
                placeholder="e.g. 9" 
                value={taxPercentage} 
                onChange={(e) => setTaxPercentage(e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subsidy Amount (₹)</label>
            <Input 
              type="number" 
              placeholder="e.g. 0" 
              value={subsidy} 
              onChange={(e) => setSubsidy(e.target.value)} 
            />
          </div>

          <div className="pt-4 border-t">
            <Button onClick={handleReset} variant="destructive" className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset to Official Tariff
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
