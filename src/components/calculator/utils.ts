import { Slab, CalculationResult, ConnectionType, BillingCycle, TariffOverrides } from "./types";

export function calculateBill(
  units: number,
  slabs: Slab[],
  fixedChargeValue: number,
  connectionType: ConnectionType,
  billingCycle: BillingCycle,
  overrides?: TariffOverrides
): CalculationResult {
  const multiplier = billingCycle === "Bi-Monthly" ? 2 : 1;
  let remainingUnits = units;
  let energyCharge = 0;
  const slabBreakdown: { range: string; units: number; rate: number; cost: number }[] = [];

  // If perUnitRate override exists, bypass slab logic
  if (overrides && overrides.perUnitRate !== undefined) {
    energyCharge = units * overrides.perUnitRate;
    slabBreakdown.length = 0; // Clear slabs
    slabBreakdown.push({ range: "Custom Flat Rate", units, rate: overrides.perUnitRate, cost: energyCharge });
  } else {
    // Parse slabs and calculate
    for (let i = 0; i < slabs.length; i++) {
      const slab = slabs[i];
      const isLast = i === slabs.length - 1;
      let slabLimit = Infinity;

      if (!isLast && slab.range.includes("-")) {
        const parts = slab.range.split("-");
        slabLimit = (parseInt(parts[1]) - parseInt(parts[0]) + 1) * multiplier;
      }

      const unitsInThisSlab = Math.min(remainingUnits, slabLimit);
      if (unitsInThisSlab > 0) {
        const cost = unitsInThisSlab * slab.rate;
        energyCharge += cost;
        slabBreakdown.push({
          range: slab.range,
          units: unitsInThisSlab,
          rate: slab.rate,
          cost: cost
        });
        remainingUnits -= unitsInThisSlab;
      }

      if (remainingUnits <= 0) break;
    }
  }

  // Multipliers based on connection type
  let connMultiplier = 1;
  if (connectionType === "Commercial") connMultiplier = 1.5;
  if (connectionType === "Industrial") connMultiplier = 2.0;
  if (connectionType === "Agricultural") connMultiplier = 0.5;

  energyCharge = energyCharge * connMultiplier;
  
  const fixedCharge = overrides?.fixedCharge !== undefined ? overrides.fixedCharge : (fixedChargeValue * multiplier * connMultiplier);
  const meterRent = overrides?.meterRent !== undefined ? overrides.meterRent : (20 * multiplier);
  const electricityDuty = overrides?.duty !== undefined ? overrides.duty : (energyCharge * 0.05);
  const fac = overrides?.fac !== undefined ? overrides.fac : (units * 0.15);
  const taxPercent = overrides?.taxPercentage !== undefined ? overrides.taxPercentage : 9;
  const tax = (energyCharge + fixedCharge) * (taxPercent / 100);
  
  let subsidy = overrides?.subsidy !== undefined ? overrides.subsidy : 0;
  if (overrides?.subsidy === undefined) {
    if (connectionType === "Agricultural") {
      subsidy = energyCharge * 0.5;
    } else if (units < 100 * multiplier && connectionType === "Residential") {
      subsidy = energyCharge * 0.2;
    }
  }

  const totalBill = energyCharge + fixedCharge + meterRent + electricityDuty + fac + tax - subsidy;

  return {
    consumedUnits: units,
    energyCharge,
    fixedCharge,
    meterRent,
    electricityDuty,
    fac,
    tax,
    subsidy,
    totalBill,
    slabBreakdown
  };
}
