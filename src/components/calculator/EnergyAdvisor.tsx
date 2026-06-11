"use client";

import { CalculationResult, Appliance, TariffData } from "./types";
import { Leaf, Zap, Sun, AlertTriangle, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  result: CalculationResult;
  appliances?: Appliance[];
  tariff: TariffData;
}

export function EnergyAdvisor({ result, appliances, tariff }: Props) {
  let score = 100;
  let rating = "Excellent";
  let ratingColor = "text-emerald-500";
  let bgRatingColor = "bg-emerald-500";

  if (result.consumedUnits <= 100) {
    score = 100 - (result.consumedUnits / 100) * 10;
    rating = "Excellent";
    ratingColor = "text-emerald-500";
    bgRatingColor = "bg-emerald-500";
  } else if (result.consumedUnits <= 250) {
    score = 89 - ((result.consumedUnits - 100) / 150) * 19;
    rating = "Good";
    ratingColor = "text-blue-500";
    bgRatingColor = "bg-blue-500";
  } else if (result.consumedUnits <= 500) {
    score = 69 - ((result.consumedUnits - 250) / 250) * 19;
    rating = "Average";
    ratingColor = "text-yellow-500";
    bgRatingColor = "bg-yellow-500";
  } else if (result.consumedUnits <= 800) {
    score = 49 - ((result.consumedUnits - 500) / 300) * 19;
    rating = "High Usage";
    ratingColor = "text-orange-500";
    bgRatingColor = "bg-orange-500";
  } else {
    score = Math.max(0, 29 - ((result.consumedUnits - 800) / 400) * 29);
    rating = "Very High Usage";
    ratingColor = "text-red-500";
    bgRatingColor = "bg-red-500";
  }

  score = Math.round(score);

  const co2Kg = result.consumedUnits * 0.85;
  const avgRate = result.consumedUnits > 0 ? result.totalBill / result.consumedUnits : 0;

  let topAppliance: Appliance | null = null;
  if (appliances && appliances.length > 0) {
    topAppliance = [...appliances].sort((a, b) => {
      const aUsage = a.wattage * a.quantity * a.hoursPerDay * a.daysPerMonth;
      const bUsage = b.wattage * b.quantity * b.hoursPerDay * b.daysPerMonth;
      return bUsage - aUsage;
    })[0];
  }

  const behavioralTitle = "Behavioral Optimization";
  let behavioralDesc = "Optimize your general usage to save energy.";
  let behavioralSavings = result.totalBill * 0.05;

  if (topAppliance && topAppliance.hoursPerDay > 2) {
    const reducedUnits = (topAppliance.wattage * topAppliance.quantity * 2 * topAppliance.daysPerMonth) / 1000;
    behavioralSavings = reducedUnits * avgRate;
    behavioralDesc = `Reduce usage of ${topAppliance.name} by 2 hours/day to save approximately ${reducedUnits.toFixed(0)} units.`;
  } else if (topAppliance) {
    const topUnits = (topAppliance.wattage * topAppliance.quantity * topAppliance.hoursPerDay * topAppliance.daysPerMonth) / 1000;
    const reducedUnits = topUnits * 0.1;
    behavioralSavings = reducedUnits * avgRate;
    behavioralDesc = `Optimize your ${topAppliance.name} usage by 10% to see immediate savings.`;
  }

  const upgradeTitle = "Appliance Upgrade";
  let upgradeDesc = "Switch to 5-star energy efficient appliances.";
  let upgradeSavings = result.totalBill * 0.15;
  
  if (topAppliance) {
     upgradeDesc = `Upgrading your ${topAppliance.name} to a modern 5-star equivalent can cut its consumption by 20%.`;
     const topUnits = (topAppliance.wattage * topAppliance.quantity * topAppliance.hoursPerDay * topAppliance.daysPerMonth) / 1000;
     upgradeSavings = (topUnits * 0.20) * avgRate;
  }

  const solarTitle = "Solar Adoption";
  const solarDesc = "A 3kW system can offset ~360 units/month.";
  const solarSavings = Math.min(result.totalBill, 360 * avgRate);

  return (
    <div className="mt-8 space-y-6 border-t pt-8 print:hidden">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-6 w-6 text-yellow-500" />
        <h3 className="text-xl font-bold font-geist">AI Energy Advisor</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Score Card */}
        <Card className="bg-card">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Efficiency Score</div>
                <div className="text-4xl font-bold font-geist mt-1">{score}<span className="text-lg text-muted-foreground">/100</span></div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${ratingColor} border-current bg-opacity-10`}>
                {rating}
              </div>
            </div>
            
            {/* Custom Progress Bar */}
            <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
              <div className={`h-full ${bgRatingColor} transition-all duration-1000 ease-in-out`} style={{ width: `${score}%` }} />
            </div>
            
            <div className="text-sm text-muted-foreground">
              Based on your monthly consumption of <span className="font-semibold text-foreground">{result.consumedUnits.toFixed(1)} units</span>.
            </div>
          </CardContent>
        </Card>

        {/* CO2 Impact */}
        <Card className="bg-card">
          <CardContent className="p-6 space-y-4 flex flex-col justify-center h-full">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <Leaf className="h-8 w-8 text-emerald-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Carbon Footprint</div>
                <div className="text-3xl font-bold font-geist mt-1">{co2Kg.toFixed(1)} <span className="text-lg text-muted-foreground">kg CO₂</span></div>
                <div className="text-sm text-muted-foreground mt-1">Estimated monthly emissions based on grid average.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Personalized Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <Card className="border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
            <CardContent className="p-5 space-y-3">
              <div className="p-2 w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h5 className="font-bold">{behavioralTitle}</h5>
              <p className="text-sm text-muted-foreground min-h-[40px]">{behavioralDesc}</p>
              <div className="pt-2 border-t border-blue-500/20">
                <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mb-1">Potential Savings</div>
                <div className="text-2xl font-bold font-geist text-blue-700 dark:text-blue-300">
                  ₹{behavioralSavings.toFixed(0)}<span className="text-sm font-normal">/mo</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 transition-colors">
            <CardContent className="p-5 space-y-3">
              <div className="p-2 w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h5 className="font-bold">{upgradeTitle}</h5>
              <p className="text-sm text-muted-foreground min-h-[40px]">{upgradeDesc}</p>
              <div className="pt-2 border-t border-purple-500/20">
                <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold uppercase tracking-wider mb-1">Potential Savings</div>
                <div className="text-2xl font-bold font-geist text-purple-700 dark:text-purple-300">
                  ₹{upgradeSavings.toFixed(0)}<span className="text-sm font-normal">/mo</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
            <CardContent className="p-5 space-y-3">
              <div className="p-2 w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Sun className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h5 className="font-bold">{solarTitle}</h5>
              <p className="text-sm text-muted-foreground min-h-[40px]">{solarDesc}</p>
              <div className="pt-2 border-t border-amber-500/20">
                <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider mb-1">Potential Savings</div>
                <div className="text-2xl font-bold font-geist text-amber-700 dark:text-amber-300">
                  ₹{solarSavings.toFixed(0)}<span className="text-sm font-normal">/mo</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
