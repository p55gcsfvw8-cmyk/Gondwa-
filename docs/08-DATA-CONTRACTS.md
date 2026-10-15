# Proposed future data contracts

These are target contracts; the scaffold `src/engine/types.ts` is deliberately smaller.

```ts
type NationId = string;
type ProvinceId = string;
type PositionId = string;
type UnitId = string;
type EdgeId = string;
interface Position { id: PositionId; provinceId: ProvinceId; kind: string; controller: NationId | null; captureProgress: Record<NationId, number>; deploymentCapacity: number; holdingCapacity: number; infrastructureIds: string[]; }
interface Edge { id: EdgeId; from: PositionId; to: PositionId; movementCost: number; supplyCapacity: number; terrain: string; access: string; contested: boolean; }
interface Weapon { id: string; ammoType: string; range: number; shotsPerTurn: number; targetClasses: string[]; }
interface Unit { id: UnitId; nationId: NationId; positionId?: PositionId; transitEdgeId?: EdgeId; class: string; crew: number; hp: number; condition: number; morale: number; weapons: Weapon[]; dedicatedStorage: Record<string, number>; flexibleCapacitySU: number; inventory: Record<string, number>; taskForceId?: string; }
interface Shipment { id: string; sourceHolderId: string; destinationHolderId: string; cargo: Record<string, number>; routeEdgeIds: EdgeId[]; status: string; }
interface CampaignState { schemaVersion: number; turn: number; rngState: number; nations: unknown[]; provinces: unknown[]; positions: Position[]; edges: Edge[]; units: Unit[]; shipments: Shipment[]; events: unknown[]; }
```

## Serialization

No Map/Set/Date/class instances in authoritative save JSON; prefer arrays and primitive records. Version saves and provide migrations. Store turn input + seed in replay fixtures. Define stable sorting for all simultaneous events.

## Cargo accounting

Define item units separately from SU volume: `volumeSU = quantity * item.volumePerUnit`. No blanket assumption that one cannon round equals one SU. Weapons reference ammo families, and transfers validate compatibility and storage.
