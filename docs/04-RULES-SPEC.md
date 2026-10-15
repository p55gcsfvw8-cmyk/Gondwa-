# Provisional rules specification for Beta 0.1

Everything in this document is **provisional implementation design** unless explicitly confirmed in `02-DECISION-REGISTER.md`.

## Entity model

Nation, province, position, edge, unit, weapon, inventory holder, depot, production queue, task force, battle, contact and event. Every object has a stable unique ID. Units belong to one nation, one position or transit edge, and at most one task force. Position graph edges carry movement cost, terrain, access and supply throughput.

## Turn state machine

1. Snapshot legal player observations; collect player and AI orders independently.
2. Validate orders, reserve finite resources and reject impossible orders with explicit reasons.
3. Resolve movement on position graph, fuel payment, edge capacity and opposing encounters.
4. Resolve interdiction using detection, range and remaining firing budgets.
5. Resolve physical transfers and distribution from surviving eligible inventories.
6. Resolve persistent direct combat and ranged support; expend ammo/fuel and apply casualties, damage and morale.
7. Resolve capture progress, repairs, provisions and production.
8. Recalculate supply accessibility, isolation, province status and victory; emit report and save state.

**Atomicity:** transfers remove from source and add to recipient in the same committed operation. Never negative inventory; never more than destination capacity. Simultaneous claims on one stockpile resolve through a deterministic stable priority queue, not iteration accidents. A relay's received cargo cannot be forwarded in the same turn unless a later explicit phase is introduced.

## Movement

One shared movement budget for all position and province edges. Fuel cost paid before edge traversal. Long traversals can persist as in-transit state. Opposing simultaneous traversals on a narrow edge create an encounter rather than ghosting. Unreachable orders fail visibly. Task force members unable to comply remain at their last legal position; player receives partial-execution report.

## Combat

Default doctrine (provisional): eligible weapons auto-select targets by configured class priority, then threat, then deterministic ID tie-break. Detection and line of sight are prerequisites except permitted area bombardment. Every weapon has firing budget, ammunition type, range and eligible targets. Draft hit/damage model: seeded deterministic roll against accuracy adjusted for cover, readiness, morale and suppression; damage affects HP, possibly condition/crew. No exact combat constants locked. Persistent battles carry engagement state between turns. No free counterattacks beyond firing budget. Retreat requires accessible edge and valid capacity.

## Supply

Four broad classes: ammo, fuel, spares, provisions; ammo compatibility defined by weapon family. Unit dedicated storage and flexible cargo are separate. SU is abstract cargo volume; each item type defines volume-per-quantity. Depots have stock capacity **and** per-turn handling throughput. Trucks have real cargo and fuel. Same-position direct transfer is valid; specialist Forward Logistics Company may distribute across one accessible position edge, including a border edge. A company may be restricted by move/distribute tradeoff. Example delivery maximum `min(request,compatible_stock,free_capacity, floor(base_throughput * battlefield_modifier),edge_capacity)`; losses resolved explicitly. Contested supply modifier placeholder 0.5; threatened 0.75. Do not silently delete cargo to model delay. Fuel tankers require operational fuel reserve.

## Isolation and siege

Isolation is calculated from **accessible transport edges** to friendly supply sources, not province colour. No instant surrender. Inventory continues to deplete by actions. No ammo means weapon cannot fire; no fuel prevents relevant operations; no provisions gradually reduces readiness/morale; no spares limits repair. No fixed siege timer.

## Occupation

Position-level capture progress 0–100; infantry full capture, armour/recon limited, logistics/artillery none. Active contest stops progress. Administrative point determines provisional province administration; securing required points and removing active contests yields secured status. Sovereignty never silently changes when military control changes. Capturing victory points at end of turn drives conquest victory.

## Unit and inventory invariants

- Unit IDs globally unique, owner valid, location valid.
- Nonnegative HP, morale, condition, crew, ammo, fuel, spare parts and provisions.
- `0 <= inventory <= storage` for each compatible compartment.
- Destroyed unit never fires, moves, captures or receives ordinary repairs.
- All cargo has exactly one owner at a time; transfers conserve quantity except logged consumption/loss.
- No enemy intelligence beyond detected and last-known contacts.
- Seeded replay of same input/state yields same events and output.

## Minimum beta unit roster (not balanced)

Infantry squad (9-person nominal), MBT (one vehicle, model-dependent crew), recon vehicle, artillery gun, cargo truck, forward logistics vehicle, maintenance vehicle. One unit = one physical asset or squad. Weapons and ammo types are data-driven. First tests should use invented numbers rather than asserting real equipment performance.
