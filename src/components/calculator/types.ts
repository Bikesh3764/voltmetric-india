export type ConnectionType = "Residential" | "Commercial" | "Industrial" | "Agricultural";
export type BillingCycle = "Monthly" | "Bi-Monthly";

export interface Slab {
  range: string;
  rate: number;
}

export interface TariffData {
  state: string;
  board: string;
  slabs: Slab[];
  fixedCharge: string;
  revisionDate?: string;
  sourceAuthority?: string;
  orderNumber?: string;
}

export interface CalculationResult {
  consumedUnits: number;
  energyCharge: number;
  fixedCharge: number;
  meterRent: number;
  electricityDuty: number;
  fac: number;
  tax: number;
  subsidy: number;
  totalBill: number;
  slabBreakdown: { range: string; units: number; rate: number; cost: number }[];
}

export interface TariffOverrides {
  perUnitRate?: number;
  fixedCharge?: number;
  meterRent?: number;
  fac?: number;
  duty?: number;
  taxPercentage?: number;
  subsidy?: number;
}

export interface Appliance {
  id: string;
  name: string;
  wattage: number;
  quantity: number;
  hoursPerDay: number;
  daysPerMonth: number;
}

export interface ExtractedField<T> {
  value: T | null;
  confidence: number;
  evidence: string;
}

export interface RealAIExtractionResult {
  isElectricityBill: boolean;
  documentType: string;
  overallConfidence: number;
  consumerNumber: ExtractedField<string>;
  billNumber: ExtractedField<string>;
  billingPeriod: ExtractedField<string>;
  unitsConsumed: ExtractedField<number>;
  totalAmount: ExtractedField<number>;
  tariffCategory: ExtractedField<string>;
}
