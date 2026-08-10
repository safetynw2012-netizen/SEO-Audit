# Link-building playbook — wcsafety.com

## 1. Situation

From `audits/wcsafety-com-2026-05-15.md`:

- Small Shopify storefront, **affiliate model** (self-disclosed), safety/PPE niche.
- ~10–20 URLs visible in Google against a 50+ SKU catalog — the indexable
  surface is under-performing before any off-site work starts (§3.3).
- Eight "Best X 2026" buying guides plus explainer content
  (NIOSH vs. OSHA, N95 vs. KN95 vs. P100, CO detector placement,
  72-hour emergency kit) — this is the linkable half of the site.
- Zero trust pages, zero author attribution (§5.1, §5.3).
- Competing head-on with Consumer Reports, Wirecutter, and This Old House
  on "Best X" terms.

**What this means for link building.** Commercial "Best X" affiliate
pages do not attract editorial links on their own merits — nobody cites
an affiliate roundup. The *explainer and reference* content does:
standards comparisons, placement guidance, preparedness checklists.
Those are what municipal emergency-management pages, university EHS
departments, fire departments, and workplace-safety trainers link to.
So the strategy is: **earn links to reference assets, then pass equity
internally to the collections and guides that monetise** (which also
fixes the internal-linking gap in audit §7).

## 2. Rules of engagement

Non-negotiable. An affiliate site in a YMYL-adjacent niche (respirators,
CO detectors — people get hurt when this is wrong) has a thinner margin
for error with Google's spam systems than a normal ecommerce site.

**We do not:**

- Buy links, exchange links, or trade product for links. This is a
  direct violation of Google's link-spam policy and the penalty
  asymmetry for a thin-affiliate site is severe.
- Use PBNs, link farms, or paid guest-post networks ("we place your
  link on DA50+ sites for $X" — all of these are the same network).
- Mass-blast scraped contact lists. Every send is individually qualified.
- Comment-, forum-, or profile-spam.
- Misrepresent the business. We are an affiliate reviewer, not a
  manufacturer, not a distributor, and not a testing laboratory.
  Outreach that implies otherwise is both dishonest and one screenshot
  away from being the reason a link gets pulled.

**We do:**

- Mark our own outbound affiliate links `rel="sponsored"` (or
  `rel="nofollow sponsored"`). Required by Google, and unmarked
  monetised links on a page we are asking others to link to is the
  fastest way to get the request declined.
- Disclose the affiliate relationship in outreach when the prospect is
  a .gov/.edu/non-profit. They will find out; finding out from us costs
  nothing and finding out later costs the link.
- Keep every claim in outreach checkable against a published page.

## 3. Tactics, ranked for this site

Ranked by expected links per hour of work, adjusted for how well each
fits a small affiliate site with no existing authority. Start at the top.

### T1 — Build the linkable assets first `effort: high` `prereq: Gate 0`

Nothing else on this list works without something worth linking to. The
site currently has guides, not assets. Highest-value gaps, in order:

1. **Respirator standards comparison table** — NIOSH N95 / P100 vs.
   KN95 (GB2626) vs. FFP2/FFP3 (EN 149), with assigned protection
   factors, fit-test requirements, and what each is *not* rated for.
   The existing `n95-vs-kn95-vs-p100` guide is the seed; the asset is
   the sortable, citable table with sources.
2. **CO detector placement diagram** — per-floor, per-room placement
   with the manufacturer and NFPA 720 / IRC clearances stated. Seeds
   from `co-detector-placement-guide-2026`. Diagrams get linked and
   embedded; prose does not.
3. **72-hour kit checklist (printable PDF + HTML)** — seeds from the
   existing kit guide. This is the single most-linked asset format in
   the preparedness space, because county emergency-management pages
   need something to hand residents.
4. **Hard hat class/type decision chart** — Type I vs. Type II, Class
   G/E/C, and the 2024 ANSI Z89.1 revision. Seeds from
   `best-hard-hats-ranked-2026`.

Each asset must live on its own URL, carry the named author and
methodology link, and keep affiliate links *off* the asset page itself
(link to the buying guide instead). A page with an Amazon button above
the fold does not get linked by a fire department.

### T2 — Resource-page link building `effort: medium` `yield: high`

The core tactic. Targets: county and city emergency-management pages,
university and hospital EHS departments, fire-district public-education
pages, CERT chapters, trade-union safety committees, and community
preparedness non-profits. All of them maintain "resources" or "links"
pages and all of them need exactly the assets in T1.

Find them with the operators in `prospecting.md` §1. Pitch the *asset*,
never the storefront. Template: `outreach-templates.md` §A.

### T3 — Broken link building on dead safety references `effort: medium` `yield: medium-high`

This niche is unusually rich in dead links because the reference base
churns: CDC/NIOSH reorganised URLs post-2020, dozens of pandemic-era
KN95 guidance pages were pulled, and manufacturer product-support pages
die on every catalog refresh. Find resource pages with dead outbound
links, offer the T1 asset as the replacement. Template: §B.

### T4 — Unlinked brand-mention reclamation `effort: low` `yield: low-medium`

Cheap, fast, and safe. Find "WC Safety" mentioned without a link
(forums, Reddit, roundups, supplier pages) and ask. Volume will be
small at this authority level, but the cost per attempt is minutes.
Operators in `prospecting.md` §2. Template: §C.

### T5 — Expert sourcing / journalist requests `effort: medium` `prereq: named credentialed author`

Qwoted, Featured, SourceBottle, and reporters' direct calls on X/
LinkedIn. Wildfire-smoke season, winter CO-poisoning season, and any
recall news generate steady requests for safety-equipment comment.
**Hard prerequisite:** a real named person with a real credential
(OSHA 30, CSP, CIH, fire service, industrial hygiene, or documented
hands-on testing). Without one, do not pitch — a fabricated expert is
a fraud risk, not an SEO tactic. This tactic is also the one that most
directly repairs the E-E-A-T gap in audit §5.3.

### T6 — Trade and association listings `effort: low` `yield: low, but foundational`

Legitimate industry directories, safety-association member lists, and
local business listings. Not a growth lever, but establishes basic
entity footprint. Only list where the site genuinely qualifies —
do not join a distributor directory as an affiliate.

### T7 — Contributed articles to safety trade publications `effort: high` `yield: medium`

Real editorial outlets in occupational safety and preparedness accept
bylined contributions. This is a legitimate tactic and completely
distinct from the guest-post networks banned in §2: real outlet, real
editor, real editorial standard, no payment in either direction. Only
viable once T5's named expert exists.

### T8 — Seasonal digital PR `effort: high` `yield: spiky`

Wildfire smoke (Jun–Oct), heating-season CO poisoning (Nov–Feb), and
National Preparedness Month (September) all generate news demand for
exactly this site's subject matter. Requires an original angle — a
survey, a price-tracking dataset, or hands-on test results — not a
press release. Park this until T1–T5 are running.

## 4. Anchor text and velocity

- Let the linker choose the anchor. Requesting exact-match commercial
  anchors ("best n95 respirators") on an editorial link is both a
  footprint and a reason to be declined.
- Expected natural distribution: brand ("WC Safety"), bare URL, and
  descriptive phrases ("respirator standards comparison"). If
  exact-match commercial anchors exceed ~5% of the profile, stop.
- No velocity targets. A quota turns qualified outreach into blasting.
  Ten well-qualified sends a week beats a hundred scraped ones.

## 5. Measurement

Review monthly, log in `log.md`:

- **Referring domains** total and net-new (Ahrefs/Semrush — audit §9.10
  already calls for this account).
- **RDs to the T1 assets** specifically, and **internal equity flow**
  from assets → collections (fixes audit §7 at the same time).
- **Referral sessions** from acquired links — a link that sends real
  visitors is worth more than its metric.
- **GSC:** impressions and average position for the explainer terms,
  and the "Duplicate without user-selected canonical" count from audit
  §9.7 (a canonical mess wastes any equity we earn).
- **Outreach funnel:** sent → replied → linked, by tactic. Kill any
  tactic under ~5% link rate after 40 qualified sends.

## 6. Sequencing

| When       | Focus                                                                  |
| ---------- | ---------------------------------------------------------------------- |
| Now        | Gate 0 (trust pages, author, disclosure). No outreach.                 |
| Weeks 1–3  | T1 asset #1 (respirator standards table) + #3 (72-hour checklist PDF). |
| Weeks 3–6  | T2 resource-page outreach against those two assets. T4 in parallel.    |
| Weeks 6–10 | T3 broken-link outreach. T1 assets #2 and #4.                          |
| Month 3+   | T5 expert sourcing, T6 listings, then T7.                              |
| Sep / Nov  | T8 seasonal pushes, if T1–T5 are healthy.                              |
