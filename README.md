# Benefits Guardian - Full Expansion

## Executive Summary
Benefits Guardian is the definitive all-in-one dashboard for seniors and veterans to track, optimize, and maximize Social Security, Medicare, and VA benefits in one secure place. It tackles the core frustrations from 2026 chatter: COLA erosion by premiums, complex claims, double taxation fears, and VA/Medicare coordination gaps. Real-time alerts, claim filing assistance, and personalized optimization deliver peace of mind and real dollars back to fixed-income users.

**Target:** 65+ (SS/Medicare) + 9M+ veterans on VA benefits. High overlap with dual-eligible.

## User Personas
1. **George, 78, Vietnam Vet, Arizona** - 100% VA disability + SS $1,607/mo. Pain: Tracking multiple payments, upcoming COLA impact on premiums, filing new claims. Goals: Single view of "what am I getting and when?" + proactive alerts.
2. **Helen, 91, Widow, Florida** - SS + Medicare Part B/D only. Pain: Rising Part B $202.90 eating COLA, understanding new drug cap. Low tech.
3. **Family Admin Sarah, 52** - Power of attorney for parents. Needs audit logs, document sharing, multi-account view.

## Full Feature Set
**V1 (Launch):**
- Secure account linking (SS, Medicare.gov, VA.gov via OAuth where available or secure upload/estimate mode)
- Unified dashboard: Monthly total, breakdown (SS, VA, Medicare savings), upcoming payments calendar.
- COLA & Premium Tracker: 2026 2.8% COLA vs. Part B $202.90 increase - personalized impact calc + "net gain" projection.
- Claim Status & History: VA/SS/Medicare claims tracker with status, estimated decision dates, appeal helper.
- Document Vault: Secure upload (SS card, EOBs, VA letters), AI categorization, share with family/advocate.
- Basic Optimizer: "What if I add this med?" or "File for increased VA rating?" simulations.
- Alerts: Payment received, premium change, claim update, COLA applied.

**V2 (3-6 mo):**
- One-click claim filing assistant (guided forms, auto-populate from vault, e-file where possible).
- AI Benefits Advisor (RAG on SSA/CMS/VA rules): "Am I eligible for extra help with Part D?"
- Family/Caregiver mode with permissioned access and activity logs.
- Tax Optimizer: SS taxation estimator (double tax awareness) + strategies.
- Integration with bank for direct deposit verification.

**V3 (6-18 mo):**
- Full VA claims automation + nexus letter generator (partner with accredited VSOs).
- Medicare Advantage/Supplement shopping with real quotes.
- Estate & survivor benefits planner.
- B2B for financial advisors, elder law attorneys, VSOs (white label + API).

## Pricing
- **Free:** Basic dashboard, manual entry, educational alerts.
- **Premium $7.99/mo or $79/yr:** Auto-linking, unlimited alerts, AI advisor, document AI, family sharing (5 members).
- **Veteran Elite $12.99/mo:** Priority VA claim support, accredited partner intros, advanced simulations.
- **Family Plan $14.99/mo:** Multi-senior household management.
- **B2B/Advisor:** $199/mo - Client dashboards, compliance reports, billing integration.
- **Affiliate:** Referrals to VA-accredited attorneys or financial products (ethical, disclosed).

**Y1 Projection:** 8k users @ $6 ARPU avg = $576k ARR + B2B pilots.

## Market Placement
**Positioning:** "Your command center for retirement benefits. See every dollar, every month, every change - before it surprises you. Built for those who earned it."
**Differentiation:** Unified SS+Medicare+VA (no other app does all three seamlessly), proactive (not reactive gov sites), senior/vet UX, claim assistance not just tracking.

**GTM:**
- **Phase 1:** Content ("2026 COLA vs Premiums: The Real Math"), VA VSO partnerships, AARP email blast, targeted Facebook/YouTube ads to "veterans benefits" + "Social Security 2026".
- **Phase 2:** Product Hunt, military/vet podcasts, senior living facility pilots.
- **Phase 3:** State VA departments, elder law bar associations.
- **Metrics:** Time-to-value <5 min, D7 retention >35%, claim filing completion rate.

## Leverage & Defensibility
1. **Data Network:** Aggregated (anonymized) claim success rates + timing insights create unique benchmarks.
2. **Trust & Accreditation:** Partner with VSOs, become recommended tool.
3. **Regulatory Moat:** Deep integration with gov portals (future OAuth expansions) + compliance expertise.
4. **High Switching Costs:** Document vault + family setup + personalized history.
5. **Brand:** "For those who served and saved" emotional positioning.

## 18-Month Roadmap
**Q2 2026:** V1 dashboard + alerts + vault. Beta with 300 vets/seniors.
**Q3:** AI advisor, family sharing, Stripe billing, mobile apps.
**Q4:** Claim filing v1, VA-specific flows, Spanish.
**Q1 2027:** B2B launch, advanced tax/estate tools.
**Q2 2027:** Full automation, international expansion (Canada/OAS parallels).

## Tech Stack (Same Elite Standard as RxSaver)
Next.js 15, TypeScript, Tailwind/shadcn, Supabase (Postgres + Auth + Storage + pgvector for RAG), Stripe, Vercel. AI: Grok/OpenAI RAG on official PDFs. Security: RLS, encryption at rest, audit logs. Accessibility: AAA, large targets, voice.

## Design & Mockups
See generated images: Unified dashboard with $2,847 total, calm blue theme, vet-specific elements.

**This repo is the full production starter. Deploy to Vercel, connect Supabase, add your keys. Full implementation follows the ultimate-app-builder protocol.**

**Repo:** https://github.com/copperlang2007/benefits-guardian
**Contact for collaboration:** [Your details]

## Working Starter

This repository now includes a tested TypeScript domain core for the first Benefits Guardian calculations:

- Social Security COLA impact after Medicare Part B premium changes
- VA disability compensation kept separate from taxable Social Security projections
- Household benefit summaries for seniors, veterans, and caregiver users
- Priority sorting for benefit alerts such as claim deadlines and premium changes

### Local Verification

```bash
npm ci
npm run ci
```

`npm run ci` builds the TypeScript package and runs the Vitest suite. GitHub Actions runs the same check on pull requests and pushes to `main`.
