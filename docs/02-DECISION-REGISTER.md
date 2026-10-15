# Decision register

Legend: **C** = explicitly confirmed by user; **P** = assistant provisional default pending feedback; **D** = deferred; **I** = prototype implementation convenience, not design approval.

| ID | Status | Decision | Notes |
|---|---|---|---|
| D001 | C | Single-player regional campaign against AI | No multiplayer backend |
| D002 | C | Campaign #001 Afghanistan vs Pakistan, fictional 2034 | Fictional conflict framing |
| D003 | C | Province-based map, automatic persistent battles | No tactical action controls |
| D004 | C | Artillery independent bombardment or support | Shared firing budget |
| D005 | C | Physical finite logistics with automation | No magical supply radius |
| D006 | C | Same-province plus adjacent specialised distribution | Refined through position links |
| D007 | C | Contested resupply under fire | Risk and throughput |
| D008 | C | Configurable operational loadouts | Dedicated + flexible storage |
| D009 | C | Individual vehicles and infantry squads | Task forces aggregate orders |
| D010 | C | Strategic control-point occupation | Not instant province flipping |
| D011 | C | Discrete intra-province tactical positions | Not free movement map |
| D012 | P | Combat targeting: priority doctrine (option B) | Last open selection; chosen for beta |
| D013 | P | Victory: conquest of all enemy victory objectives, uncontested at end of turn | No total-map mop-up |
| D014 | P | One turn = one campaign day | Shared phase resolution |
| D015 | P | 6–12 province bounded beta campaign sector | Scale control |
| D016 | P | Economy: finite manpower, four supply classes, simplified production queues | Source for replenishment |
| D017 | P | Fog of war: observed/last-known/unknown | No AI omniscience |
| D018 | P | Save locally with schema version and deterministic seed | Browser-first |
| D019 | P | Same-position transfers before combat, interdiction before arrival transfers | Deterministic timing |
| D020 | P | Capture progress belongs to side and position, not specific unit | 0–100 balancing placeholder |
| D021 | P | Target priorities: armour, infantry, support, closest | Automatic legal target selection |
| D022 | P | No normal-campaign turn limit; simultaneous victory = draw | Test scenarios may have caps |
| D023 | P | 1 connection maximum per distribution action per turn | Prevent instant relay teleportation |
| D024 | D | Naval, large-scale air, diplomacy, multiplayer, complex politics | Beyond 0.1 |
| D025 | I | Starter has two positions per fictional province and simplified turn logic | NOT complete beta rules |

| D026 | C | Player may choose Afghanistan or Pakistan; opposing faction controlled by AI | Confirmed October 2026 |
| D027 | I | Prototype faction selection resets the scenario and local save stores the faction | Starter implementation |

**Rule:** Only C decisions are user-approved. Any P value may be changed without rewriting history. Every changed rule needs a decision-log entry and tests.
