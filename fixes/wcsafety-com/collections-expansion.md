# Collections Expansion Plan — wcsafety.com

Companion to `audits/wcsafety-com-2026-05-15.md`, finding 4.7 and
the "thin collection footprint" issue. Today the store exposes
~11 indexable collections, several of which are too narrow
(`3m-6500-series-half-mask-respirators`, `howard-leight-cordless-ear-plugs`)
and one of which should not exist at all (`master-collection`).

This document recommends a two-tier IA: **parent PPE categories**
that mirror OSHA / ANSI hazard groupings and how buyers actually
search, with **child collections** underneath that map 1:1 to
buying-guide topics. Brand-specific subsets (3M, Howard Leight,
MSA, Honeywell, etc.) become **product filters within a child
collection**, not standalone collections.

---

## Design principles

1. **Collections mirror search intent, not warehouse SKUs.** A
   shopper searches "n95 respirator," not "3M Disposable
   Respirators." Build the collection around the query.
2. **Every collection earns its keep.** Each one needs (a) enough
   search demand to justify a URL, (b) at least 5–10 affiliate-able
   products, and (c) a matching buying guide or comparison article
   that links into it.
3. **Brand = filter, not collection.** "3M N95" lives as a brand
   filter inside `/collections/n95-respirators`. This avoids the
   long tail of dead-end one-product collections.
4. **Parent collections are landing pages, not just listings.**
   `/collections/respiratory-protection` should have 200–400 words
   of curation copy linking to all child collections, plus the
   subset of top products. This is where E-E-A-T and topical
   authority compounds.
5. **Cap top-level nav at 8–10 parents.** Everything else lives one
   click deeper.

---

## Recommended taxonomy

Legend: `[EXISTS]` already live, `[RENAME]` exists but needs a
new handle/title, `[NEW]` to be created, `[MERGE]` should be
absorbed into a filter on a broader collection.

### 1. Head Protection `[EXISTS]`
- Hard Hats `[NEW]`
- Bump Caps `[NEW]`
- Welding Helmets `[NEW]` *(cross-listed under Welding Safety)*
- Hard Hat Accessories — liners, chinstraps, lamp clips `[NEW]`

### 2. Eye Protection `[NEW parent]`
- Safety Glasses `[NEW]`
- Safety Goggles `[EXISTS]`
- Anti-Fog Safety Glasses `[NEW]` *(high-intent buyer query)*
- Prescription Safety Glasses `[NEW]`
- Chemical Splash Goggles `[NEW]`
- Welding Goggles `[NEW]` *(cross-list)*
- Laser Safety Glasses `[NEW]`

### 3. Face Protection `[EXISTS — promote to parent]`
- Face Shields `[EXISTS]`
- Mesh Face Shields `[NEW]` *(forestry / landscaping)*
- Welding Hoods `[NEW]`

### 4. Hearing Protection `[NEW parent]`
- Ear Plugs (Disposable Foam) `[NEW]`
- Reusable Ear Plugs `[NEW]`
- Corded Ear Plugs `[NEW]`
- Earmuffs `[NEW]`
- Electronic / Shooting Earmuffs `[NEW]` *(very high CPC niche)*
- Banded Hearing Protectors `[NEW]`
- `howard-leight-cordless-ear-plugs` `[MERGE]` → becomes brand
  filter inside Ear Plugs

### 5. Respiratory Protection `[NEW parent]`
- N95 Respirators `[NEW]` *(matches existing buying guide)*
- KN95 Masks `[NEW]`
- Surgical / Procedure Masks `[NEW]`
- Half-Mask Respirators `[NEW]`
- Full-Face Respirators `[NEW]`
- PAPR Systems `[NEW]`
- Respirator Cartridges & Filters `[NEW]`
- Dust Masks `[NEW]`
- `3m-disposable-respirators` `[MERGE]` → brand filter
- `3m-6500-series-half-mask-respirators` `[MERGE]` → brand filter

### 6. Hand Protection `[NEW parent]`
- Work Gloves `[NEW]`
- Cut-Resistant Gloves (A2 / A4 / A6 / A9) `[NEW]`
- Nitrile Disposable Gloves `[NEW]`
- Latex Gloves `[EXISTS]`
- Chemical-Resistant Gloves `[NEW]`
- Heat-Resistant Gloves `[NEW]`
- Welding Gloves `[NEW]` *(cross-list)*
- Anti-Vibration Gloves `[NEW]`
- Mechanic Gloves `[NEW]`
- Cold-Weather Work Gloves `[NEW]`

### 7. Foot Protection `[NEW parent]`
- Steel-Toe Boots `[NEW]`
- Composite-Toe Boots `[NEW]`
- Slip-Resistant Shoes `[NEW]`
- Waterproof Work Boots `[NEW]`
- Rubber / Chemical Boots `[NEW]`
- Boot Covers (Disposable) `[NEW]`
- Metatarsal Guards `[NEW]`
- Anti-Static / ESD Footwear `[NEW]`

### 8. Body Protection & Workwear `[NEW parent]`
- High-Visibility Vests (Class 2 / Class 3) `[NEW]`
- Hi-Vis Jackets & Rainwear `[NEW]`
- Disposable Coveralls (Tyvek-style) `[NEW]`
- Reusable Coveralls `[NEW]`
- Lab Coats `[NEW]`
- Chemical / Welding Aprons `[NEW]`
- Cooling Vests `[NEW]` *(seasonal — peaks May–Aug)*
- FR (Flame-Resistant) Clothing `[NEW]`
- Arc-Flash PPE `[NEW]`

### 9. Fall Protection `[NEW parent]`
- Safety Harnesses `[NEW]`
- Lanyards & Shock Absorbers `[NEW]`
- Self-Retracting Lifelines (SRLs) `[NEW]`
- Roof Anchors `[NEW]`
- Confined-Space Tripods `[NEW]`
- Fall Protection Kits `[NEW]`

### 10. Fire Safety `[NEW parent]`
- Fire Extinguishers `[NEW]`
- Fire Blankets `[NEW]`
- Escape Ladders `[NEW]`
- Fireproof Document Bags `[NEW]`
- Fireproof Safes `[NEW]`

### 11. Detection & Alarms `[NEW parent]`
- Smoke Detectors `[NEW]` *(matches existing guide)*
- Carbon Monoxide Detectors `[NEW]` *(matches existing guide)*
- Combination Smoke + CO Detectors `[NEW]`
- Gas Detectors (4-gas / multi-gas) `[NEW]`
- Radon Detectors `[NEW]`
- Water Leak Detectors `[NEW]`
- Personal Gas Monitors `[NEW]`

### 12. First Aid & Medical `[NEW parent]`
- First Aid Kits (Home / Workplace / Vehicle) `[NEW]`
- Trauma Kits / IFAKs `[NEW]`
- Bleeding Control Kits `[NEW]`
- AEDs `[NEW]`
- Eye Wash Stations `[NEW]`
- Burn Care Kits `[NEW]`
- ANSI Class A / Class B Refill Kits `[NEW]`

### 13. Emergency Preparedness `[EXISTS — promote to parent]`
- Emergency Shelters `[EXISTS]`
- Emergency Food Supplies (long shelf life) `[NEW]`
- Water Storage & Filtration `[NEW]`
- Bug-Out Bags / 72-Hour Kits `[NEW]`
- Emergency Radios (Hand-Crank / NOAA) `[NEW]`
- Solar Chargers & Power Banks `[NEW]`
- Emergency Blankets `[NEW]`
- Hurricane Prep Supplies `[NEW]` *(seasonal — peaks Jun–Oct)*
- Earthquake Prep Supplies `[NEW]`
- Wildfire Prep & Smoke Defense `[NEW]` *(seasonal — peaks Jul–Oct)*
- Winter Storm Prep `[NEW]` *(seasonal — peaks Nov–Feb)*

### 14. Power & Generators `[EXISTS — promote to parent]`
- Portable Generators `[EXISTS]` *(rename from "Generators")*
- Inverter Generators `[NEW]`
- Solar Generators / Portable Power Stations `[NEW]`
- Dual-Fuel & Tri-Fuel Generators `[NEW]`
- Standby / Home Generators `[NEW]`
- Heavy-Duty Extension Cords `[NEW]`
- Transfer Switches `[NEW]`

### 15. Site & Traffic Safety `[NEW parent]`
- Safety Cones `[NEW]`
- Caution / Barricade Tape `[NEW]`
- Safety Signs (OSHA / ANSI) `[NEW]`
- Floor Marking Tape `[NEW]`
- Wheel Chocks `[NEW]`
- Traffic Barriers & Delineators `[NEW]`

### 16. Lockout / Tagout (LOTO) `[NEW parent]`
- Padlocks `[NEW]`
- Lockout Hasps `[NEW]`
- Circuit Breaker Lockouts `[NEW]`
- Valve Lockouts `[NEW]`
- LOTO Kits & Stations `[NEW]`
- Lockout Tags `[NEW]`

### 17. Welding Safety `[NEW parent]`
- Welding Helmets (Auto-Darkening) `[NEW]`
- Welding Gloves `[NEW]`
- Welding Jackets & Sleeves `[NEW]`
- Welding Curtains & Screens `[NEW]`
- Welding Blankets `[NEW]`
- Welding Respirators / PAPR `[NEW]`

### 18. Chemical & Hazmat Safety `[NEW parent]`
- Spill Kits (Universal / Oil-Only / Hazmat) `[NEW]`
- Absorbent Pads & Socks `[NEW]`
- Chemical Storage Cabinets `[NEW]`
- Secondary Containment `[NEW]`
- Hazmat Suits `[NEW]`
- Decontamination Showers `[NEW]`

### 19. Personal Safety & EDC `[NEW parent]`
- Pepper Spray `[NEW]`
- Personal Alarms `[NEW]`
- Tactical Flashlights `[NEW]`
- Self-Defense Keychains `[NEW]`
- Door Stop Alarms `[NEW]`
- Window Break Alarms `[NEW]`

### 20. Tools `[EXISTS — restructure]`
The current `/collections/tools` is too broad to rank for anything.
Split into:
- Wrenches `[EXISTS]`
- Multi-Tools `[NEW]`
- Insulated / Electrician's Tools `[NEW]`
- Tool Belts & Bags `[NEW]`
- Tool Boxes `[NEW]`
- Magnetic Pickup Tools `[NEW]`
- The parent `/collections/tools` becomes a hub page only.

### Deprecate / hide
- `master-collection` — `noindex` and remove from nav (this is
  Shopify's unconfigured default; addressed in audit 4.7).
- `product-reviews` — keep as a *blog category*, not a product
  collection. Collections are for products; reviews live under
  `/blogs/reviews/`.

---

## Quick math

- Today: ~11 collections, ~3 of which are good candidates as-is.
- Target: 20 parent collections × an average of ~5 children =
  ~100 child collections, plus the 20 parent landing pages.
- That's the catalog skeleton that a "100 products" list maps
  onto cleanly — one or two hero products per child collection
  with the rest filling in over time.

---

## Build order (priority)

**Phase 1 — fix what exists (Week 1).** Already on the audit
backlog: rename `Generators` → `Portable Generators`, hide
`master-collection`, move `Product Reviews` to a blog category,
unify title-tag templates.

**Phase 2 — promote existing brand-narrow collections to category
collections (Week 2).** Convert the two 3M collections and the
Howard Leight collection into brand filters on broader parents
(Respiratory Protection → N95 / Half-Mask; Hearing Protection →
Ear Plugs). Set up 301s from the old narrow URLs to the new
parents to retain link equity.

**Phase 3 — add the eight highest-demand new parents (Weeks 3–6),
in this order based on commercial-intent search volume in the
US safety/PPE niche:**

1. Respiratory Protection (N95 demand is steady year-round; this
   is also where the existing N95 buying guide can finally point
   at a real collection).
2. Hand Protection (work gloves, nitrile, cut-resistant — huge
   evergreen volume).
3. Detection & Alarms (smoke + CO detectors map directly to your
   two best-performing buying guides).
4. Hearing Protection.
5. Foot Protection.
6. Fall Protection.
7. First Aid & Medical.
8. Emergency Preparedness.

**Phase 4 — fill remaining parents (Weeks 7–12).** Welding,
LOTO, Chemical/Hazmat, Site & Traffic, Personal Safety, Body
Protection, Eye Protection (split out), Tools (restructure).

---

## Why this matters for the "100 products with ASINs" ask

Once this taxonomy is in place, the "top 100 most-searched
products you have collections for" becomes a tractable exercise:

- Each child collection has a clear keyword head term
  (e.g. "n95 respirator", "cut resistant gloves a4").
- Each one has 1–3 obvious hero products (best-sellers visible
  in Amazon's own category rankings).
- Search-volume data can then be pulled per head term in one
  Keyword Planner / Ahrefs session.
- ASINs are looked up once, from the actual Amazon listing,
  and stored in a single CSV.

The current 11-collection footprint can't support 100 products
without enormous keyword cannibalization. The expanded
taxonomy above can support 300+.
