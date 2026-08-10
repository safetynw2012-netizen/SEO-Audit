# Link building — wcsafety.com

**Status:** ACTIVE (activated 2026-08-10)
**Companion to:** `audits/wcsafety-com-2026-05-15.md`, `fixes/wcsafety-com/`

This directory is the working state for the wcsafety.com link-building
workstream. It is designed so that any session — human or Claude — can
pick it up cold, read `log.md` to see where things stand, and continue
without re-deriving strategy.

## Files

| File                    | What it is                                                                 |
| ----------------------- | -------------------------------------------------------------------------- |
| `playbook.md`           | Strategy, rules of engagement, and the eight tactics ranked for this site  |
| `prospecting.md`        | How to *find* prospects: search-operator library + qualification rubric     |
| `outreach-templates.md` | Email templates, one per tactic, with the variables to fill                |
| `prospects.csv`         | The pipeline. One row per prospect, one status column, append-only in spirit |
| `log.md`                | Running journal: what was sent, what landed, what was learned              |

## How to run a session

1. Read `log.md` (bottom entry) for current state.
2. If Gate 0 (below) is not cleared, work on Gate 0 — not on outreach.
3. Otherwise: prospect (`prospecting.md`) → qualify → add rows to
   `prospects.csv` → draft from `outreach-templates.md` → send →
   record in `log.md`.
4. Update `prospects.csv` statuses for anything that moved.

## Gate 0 — do not start outreach until these are true

Outreach from a site with no About page, no named author, and no
disclosure gets ignored by exactly the .gov/.edu/.org editors this
plan targets. It also wastes the prospect — a burned resource-page
editor rarely gives a second look. The audit already found all of
these missing (§5.1, §5.2, §5.3); drafts exist in `fixes/wcsafety-com/`.

- [ ] `/pages/about` published, with a real named operator
- [ ] `/pages/contact` published, with a working email and mailing address
- [ ] `/pages/editorial-methodology` published
- [ ] `/pages/affiliate-disclosure` published and linked in the global footer
- [ ] Every `/blogs/guides/*` post carries a named author with a bio
- [ ] Top-of-page affiliate disclosure live on every guide
- [ ] All `[BRACKETED]` placeholders in `fixes/wcsafety-com/pages/*.md`
      replaced with real facts before publishing

Gate 0 is not link building, but it is the precondition for every
tactic in `playbook.md` that has a positive expected value.
