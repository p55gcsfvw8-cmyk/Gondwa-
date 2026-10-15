# Beta 0.1 test and stress plan

## Automated invariant tests (must pass)

1. Two simultaneous cargo loads cannot duplicate stock.
2. Destroyed cargo never arrives.
3. Opposing units on one narrow edge create an encounter.
4. Units with insufficient fuel do not complete fuel-dependent movement.
5. Artillery cannot exceed its shared firing budget.
6. Multi-hop supply relays cannot forward newly arrived cargo in the same phase.
7. Retreat cannot overfill a destination.
8. Changing a loadout preset does not create supplies.
9. Captured depots never have two simultaneous inventory owners.
10. Ammo exhaustion prevents relevant weapon firing.
11. Combat/capture state survives save and reload.
12. AI has bounded retries and always produces legal/fallback orders.
13. Same initial state + seed + orders yields identical state and event log.
14. No negative inventory, duplicate IDs or invalid graph references after 1,000 simulated turns.
15. Unobserved enemy locations cannot leak into AI decisions or player UI.

## Full campaign acceptance

- Win, lose and draw states reachable and correctly reported.
- Human can finish a campaign on narrow mobile screen.
- Every failed order provides an understandable reason.
- A full 30-turn automated stress scenario completes without crash or deadlock.
- At least 100 seeded AI-vs-AI games complete without state invariant violation.
- Campaign save reload reproduces identical next-turn result.
- Combat and logistics reports reconcile resource consumption.
- Offline/local save persists across refresh (subject to browser storage policy).
- No major performance regressions at beta target unit and province count.

## Starter scaffold tests

`npm test` currently checks deterministic seed, legal movement/fuel, capture/victory and save schema. These are smoke tests only; they do not satisfy the full acceptance list.

## Manual mobile checks

Portrait/landscape on narrow phone, touch target size, scroll and map readability, long unit names, save recovery, tab backgrounding, visible enemy contacts, clear end-turn summaries and no reliance on hover.
