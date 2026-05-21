export interface ColaImpactInput {
  currentSocialSecurity: number;
  colaRate: number;
  currentPartBPremium: number;
  projectedPartBPremium: number;
  vaDisabilityMonthly?: number;
}

export interface ColaImpact {
  grossMonthlyIncrease: number;
  partBPremiumIncrease: number;
  netMonthlyChange: number;
  projectedSocialSecurity: number;
  projectedMonthlyTotal: number;
}

export interface BenefitSummaryInput {
  householdName: string;
  socialSecurityMonthly: number;
  vaDisabilityMonthly?: number;
  medicareSavingsMonthly?: number;
}

export interface BenefitSummary {
  householdName: string;
  monthlyTotal: number;
  annualTotal: number;
  followUps: string[];
}

export type AlertSeverity = "urgent" | "warning" | "info";

export interface BenefitAlert {
  label: string;
  severity: AlertSeverity;
}

const severityRank: Record<AlertSeverity, number> = {
  urgent: 0,
  warning: 1,
  info: 2,
};

export function calculateColaImpact(input: ColaImpactInput): ColaImpact {
  assertNonNegative(input.currentSocialSecurity, "currentSocialSecurity");
  assertNonNegative(input.colaRate, "colaRate");
  assertNonNegative(input.currentPartBPremium, "currentPartBPremium");
  assertNonNegative(input.projectedPartBPremium, "projectedPartBPremium");
  assertNonNegative(input.vaDisabilityMonthly ?? 0, "vaDisabilityMonthly");

  const grossMonthlyIncrease = input.currentSocialSecurity * input.colaRate;
  const partBPremiumIncrease =
    input.projectedPartBPremium - input.currentPartBPremium;
  const netMonthlyChange = grossMonthlyIncrease - partBPremiumIncrease;
  const projectedSocialSecurity =
    input.currentSocialSecurity + netMonthlyChange;
  const projectedMonthlyTotal =
    projectedSocialSecurity + (input.vaDisabilityMonthly ?? 0);

  return {
    grossMonthlyIncrease: money(grossMonthlyIncrease),
    partBPremiumIncrease: money(partBPremiumIncrease),
    netMonthlyChange: money(netMonthlyChange),
    projectedSocialSecurity: money(projectedSocialSecurity),
    projectedMonthlyTotal: money(projectedMonthlyTotal),
  };
}

export function createBenefitSummary(
  input: BenefitSummaryInput,
): BenefitSummary {
  assertNonNegative(input.socialSecurityMonthly, "socialSecurityMonthly");
  assertNonNegative(input.vaDisabilityMonthly ?? 0, "vaDisabilityMonthly");
  assertNonNegative(input.medicareSavingsMonthly ?? 0, "medicareSavingsMonthly");

  const monthlyTotal =
    input.socialSecurityMonthly +
    (input.vaDisabilityMonthly ?? 0) +
    (input.medicareSavingsMonthly ?? 0);

  const followUps: string[] = [];
  if (!input.vaDisabilityMonthly) {
    followUps.push("Confirm VA benefit eligibility or current rating");
  }
  if (!input.medicareSavingsMonthly) {
    followUps.push("Review Medicare Savings Program eligibility");
  }

  return {
    householdName: input.householdName,
    monthlyTotal: money(monthlyTotal),
    annualTotal: money(monthlyTotal * 12),
    followUps,
  };
}

export function rankBenefitAlerts(alerts: BenefitAlert[]): BenefitAlert[] {
  return [...alerts].sort(
    (left, right) => severityRank[left.severity] - severityRank[right.severity],
  );
}

function assertNonNegative(value: number, fieldName: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${fieldName} must be a non-negative number`);
  }
}

function money(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
