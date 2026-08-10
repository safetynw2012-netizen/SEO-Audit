# Prospecting — how to find and qualify targets

This file deliberately contains **no pre-filled prospect URLs**. The
audit environment could not reach the live web (§0), and a list of
plausible-looking .gov URLs that nobody verified is worse than no list:
it wastes sends and it puts fabricated facts into the pipeline. What
follows is the repeatable method. Run it, verify each hit in a browser,
then write real rows into `prospects.csv`.

## 1. Resource-page operators (tactic T2)

Run each against the asset it fits. Swap the bracketed topic for the
asset being pitched.

**Emergency management / preparedness** (for the 72-hour kit checklist):

```
site:.gov ("emergency preparedness" OR "disaster preparedness") ("resources" OR "helpful links")
site:.gov "emergency management" "72-hour kit"
site:.gov ("be prepared" OR "preparedness") intitle:resources
"emergency preparedness" "resource list" site:.us
("CERT" OR "community emergency response team") "resources" -site:fema.gov
```

**University / hospital EHS** (for the respirator standards table):

```
site:.edu ("environmental health and safety" OR "EHS") "respiratory protection" resources
site:.edu "respirator" ("fit test" OR "fit testing") "links"
site:.edu "laboratory safety" intitle:resources respirator
```

**Fire service and public education** (for the CO placement diagram):

```
site:.gov ("fire department" OR "fire district") "carbon monoxide" ("resources" OR "safety tips")
"fire prevention" "smoke alarm" "useful links" site:.gov
site:.org "carbon monoxide" "public education" resources
```

**Occupational safety / trades** (for the hard hat chart):

```
site:.org ("safety committee" OR "safety training") "personal protective equipment" resources
"OSHA" "training resources" "head protection" -site:osha.gov
```

Also worth running: `inurl:links`, `inurl:resources`, `inurl:helpful`,
`intitle:"safety resources"` combined with each topic.

## 2. Unlinked-mention operators (tactic T4)

```
"WC Safety" -site:wcsafety.com
"wcsafety.com" -site:wcsafety.com
"WC Safety" ("reviewed" OR "according to" OR "guide")
```

Set a Google Alert on both `"WC Safety"` and `"wcsafety.com"` so new
mentions surface without re-running this manually. Check the Ahrefs or
Semrush "mentions" report once the subscription from audit §9.10 exists.

## 3. Broken-link operators (tactic T3)

Two approaches, run both:

1. **Find the resource pages first** (operators in §1), then run each
   through a link checker and look for 404s pointing at safety content.
2. **Start from known-dead reference URLs.** CDC/NIOSH reorganised
   heavily post-2020 and many pandemic-era KN95 and respirator-guidance
   pages moved or were retired. Search for pages still citing the old
   paths, verify the target is genuinely dead, then offer the
   replacement asset:

```
"cdc.gov/niosh" "kn95" -site:cdc.gov
"3m.com" "technical bulletin" respirator -site:3m.com
```

Verify each candidate 404 yourself before pitching it. Telling an editor
their link is broken when it is not is a one-shot reputation cost.

## 4. Qualification rubric

Score each candidate before it enters `prospects.csv`. **Only rows
scoring 4+ get contacted.** Anything below is noise that costs a send
and a reputation increment.

| Criterion                                                         | Points |
| ----------------------------------------------------------------- | -----: |
| Page is topically about safety/PPE/preparedness, not a generic list |     +2 |
| Page has outbound links to non-government commercial-adjacent sites |     +1 |
| Site is .gov / .edu / established .org                             |     +1 |
| Page updated within ~24 months (check visible dates or archive)     |     +1 |
| A named, reachable page owner or webmaster exists                   |     +1 |
| We have an asset that genuinely belongs on that page               |     +2 |
| Page shows "submit a link" / "suggest a resource" affordance        |     +1 |
| — Page is a paid-placement or "sponsored listing" page             |  **disqualify** |
| — Page links only to .gov, by evident policy                       |  **disqualify** |
| — Site sells competing PPE                                        |     −2 |
| — Page is an auto-generated link dump                             |  **disqualify** |

The "we have an asset that genuinely belongs on that page" criterion is
the one that actually predicts a yes. If the honest answer is no, the
prospect is not a prospect.

## 5. Pipeline hygiene

- One row per prospect page, not per domain.
- Never contact two pages on the same domain in the same month.
- Two follow-ups maximum, then `status: closed-no-reply`. There is no
  third follow-up; there is only annoying someone.
- Record declines with the reason — the reasons cluster, and the
  clusters are how the pitch gets fixed.
