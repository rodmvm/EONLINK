import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createContext, runInContext } from 'node:vm';

const source = await readFile(new URL('./redesign.js', import.meta.url), 'utf8');
const context = createContext({
  d: {default: {createElement() {}, createContext() {return {};}}},
  ef: [], Y: null, US() {}, qS() {}, kS() {}, nr() {}, BS() {},
});
runInContext(source, context);
const accounts = runInContext('EON_ACCOUNTS', context).map(account => ({...account}));
const records = [
  {name:'Pago de avance',account:'Cuenta operativa · 4821'},
  {name:'Servicio de luz',account:'Reserva para obras · 1936'},
  {name:'Gasolinera',account:'Tarjeta del negocio · 7780'},
];
const replaced = accounts.map(account => account.id==='operating'
  ? {...account,name:'Nueva operativa',last4:'9001',balance:1500}
  : account);
const mapped = context.eonFinancialRecords(records,replaced);
assert.equal(mapped[0].account,'Nueva operativa · 9001');
assert.equal(mapped[1].account,'Reserva para obras · 1936');
assert.equal(mapped[2].account,'Tarjeta del negocio · 7780');
assert.equal(records[0].account,'Cuenta operativa · 4821','Los registros originales no deben mutar.');
const replacedAgain = replaced.map(account => account.id==='operating'?{...account,name:'Segunda operativa',last4:'1234'}:account);
assert.equal(context.eonFinancialRecords(mapped,replacedAgain)[0].account,'Segunda operativa · 1234','La relación debe conservarse por ID después de reemplazar.');
assert.equal(replaced.slice(0,2).reduce((total,account)=>total+account.balance,0),187400);
assert.equal(context.eonFileKind('cotización.PDF'),'pdf');
assert.equal(context.eonFileKind('presupuesto.xlsx'),'excel');
assert.equal(context.eonFileKind('alcance.docx'),'word');
assert.equal(context.eonFileKind('foto','image/jpeg'),'image');
assert.equal(context.eonFileKind('Fotos del estado de la obra','Fotos'),'image');

let savedValue;
const storage=new Map();
context.localStorage={getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)};
context.d.useState=initialize=>[initialize(),value=>{savedValue=value;}];
context.d.useRef=value=>({current:value});
const [,setPhoto]=context.useEonStore('test-photos',{});
setPhoto(previous=>({...previous,obra:'data:image/jpeg;base64,example'}));
assert.equal(JSON.parse(storage.get('test-photos')).obra,'data:image/jpeg;base64,example');
assert.equal(context.useEonStore('test-photos',{})[0].obra,savedValue.obra);
context.localStorage.setItem=()=>{throw new Error('QuotaExceededError');};
const previous=savedValue;
assert.throws(()=>setPhoto({obra:'too-large'}),/QuotaExceededError/);
assert.equal(savedValue,previous,'Un fallo al guardar debe conservar el estado anterior.');
console.log('Verificado: reemplazos sucesivos, relaciones financieras, formatos y persistencia local.');
