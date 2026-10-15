# Beta 0.1 scope lock

**Status:** Proposed scope lock, October 2026. Approved by user: prepare Option B pre-production package + runnable TypeScript foundation and pre-decide missing details. These are provisional product defaults, not individually approved mechanics.

## Product promise

A single-player, turn-based, mobile-browser military strategy game where individual vehicles and infantry squads operate within task forces across provinces and discrete tactical positions. Combat persists across turns, and supplies physically move through vulnerable logistics networks.

## Beta 0.1 minimum complete loop

1. **Choose Afghanistan or Pakistan as the player faction** (user-confirmed); the other faction is controlled by AI. Start in a bounded fictionalised Afghanistan–Pakistan campaign sector.
2. Observe friendly positions and detected enemy contacts.
3. Order movement, defence, attacks, resupply and production.
4. Resolve one campaign day using simultaneous submitted orders.
5. See combat, supply, capture and production reports; inspect causes of failures.
6. Save, reload and continue.
7. Win or lose by conquest.

## Provisional conquest victory

Victory requires control of **all designated enemy victory objectives**, plus no enemy formation actively contesting those objectives at the end of a turn. Defeat mirrors this for the player's objectives. Other provinces may remain neutral/contested; no tedious mop-up requirement. A campaign victory screen identifies objective ownership and contested status. Simultaneous conquest: if both sides satisfy victory at once, **draw**. No arbitrary day cap in the normal campaign; optional 30-turn scenario cap for automated testing, scored by objectives then surviving combat power, then draw.

## Ship in Beta 0.1

- One campaign sector, 6–12 curated provinces, 2–5 discrete positions each, explicit province links.
- Individual infantry squads, MBTs, artillery pieces, recon vehicles, trucks, forward logistics companies and maintenance vehicles.
- Task forces, collective orders, orders with explicit validation and failure reports.
- Movement, fuel, position capacity, terrain, encounter handling, retreat.
- Automatic combat with configurable target priorities (provisional B from previously open #012).
- Basic line of sight/recon, fog of war and last-known contacts.
- Inventory with ammunition families, fuel, spare parts, provisions; physical depots and transport.
- Same-position direct transfer; forward-logistics distribution across one eligible connection; contested distribution and interdiction.
- Persistent engagements, siege isolation and morale; basic field repairs.
- One resource-producing depot/industry model, queues for recruitment/replacement, finite manpower.
- Basic opponent AI operating from legal observations.
- Save/load, mobile-first map/panels, concise end-turn report, onboarding and automated tests.

## Deliberately defer

Multiplayer, naval warfare, operational air warfare, diplomacy, civilians/rebellion, complex doctrine trees, extensive equipment catalogs, detailed weather, individual soldier identities, 3D battles, and national-scale force counts. The engine should permit later expansion without pretending these features exist in 0.1.

## Internal vertical slice (smaller than Beta 0.1)

6 fictional test provinces, 2 positions each, ~12 or fewer units per side, basic combat/capture and fuel. **The bundled starter is earlier than this vertical-slice acceptance target:** it proves project boot, UI, state transition, simple AI, save and tests only.

## Definition of done

All checks in `06-TEST-PLAN.md` pass; a human can finish a campaign on a phone; no negative inventory, duplicate cargo or turn deadlocks; AI can win and lose; save/reload deterministic; no critical console errors. Do not label the current scaffold Beta 0.1 complete.
