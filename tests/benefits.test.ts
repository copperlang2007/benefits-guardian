import { describe, expect, it } from "vitest";
import {
  calculateColaImpact,
  createBenefitSummary,
  rankBenefitAlerts,
} from "../src/index";

describe("calculateColaImpact", () => {
  it("shows the net monthly change after Medicare Part B absorbs part of COLA", () => {
    const result = calculateColaImpact({
      currentSocialSecurity: 1607,
      colaRate: 0.028,
      currentPartBPremium: 185,
      projectedPartBPremium: 202.9,
    });

    expect(result.netMonthlyChange).toBe(27.1);
  });

  it("keeps VA disability compensation separate from taxable Social Security projections", () => {
    const result = calculateColaImpact({
      currentSocialSecurity: 1607,
      colaRate: 0.028,
      currentPartBPremium: 185,
      projectedPartBPremium: 202.9,
      vaDisabilityMonthly: 3737.85,
    });

    expect(result.projectedMonthlyTotal).toBe(5371.95);
  });
});

describe("createBenefitSummary", () => {
  it("combines Social Security, VA, and Medicare Savings Program support", () => {
    const result = createBenefitSummary({
      householdName: "George",
      socialSecurityMonthly: 1607,
      vaDisabilityMonthly: 3737.85,
      medicareSavingsMonthly: 202.9,
    });

    expect(result.monthlyTotal).toBe(5547.75);
  });

  it("flags missing benefit streams for caregiver follow-up", () => {
    const result = createBenefitSummary({
      householdName: "Helen",
      socialSecurityMonthly: 1520,
      medicareSavingsMonthly: 0,
    });

    expect(result.followUps).toContain("Review Medicare Savings Program eligibility");
  });
});

describe("rankBenefitAlerts", () => {
  it("prioritizes urgent claim and premium events before informational alerts", () => {
    const result = rankBenefitAlerts([
      { label: "Document vault reminder", severity: "info" },
      { label: "VA claim appeal deadline", severity: "urgent" },
      { label: "Part B premium increase", severity: "warning" },
    ]);

    expect(result.map((alert) => alert.label)).toEqual([
      "VA claim appeal deadline",
      "Part B premium increase",
      "Document vault reminder",
    ]);
  });
});
