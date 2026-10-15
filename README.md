# THE FRACTURED FRONTIER

**Beta 0.1 pre-production package + runnable TypeScript foundation**  
Campaign #001: Afghanistan vs Pakistan · fictional alternate-history 2034 · single-player · mobile-first browser.

## Quick start

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the URL shown by Vite. `npm run build` checks TypeScript and builds the app; `npm test` runs deterministic simulation tests.

## What runs today

The browser starter includes **player faction selection (Afghanistan or Pakistan, with the other side AI-controlled)** and a **small playable prototype**, not the promised full beta: six **fictional test provinces**, position-based orders, unit inventories, fuel expenditure, simple combat, basic capture, a deterministic AI, turn reports, and local save/load. These are intentionally minimal test implementations. They are **not** complete versions of the Game Design Bible's logistics, siege, combat, fog of war, economy, or AI systems.

## Where to start

- `docs/00-SCOPE-LOCK.md`: what Beta 0.1 means.
- `docs/01-DESIGN-BIBLE.md`: consolidated Foundations #001–#011.
- `docs/02-DECISION-REGISTER.md`: approved vs provisional decisions.
- `docs/03-DEPENDENCIES.md`: system dependency graph and resolution order.
- `docs/04-RULES-SPEC.md`: implementable provisional rules and invariants.
- `docs/05-AI-AND-ECONOMY.md`: opponent and production plans.
- `docs/06-TEST-PLAN.md`: stress and acceptance tests.
- `docs/07-ROADMAP.md`: staged delivery.
- `docs/08-DATA-CONTRACTS.md`: proposed future data schemas.
- `docs/09-OPEN-QUESTIONS.md`: assumptions and remaining user questions.

## Engineering principles

Simulation logic belongs in `src/engine/` and has no browser dependencies. UI code is in `src/`. All randomness is deterministic, seeded, and serialisable. State transitions return new state. Unit inventory is owned by units, never by UI aggregate counters. Save format has a version. The starter uses no remote APIs or multiplayer backend.

## Important disclaimer

The campaign and geography are fictionalised for testing. The starter's six provinces and combat values are **invented fixtures**, not authoritative geography, equipment performance, military capabilities or force deployment data. Do not infer real-world military facts from them.

## Verification note

This ZIP was structurally checked and generated successfully. The execution environment could not complete `npm install` (registry access timed out), so the Vite build and test suite could not be run here. Install dependencies and run `npm run build && npm test` locally before treating the scaffold as verified.

## GitHub upload instructions

This repository ZIP is **root-flat**: files such as `package.json`, `README.md`, and `src/` sit at the ZIP root. To upload to an existing GitHub repository, extract the ZIP locally, then upload **the extracted files and folders** to the repository root (GitHub's web upload does not automatically unpack ZIP archives). Alternatively clone the repo, copy these files into it, commit, and push. Do not upload the ZIP as a single file expecting GitHub to execute it.

The **Master Bible** is shipped separately as a reference archive and is not required to run the application.
