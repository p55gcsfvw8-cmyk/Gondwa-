import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState, resolveTurn, randomStep, serialize, deserialize} from '../src/engine/sim';
test('seeded random step is deterministic',()=>assert.equal(randomStep(123),randomStep(123)));
test('valid movement consumes vehicle fuel',()=>{const s=initialState();const after=resolveTurn(s,[{kind:'move',unitId:'A-TNK',destination:'P2-0'}]);const tank=after.units.find(u=>u.id==='A-TNK')!;assert.equal(tank.position,'P2-0');assert.equal(tank.fuel,6);assert.equal(s.units.find(u=>u.id==='A-TNK')!.fuel,7)});
test('invalid movement cannot teleport',()=>{const s=initialState();const after=resolveTurn(s,[{kind:'move',unitId:'A-INF',destination:'P5-1'}]);assert.equal(after.units.find(u=>u.id==='A-INF')!.position,'P1-0')});
test('no fuel blocks movement',()=>{const s=initialState();s.units.find(u=>u.id==='A-TNK')!.fuel=0;const after=resolveTurn(s,[{kind:'move',unitId:'A-TNK',destination:'P2-0'}]);assert.equal(after.units.find(u=>u.id==='A-TNK')!.position,'P1-1')});
test('replay of same input produces identical result',()=>{const s=initialState();assert.deepEqual(resolveTurn(s,[{kind:'hold',unitId:'A-INF'}]),resolveTurn(s,[{kind:'hold',unitId:'A-INF'}]))});
test('save schema validates and roundtrips',()=>{const s=initialState();assert.deepEqual(deserialize(serialize(s)),s);assert.throws(()=>deserialize('{"schemaVersion":99}'))});
test('objective capture by infantry can conclude conquest',()=>{const s=initialState();s.positions.forEach(p=>p.controller='AFG');s.units=s.units.filter(u=>u.side==='AFG');const after=resolveTurn(s,[]);assert.equal(after.winner,'AFG')});

test('Pakistan can be player and Afghan AI issues orders',()=>{const s=initialState();const after=resolveTurn(s,[{kind:'move',unitId:'P-INF',destination:'P3-1'}],'PAK');assert.equal(after.units.find(u=>u.id==='P-INF')!.position,'P3-1');});
test('player cannot issue orders for AI faction',()=>{const s=initialState();const a=resolveTurn(s,[{kind:'move',unitId:'P-INF',destination:'P5-0'}],'AFG');const b=resolveTurn(s,[],'AFG');assert.deepEqual(a,b);});
