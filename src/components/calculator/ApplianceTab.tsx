"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Zap } from "lucide-react";
import { Appliance } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ApplianceTabProps {
  onCalculate: (units: number, appliances?: Appliance[]) => void;
}

const PRESETS = [
  { name: "AC (1.5 Ton)", wattage: 1500 },
  { name: "Ceiling Fan", wattage: 75 },
  { name: "Refrigerator", wattage: 200 },
  { name: "TV (LED)", wattage: 100 },
  { name: "Washing Machine", wattage: 500 },
  { name: "Water Pump", wattage: 750 },
  { name: "Geyser", wattage: 2000 },
  { name: "Computer", wattage: 250 },
  { name: "Custom", wattage: 0 },
];

export function ApplianceTab({ onCalculate }: ApplianceTabProps) {
  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: "1", name: "AC (1.5 Ton)", wattage: 1500, quantity: 1, hoursPerDay: 8, daysPerMonth: 30 }
  ]);

  const handleAdd = () => {
    setAppliances([...appliances, { id: Date.now().toString(), name: "Custom", wattage: 100, quantity: 1, hoursPerDay: 4, daysPerMonth: 30 }]);
  };

  const handleRemove = (id: string) => {
    setAppliances(appliances.filter(a => a.id !== id));
  };

  const handleUpdate = (id: string, field: keyof Appliance, value: string | number) => {
    setAppliances(appliances.map(a => {
      if (a.id === id) {
        if (field === 'name') {
          const preset = PRESETS.find(p => p.name === value);
          if (preset && preset.name !== "Custom") {
            return { ...a, name: value as string, wattage: preset.wattage };
          }
        }
        return { ...a, [field]: value };
      }
      return a;
    }));
  };

  const calculateTotalUnits = () => {
    return appliances.reduce((total, app) => {
      return total + ((app.wattage * app.quantity * app.hoursPerDay * app.daysPerMonth) / 1000);
    }, 0);
  };

  const handleCalculate = () => {
    onCalculate(calculateTotalUnits(), appliances);
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
        {appliances.map((app, index) => (
          <div key={app.id} className="grid grid-cols-12 gap-2 items-end border p-3 rounded-lg bg-card/50">
            <div className="col-span-12 md:col-span-3 space-y-1">
              <label className="text-xs text-muted-foreground">Appliance</label>
              <Select value={app.name} onValueChange={(v) => v && handleUpdate(app.id, 'name', v)}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRESETS.map(p => <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-6 md:col-span-2 space-y-1">
              <label className="text-xs text-muted-foreground">Wattage</label>
              <Input type="number" value={app.wattage} onChange={(e) => handleUpdate(app.id, 'wattage', parseInt(e.target.value) || 0)} className="h-9" />
            </div>
            <div className="col-span-6 md:col-span-2 space-y-1">
              <label className="text-xs text-muted-foreground">Qty</label>
              <Input type="number" value={app.quantity} onChange={(e) => handleUpdate(app.id, 'quantity', parseInt(e.target.value) || 0)} className="h-9" />
            </div>
            <div className="col-span-6 md:col-span-2 space-y-1">
              <label className="text-xs text-muted-foreground">Hrs/Day</label>
              <Input type="number" value={app.hoursPerDay} onChange={(e) => handleUpdate(app.id, 'hoursPerDay', parseInt(e.target.value) || 0)} className="h-9" />
            </div>
            <div className="col-span-4 md:col-span-2 space-y-1">
              <label className="text-xs text-muted-foreground">Days/Mo</label>
              <Input type="number" value={app.daysPerMonth} onChange={(e) => handleUpdate(app.id, 'daysPerMonth', parseInt(e.target.value) || 0)} className="h-9" />
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => handleRemove(app.id)} className="h-9 w-9 text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center border-t pt-4">
        <Button variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Appliance
        </Button>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total Consumption</div>
          <div className="text-xl font-bold text-primary">{calculateTotalUnits().toFixed(1)} Units</div>
        </div>
      </div>

      <Button 
        onClick={handleCalculate} 
        disabled={appliances.length === 0}
        className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white h-12 text-lg shadow-md mt-4"
      >
        <Zap className="mr-2 h-5 w-5" /> Calculate Bill
      </Button>
    </div>
  );
}
