"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { ConnectionType, BillingCycle } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuickBillTabProps {
  onCalculate: (units: number, connType: ConnectionType, cycle: BillingCycle) => void;
}

export function QuickBillTab({ onCalculate }: QuickBillTabProps) {
  const [units, setUnits] = useState("");
  const [connType, setConnType] = useState<ConnectionType>("Residential");
  const [cycle, setCycle] = useState<BillingCycle>("Monthly");

  const handleCalculate = () => {
    const parsedUnits = parseFloat(units);
    if (!isNaN(parsedUnits) && parsedUnits >= 0) {
      onCalculate(parsedUnits, connType, cycle);
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wider uppercase font-geist text-muted-foreground">
            Connection Type
          </label>
          <Select value={connType} onValueChange={(v) => setConnType(v as ConnectionType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Residential">Residential</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Industrial">Industrial</SelectItem>
              <SelectItem value="Agricultural">Agricultural</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wider uppercase font-geist text-muted-foreground">
            Billing Cycle
          </label>
          <Select value={cycle} onValueChange={(v) => setCycle(v as BillingCycle)}>
            <SelectTrigger>
              <SelectValue placeholder="Select cycle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Bi-Monthly">Bi-Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
    </div>
  );
}
