export type Side = 'AFG' | 'PAK';
export type Order = { kind: 'move'; unitId: string; destination: string } | { kind: 'hold'; unitId: string };
export type Position = { id: string; province: string; label: string; neighbors: string[]; controller: Side | null; victoryFor?: Side };
export type Unit = { id: string; side: Side; label: string; kind: 'infantry' | 'tank' | 'truck'; position: string; hp: number; fuel: number; ammo: number; maxFuel: number; maxAmmo: number; attack: number; capture: number };
export type Event = { turn: number; message: string };
export type State = { schemaVersion: 1; turn: number; rng: number; positions: Position[]; units: Unit[]; log: Event[]; winner: Side | 'DRAW' | null };
