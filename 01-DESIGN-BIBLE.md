# Consolidated Game Design Bible — Foundations #001–#011

This file preserves the **mechanical decisions** established in design discussions; it is not a verbatim transcript. See `02-DECISION-REGISTER.md` for status and `04-RULES-SPEC.md` for proposed implementation defaults.

## #001 Campaign and product

Single-player versus AI; modular campaign architecture. Campaign #001 Afghanistan vs Pakistan, alternate-history 2034. Real-world-inspired province geography for final content, fictional lore and no claim of real military accuracy. Province-based conquest and no manually controlled tactical battle.

## #002 Combat persistence

Automatic battles can last several campaign turns. Armies reinforce, retreat, run short of ammunition, become isolated or surrender. HP, mechanical condition, morale, recon, weapon ranges and supplies are distinct variables. Combat visuals represent resolved events, not their causes.

## #003 Artillery

Artillery can fire independently at eligible positions or support friendly combat. All missions consume a shared finite firing budget and ammunition; counterbattery and interdiction are possible.

## #004 Sustainment

Finite ammunition, fuel, spare parts and provisions; movement/engagement uses supplies. Fuel exhaustion prevents fuel-dependent actions; ammo exhaustion disables eligible firing, not unit life. Crew servicing, field repair and depot overhaul conceptually distinct; never resurrect destroyed equipment.

## #005 Physical logistics

Inventory belongs to real depots, vehicles and units. Convoys have routes, movement time, fuel, capacity, exposure and escorts. Scheduled/stock-target/emergency automation is allowed but never creates phantom resources. Prototype SU is abstract cargo volume. Earlier truck/depot capacity numbers are illustrative only.

## #006 Distribution

**User-confirmed B:** same-position/same-province direct supply plus **adjacent distribution by specialised logistics units**. The later tactical-position model refines this: distribution traverses one valid position connection, possibly crossing a provincial border; it cannot teleport across arbitrary province interiors. Forward Logistics Company example: 80 SU inventory, 30 SU per turn throughput (unapproved placeholder). Movement may reduce throughput.

## #007 Combat resupply

**User-confirmed B:** contested frontline resupply is possible with throughput reduction and possible interdiction. Isolation removes access, not stored inventories. Sieges can persist; no automatic surrender timer. Interdiction is an explicit eligible action drawing on firing budget. Threatened 75%, contested 50% are unapproved examples.

## #008 Configurable operational loadouts

**User-confirmed B:** units have fixed dedicated equipment storage and limited flexible compatible cargo. Ammo is weapon-specific; movement consumes fuel; provisions and spares affect endurance and repair. Unit ownership persists inside task-force aggregates. Presets are targets, not free items. Example MBT 30 rounds/40 fuel/10 SU flexible is not a real equipment spec.

## #009 Individual vehicles and squads

**User-confirmed A:** one tank counter = one tank; one infantry counter = one squad. Aircraft and guns would also be individual assets if/when implemented. Task forces aggregate orders, not health/inventory. Manpower and crew counts matter; disabled, abandoned, destroyed and captured are distinct. Avoid literal national-scale force counts in beta.

## #010 Strategic control-point occupation

**User-confirmed B:** provinces contain control points such as administrative centres, settlements, passes, road junctions and depots. Sovereignty, military control and foreign occupation are distinct. Infantry captures effectively; vehicles have limited capture ability; artillery and trucks cannot capture. Capture progress 0–100 is provisional. Administrative centre confers provisional provincial administration; fully secured requires other required objectives and no contest.

## #011 Discrete tactical positions

**User-confirmed B:** provinces have a small graph of strategic and supporting positions. Units occupy discrete positions and traverse explicit edges, sharing movement budgets with province crossings. Position capacities, terrain, ranged eligibility, encounters, position-level supply and encirclement follow from this. No free movement inside a province and no separate realtime tactical engine. Supporting positions such as ridgelines may influence combat without capturing territory.

## #012 Combat targeting (not user-confirmed)

For beta planning, **provisional choice B: target priorities and engagement doctrine**, automatic eligible target selection. This remains overridable in the decision register.

## Core design tension

Squad-scale assets over national-scale provinces require aggressive aggregation of commands and a bounded playable sector. Detail belongs in deterministic simulation, not constant player micromanagement.
