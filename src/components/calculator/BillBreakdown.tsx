"use client";

import { CalculationResult, TariffData, ConnectionType, BillingCycle } from "./types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Printer, AlertTriangle } from "lucide-react";

interface BillBreakdownProps {
  result: CalculationResult | null;
  baselineResult?: CalculationResult | null;
  isCustomMode?: boolean;
  tariff: TariffData;
  connectionType: ConnectionType;
  billingCycle: BillingCycle;
}

export function BillBreakdown({ result, baselineResult, isCustomMode, tariff, connectionType, billingCycle }: BillBreakdownProps) {
  if (!result) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mt-8 pt-6 border-t animate-in fade-in slide-in-from-bottom-4 duration-500 printable-section">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold">{tariff.board} Bill Estimate</h3>
          <p className="text-muted-foreground text-sm">
            {tariff.state} • {connectionType} • {billingCycle}
          </p>
        </div>
        <div className="flex gap-2 print:hidden">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
        </div>
      </div>

      {isCustomMode && (
        <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm flex items-start gap-3 print:border-amber-500/40">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <p>
            <strong>Custom Mode Active:</strong> This bill uses user-entered values and may not reflect official electricity board tariffs.
          </p>
        </div>
      )}

      <div className="text-center mb-8 bg-primary/5 rounded-xl py-6 border border-primary/10">
        <span className="text-sm font-semibold tracking-wider uppercase font-geist text-muted-foreground">Total Estimated Bill</span>
        <div className="text-5xl font-bold font-geist text-foreground mt-2">
          ₹{result.totalBill.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          For {result.consumedUnits.toLocaleString('en-IN')} Units consumed
        </div>
      </div>
      
      <div className="space-y-6">
        {isCustomMode && baselineResult && (
          <div className="mb-8">
            <h4 className="font-semibold mb-3 border-b pb-2">Scenario Comparison</h4>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scenario</TableHead>
                    <TableHead className="text-right">Total Bill</TableHead>
                    <TableHead className="text-right">Difference</TableHead>
                    <TableHead className="text-right">% Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Official Tariff</TableCell>
                    <TableCell className="text-right">₹{baselineResult.totalBill.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-right text-muted-foreground">-</TableCell>
                    <TableCell className="text-right text-muted-foreground">-</TableCell>
                  </TableRow>
                  <TableRow className="bg-primary/5 font-semibold">
                    <TableCell className="text-primary">Custom Tariff</TableCell>
                    <TableCell className="text-right">₹{result.totalBill.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TableCell>
                    <TableCell className={`text-right ${result.totalBill > baselineResult.totalBill ? 'text-destructive' : 'text-emerald-500'}`}>
                      {result.totalBill > baselineResult.totalBill ? '+' : ''}₹{(result.totalBill - baselineResult.totalBill).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className={`text-right ${result.totalBill > baselineResult.totalBill ? 'text-destructive' : 'text-emerald-500'}`}>
                      {result.totalBill > baselineResult.totalBill ? '+' : ''}{(((result.totalBill - baselineResult.totalBill) / baselineResult.totalBill) * 100).toFixed(2)}%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        <div>
          <h4 className="font-semibold mb-3 border-b pb-2">Slab-wise Energy Charges</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Slab Range</TableHead>
                <TableHead className="text-right">Units</TableHead>
                <TableHead className="text-right">Rate (₹)</TableHead>
                <TableHead className="text-right">Cost (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.slabBreakdown.map((slab, i) => (
                <TableRow key={i}>
                  <TableCell>{slab.range}</TableCell>
                  <TableCell className="text-right">{slab.units.toLocaleString('en-IN')}</TableCell>
                  <TableCell className="text-right">{slab.rate.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{slab.cost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h4 className="font-semibold mb-3 border-b pb-2">Detailed Charges Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Total Energy Charge</span>
              <span className="font-medium">₹{result.energyCharge.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Fixed Charges</span>
              <span className="font-medium">₹{result.fixedCharge.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Meter Rent</span>
              <span className="font-medium">₹{result.meterRent.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Electricity Duty</span>
              <span className="font-medium">₹{result.electricityDuty.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Fuel Adjustment (FAC)</span>
              <span className="font-medium">₹{result.fac.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Taxes</span>
              <span className="font-medium">₹{result.tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            {result.subsidy > 0 && (
              <div className="flex justify-between py-1 text-green-600 dark:text-green-400 font-medium">
                <span>Government Subsidy</span>
                <span>-₹{result.subsidy.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="pt-4 flex justify-between border-t border-primary/20 text-lg font-bold">
          <span>Net Payable Amount</span>
          <span className="text-primary">₹{result.totalBill.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
}
