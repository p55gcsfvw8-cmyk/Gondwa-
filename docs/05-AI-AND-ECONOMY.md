# AI and economy design

## AI objective planner (provisional)

AI acts from a **nation-specific observation view**. Prioritise: defend threatened victory objectives; replenish critically undersupplied units; seize accessible control points; disrupt vulnerable supply lines; produce missing unit roles; regroup when overmatched. Assign one objective per task force, use deterministic weighted scoring with seed for ties, validate orders through same engine as player. No hidden omniscient lookups. Include fallback `hold` if no legal order.

### AI decision tests

AI must complete 100 consecutive turns without deadlock; avoid unreachable objectives; withdraw or resupply zero-fuel formations; recognise end conditions; avoid empty-depot infinite truck loops; not select undetected enemy units as targets.

## Simplified economy (provisional)

Two tracked pools: national manpower and industrial production points. Existing infrastructure generates supply inventories and production points each turn; factories/depot nodes have finite stock capacity and throughput. Recruitment queues consume manpower + production points; equipment production consumes production points and specified supply inputs; no free spawning. Completed units deploy only at friendly eligible positions with holding capacity. Unit replacements restore personnel up to cap but do not automatically restore morale. Supply generation is a declared, logged world event (resource source), not a convoy teleport.

### Initial balance fixtures (not final)

Each side starts with one supply-producing depot, one reinforcement node, two infantry squads, one tank, one artillery piece, one recon vehicle, one logistics vehicle and one truck in a small sector. More units can be added for stress tests. Production: one queue per facility; jobs require turns and explicit resource costs. These figures are only fixtures to exercise the code.

## Economy failure modes

Production queue completion at captured facility, manpower below zero, units spawning in full positions, depot producing above capacity, dual production claims on same stockpile, AI starving its garrison of provisions. Each requires deterministic tests.
