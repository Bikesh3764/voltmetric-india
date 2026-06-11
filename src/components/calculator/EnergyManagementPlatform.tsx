"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QuickBillTab } from "./QuickBillTab";
import { MeterReadingTab } from "./MeterReadingTab";
import { ApplianceTab } from "./ApplianceTab";
import { SolarSavingsTab } from "./SolarSavingsTab";
import { BillBreakdown } from "./BillBreakdown";
import { InsightsAndCharts } from "./InsightsAndCharts";
import { EnergyAdvisor } from "./EnergyAdvisor";
import { TariffOverrideDrawer } from "./TariffOverrideDrawer";
import { AIBillAnalyzer } from "./AIBillAnalyzer";
import { CalculationResult, TariffData, ConnectionType, BillingCycle, Appliance, TariffOverrides } from "./types";
import { calculateBill } from "./utils";

interface Props {
  tariff: TariffData;
}

export function EnergyManagementPlatform({ tariff }: Props) {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [baselineResult, setBaselineResult] = useState<CalculationResult | null>(null);
  const [activeAppliances, setActiveAppliances] = useState<Appliance[] | undefined>(undefined);
  const [connType, setConnType] = useState<ConnectionType>("Residential");
  const [cycle, setCycle] = useState<BillingCycle>("Monthly");
  const [activeTab, setActiveTab] = useState("quick");
  const [overrides, setOverrides] = useState<TariffOverrides | null>(null);
  const [lastParams, setLastParams] = useState<{units: number, type: ConnectionType, cycleStr: BillingCycle} | null>(null);
  
  const lastParamsRef = useRef(lastParams);
  useEffect(() => {
    lastParamsRef.current = lastParams;
  }, [lastParams]);

  const performCalculation = useCallback((units: number, type: ConnectionType, cycleStr: BillingCycle, currentOverrides: TariffOverrides | null) => {
    const fixedValue = parseFloat(tariff.fixedCharge.replace(/\D/g, '')) || 100;
    const base = calculateBill(units, tariff.slabs, fixedValue, type, cycleStr);
    setBaselineResult(base);

    if (currentOverrides) {
      const custom = calculateBill(units, tariff.slabs, fixedValue, type, cycleStr, currentOverrides);
      setResult(custom);
    } else {
      setResult(base);
    }
  }, [tariff]);

  const handleQuickCalculate = (units: number, type: ConnectionType, cycleStr: BillingCycle) => {
    setActiveAppliances(undefined);
    setConnType(type);
    setCycle(cycleStr);
    setLastParams({units, type, cycleStr});
    performCalculation(units, type, cycleStr, overrides);
  };

  const handleMeterCalculate = (units: number) => {
    setActiveAppliances(undefined);
    setLastParams({units, type: "Residential", cycleStr: "Monthly"});
    performCalculation(units, "Residential", "Monthly", overrides);
  };

  const handleApplianceCalculate = (units: number, appliances?: Appliance[]) => {
    setActiveAppliances(appliances);
    setLastParams({units, type: "Residential", cycleStr: "Monthly"});
    performCalculation(units, "Residential", "Monthly", overrides);
  };

  const handleOverridesChange = useCallback((newOverrides: TariffOverrides | null) => {
    setOverrides(newOverrides);
    if (lastParamsRef.current) {
      performCalculation(
        lastParamsRef.current.units, 
        lastParamsRef.current.type, 
        lastParamsRef.current.cycleStr, 
        newOverrides
      );
    }
  }, [performCalculation]);

  return (
    <Card className="w-full relative bg-card/80 backdrop-blur-md shadow-sm border-t-primary border-t-4">
      {result && activeTab !== "solar" && (
        <div className="absolute inset-0 -z-10 bg-primary/5 rounded-xl blur-xl transition-all"></div>
      )}
      <CardHeader className="pb-2 print:hidden flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-2xl">{tariff.board} Energy Management</CardTitle>
          <CardDescription>Comprehensive billing, analysis, and prediction for {tariff.state}</CardDescription>
        </div>
        <TariffOverrideDrawer onOverridesChange={handleOverridesChange} />
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full print:hidden">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="quick">Quick Bill</TabsTrigger>
            <TabsTrigger value="meter">Meter Reading</TabsTrigger>
            <TabsTrigger value="appliance">Appliance Mode</TabsTrigger>
            <TabsTrigger value="solar">Solar Savings</TabsTrigger>
            <TabsTrigger value="analyzer" className="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" /></svg>
              AI Analyzer
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="quick">
            <QuickBillTab onCalculate={handleQuickCalculate} />
          </TabsContent>
          <TabsContent value="meter">
            <MeterReadingTab onCalculate={handleMeterCalculate} />
          </TabsContent>
          <TabsContent value="appliance">
            <ApplianceTab onCalculate={handleApplianceCalculate} />
          </TabsContent>
          <TabsContent value="solar">
            <SolarSavingsTab />
          </TabsContent>
          <TabsContent value="analyzer">
            <AIBillAnalyzer tariff={tariff} />
          </TabsContent>
        </Tabs>

        {activeTab !== "solar" && activeTab !== "analyzer" && result && (
          <>
            <BillBreakdown 
              result={result} 
              baselineResult={baselineResult}
              isCustomMode={!!overrides}
              tariff={tariff} 
              connectionType={activeTab === "quick" ? connType : "Residential"} 
              billingCycle={activeTab === "quick" ? cycle : "Monthly"} 
            />
            <InsightsAndCharts result={result} />
            <EnergyAdvisor result={result} appliances={activeAppliances} tariff={tariff} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
