import './style.css';
import { initialState, resolveTurn, serialize, deserialize } from './engine/sim';
import type { Order, Side, State } from './engine/types';
const KEY='fractured-frontier-prototype-v2';
let state:State=initialState();let playerSide:Side='AFG';let selected='A-INF';let destination='';let orders:Order[]=[];
const pickFirst=()=>state.units.find(u=>u.side===playerSide)?.id??'';
const app=document.querySelector<HTMLDivElement>('#app')!;
const safe=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function render(){
 const unit=state.units.find(u=>u.id===selected&&u.side===playerSide);
 const at=state.positions.find(p=>p.id===unit?.position);
 const reachable=at?.neighbors??[];
 app.innerHTML=`<header><div class="eyebrow">BETA 0.1 · ENGINE FOUNDATION / NOT FULL BETA</div><h1>THE FRACTURED FRONTIER</h1><p>Campaign #001 · Fictional test sector · Turn ${state.turn}</p></header>
 <main><section class="panel"><h2>Campaign faction</h2><label for="faction">Play as</label><select id="faction"><option value="AFG" ${playerSide==='AFG'?'selected':''}>Afghanistan</option><option value="PAK" ${playerSide==='PAK'?'selected':''}>Pakistan</option></select><p class="muted">Opponent: ${playerSide==='AFG'?'Pakistan':'Afghanistan'} (AI). Changing faction starts a new campaign.</p></section><section class="panel"><h2>Sector map</h2><p class="muted">Two tactical positions per fictional province. Tap a position to select a destination.</p><div class="map">${state.positions.map(p=>`<button class="node ${p.controller===playerSide?'afg':'pak'} ${p.id===destination?'chosen':''}" data-pos="${p.id}"><strong>${p.id}</strong><small>${safe(p.province)} · ${safe(p.label)}</small><small>${p.controller??'Neutral'} · ${state.units.filter(u=>u.position===p.id).length} units</small>${p.victoryFor?'<span class="objective">★ OBJECTIVE</span>':''}</button>`).join('')}</div></section>
 <section class="panel"><h2>Orders</h2><label for="unit">Friendly unit</label><select id="unit">${state.units.filter(u=>u.side===playerSide).map(u=>`<option value="${u.id}" ${u.id===selected?'selected':''}>${safe(u.label)} (${u.position})</option>`).join('')}</select>${unit?`<p class="stat">HP ${unit.hp} · Fuel ${unit.fuel}/${unit.maxFuel} · Ammo ${unit.ammo}/${unit.maxAmmo}</p><p class="muted">Reachable: ${reachable.join(', ')||'none'}</p>`:''}<p>Selected destination: <strong>${destination||'none'}</strong></p><div class="actions"><button id="queue" ${!unit||!reachable.includes(destination)?'disabled':''}>Queue move</button><button id="hold" ${!unit?'disabled':''}>Queue hold</button></div><h3>Queued orders</h3><ul>${orders.map(o=>`<li>${safe(o.unitId)}: ${o.kind}${o.kind==='move'?' → '+o.destination:''}</li>`).join('')||'<li>No orders queued</li>'}</ul><button class="primary" id="turn" ${state.winner?'disabled':''}>End Turn</button>${state.winner?`<p class="win">Winner: ${state.winner}</p>`:''}</section>
 <section class="panel"><h2>Campaign controls</h2><div class="actions"><button id="save">Save locally</button><button id="load">Load save</button><button id="reset">New campaign</button></div><p class="muted">Local saves remain on this device/browser only. The prototype has simplified combat and does not yet implement full logistics, production, or fog of war.</p><h2>Turn report</h2><ol class="log">${state.log.slice(-15).reverse().map(e=>`<li><small>T${e.turn}</small> ${safe(e.message)}</li>`).join('')}</ol></section></main>`;
 (app.querySelector('#faction') as HTMLSelectElement).onchange=e=>{if(confirm('Start a new campaign as the selected nation?')){playerSide=(e.target as HTMLSelectElement).value as Side;state=initialState();orders=[];selected=pickFirst();destination='';}render()};
 app.querySelectorAll<HTMLButtonElement>('[data-pos]').forEach(b=>b.onclick=()=>{destination=b.dataset.pos!;render()});
 (app.querySelector('#unit') as HTMLSelectElement).onchange=e=>{selected=(e.target as HTMLSelectElement).value;destination='';render()};
 (app.querySelector('#queue') as HTMLButtonElement).onclick=()=>{orders=orders.filter(o=>o.unitId!==selected);orders.push({kind:'move',unitId:selected,destination});render()};
 (app.querySelector('#hold') as HTMLButtonElement).onclick=()=>{orders=orders.filter(o=>o.unitId!==selected);orders.push({kind:'hold',unitId:selected});render()};
 (app.querySelector('#turn') as HTMLButtonElement).onclick=()=>{state=resolveTurn(state,orders,playerSide);orders=[];render()};
 (app.querySelector('#save') as HTMLButtonElement).onclick=()=>{localStorage.setItem(KEY,JSON.stringify({playerSide,state}));alert('Saved on this device.')};
 (app.querySelector('#load') as HTMLButtonElement).onclick=()=>{try{const v=localStorage.getItem(KEY);if(!v)throw new Error('No local save found');const saved=JSON.parse(v) as {playerSide:Side;state:State};if(saved.playerSide!=='AFG'&&saved.playerSide!=='PAK')throw new Error('Invalid saved faction');state=deserialize(JSON.stringify(saved.state));playerSide=saved.playerSide;orders=[];selected=pickFirst();render()}catch(e){alert(String(e))}};
 (app.querySelector('#reset') as HTMLButtonElement).onclick=()=>{if(confirm('Start a new campaign? Unsaved progress will be lost.')){state=initialState();orders=[];selected=pickFirst();destination='';render()}};
}
render();
