import type { Order, Position, Side, State, Unit } from './types';

const other = (side: Side): Side => side === 'AFG' ? 'PAK' : 'AFG';
export function randomStep(seed: number): number { return (Math.imul(seed, 1664525) + 1013904223) >>> 0; }
export function initialState(): State {
  // Fictional test geography: names are invented, not real province boundaries.
  const positions: Position[] = [];
  for (let i=0;i<6;i++) for (let j=0;j<2;j++) {
    const id=`P${i}-${j}`; const neighbors=[`P${i}-${1-j}`];
    if(j===1 && i<5) neighbors.push(`P${i+1}-0`);
    if(j===0 && i>0) neighbors.push(`P${i-1}-1`);
    positions.push({id,province:`Sector ${i+1}`,label:j===0?'Settlement':'Pass',neighbors,controller:i<3?'AFG':'PAK',victoryFor:(i===0&&j===0)?'AFG':(i===5&&j===1)?'PAK':undefined});
  }
  const units: Unit[]=[
    {id:'A-INF',side:'AFG',label:'Afghan Infantry',kind:'infantry',position:'P1-0',hp:10,fuel:0,ammo:8,maxFuel:0,maxAmmo:8,attack:3,capture:1},
    {id:'A-TNK',side:'AFG',label:'Afghan Tank',kind:'tank',position:'P1-1',hp:12,fuel:7,ammo:6,maxFuel:7,maxAmmo:6,attack:5,capture:0},
    {id:'A-TRK',side:'AFG',label:'Afghan Supply Truck',kind:'truck',position:'P0-1',hp:5,fuel:8,ammo:0,maxFuel:8,maxAmmo:0,attack:0,capture:0},
    {id:'P-INF',side:'PAK',label:'Pakistani Infantry',kind:'infantry',position:'P4-1',hp:10,fuel:0,ammo:8,maxFuel:0,maxAmmo:8,attack:3,capture:1},
    {id:'P-TNK',side:'PAK',label:'Pakistani Tank',kind:'tank',position:'P4-0',hp:12,fuel:7,ammo:6,maxFuel:7,maxAmmo:6,attack:5,capture:0},
  ];
  return {schemaVersion:1,turn:1,rng:123456789,positions,units,log:[{turn:1,message:'Prototype ready. Select an Afghan unit and an adjacent position, then End Turn.'}],winner:null};
}
export function aiOrders(state: State, aiSide: Side = 'PAK'): Order[] {
  // Tiny deterministic baseline AI; NOT the planned fog-respecting operational AI.
  return state.units.filter(u=>u.side===aiSide).map(u=>{
    const here=state.positions.find(p=>p.id===u.position)!;
    const candidates=here.neighbors.map(n=>state.positions.find(p=>p.id===n)!).filter(Boolean);
    const target=candidates.find(p=>p.controller===other(aiSide)) ?? candidates.find(p=>aiSide==='PAK'?p.id < here.id:p.id > here.id);
    return target ? {kind:'move' as const,unitId:u.id,destination:target.id}:{kind:'hold' as const,unitId:u.id};
  });
}
export function resolveTurn(before: State, orders: Order[], playerSide: Side = 'AFG'): State {
  if(before.winner) return before;
  const s: State=structuredClone(before);
  const report=(message:string)=>s.log.push({turn:s.turn,message});
  const all=[...orders.filter(o=>before.units.some(u=>u.id===o.unitId&&u.side===playerSide)),...aiOrders(before,other(playerSide))];
  const used=new Set<string>();
  for(const order of all.sort((a,b)=>a.unitId.localeCompare(b.unitId))) {
    if(used.has(order.unitId)) continue;
    used.add(order.unitId);
    const u=s.units.find(x=>x.id===order.unitId && x.hp>0);
    if(!u) {report(`Invalid order for ${order.unitId}: unit unavailable`);continue;}
    if(order.kind==='hold') continue;
    const from=s.positions.find(p=>p.id===u.position);
    if(!from?.neighbors.includes(order.destination)) {report(`${u.label}: destination is not adjacent`);continue;}
    if(u.maxFuel>0 && u.fuel<1) {report(`${u.label}: insufficient fuel`);continue;}
    if(u.maxFuel>0) u.fuel-=1;
    u.position=order.destination;
    report(`${u.label} moved to ${order.destination}`);
  }
  for(const p of s.positions) {
    const present=s.units.filter(u=>u.hp>0&&u.position===p.id);
    const a=present.filter(u=>u.side==='AFG'), b=present.filter(u=>u.side==='PAK');
    if(a.length&&b.length) {
      // Deliberately simplistic simultaneous one-round combat; not the final weapon model.
      const damage=(attackers:Unit[],targets:Unit[])=>{
        for(const u of attackers) if(u.ammo>0&&u.attack>0&&targets.length) {
          u.ammo-=1;s.rng=randomStep(s.rng);
          const target=targets[s.rng%targets.length];
          target.hp=Math.max(0,target.hp-(1+s.rng%Math.max(1,u.attack)));
          report(`${u.label} engaged ${target.label} at ${p.id}`);
        }
      };
      damage(a,b);damage(b,a);
    }
    const survivors=s.units.filter(u=>u.hp>0&&u.position===p.id);
    const sides=new Set(survivors.map(u=>u.side));
    if(sides.size===1 && survivors.some(u=>u.capture>0)) {
      const owner=survivors[0].side;
      if(p.controller!==owner){p.controller=owner;report(`${owner} secured ${p.id}`);}
    }
  }
  s.units=s.units.filter(u=>u.hp>0);
  const objectives=s.positions.filter(p=>p.victoryFor);
  const afgWins=objectives.every(p=>p.controller===other(aiSide)&&!s.units.some(u=>u.side==='PAK'&&u.position===p.id));
  const pakWins=objectives.every(p=>p.controller==='PAK'&&!s.units.some(u=>u.side==='AFG'&&u.position===p.id));
  s.winner=afgWins&&pakWins?'DRAW':afgWins?'AFG':pakWins?'PAK':null;
  if(s.winner) report(`Campaign concluded: ${s.winner}`);
  s.turn+=1;
  return s;
}
export function serialize(state:State):string {return JSON.stringify(state);}
export function deserialize(raw:string):State {
  const value:unknown=JSON.parse(raw);
  if(!value||typeof value!=='object'||!('schemaVersion' in value)||(value as {schemaVersion:unknown}).schemaVersion!==1) throw new Error('Unsupported save schema');
  const s=value as State;
  if(!Array.isArray(s.positions)||!Array.isArray(s.units)||!Array.isArray(s.log)||typeof s.turn!=='number'||typeof s.rng!=='number')throw new Error('Invalid save');
  return s;
}
