import { readFile, writeFile } from 'node:fs/promises';
import { Script } from 'node:vm';

const original = await readFile(new URL('./index.original.html', import.meta.url), 'utf8');
const extension = await readFile(new URL('./redesign.js', import.meta.url), 'utf8');
const stylesheet = await readFile(new URL('./redesign.css', import.meta.url), 'utf8');
const marker = '(0,Rg.createRoot)(document.getElementById("root")).render(Xg.default.createElement(mr,null));';
if (original.split(marker).length !== 2) throw new Error('No se encontró un único punto de entrada de EONLINK.');
const html = original.replace(marker, `${extension}\n(0,Rg.createRoot)(document.getElementById("root")).render(d.default.createElement(EonProvider,null,d.default.createElement(mr,null)));`)
  .replace('[s,r]=(0,d.useState)("organize"),[m,v]=(0,d.useState)("overview")', '[s,r]=Gu("eonlink-active-area","organize"),[m,v]=Gu("eonlink-active-view","overview")')
  .replace('className:"app-shell","data-mode":s', 'className:"app-shell","data-mode":s,"data-view":m')
  .replace('</head>', `<style id="eonlink-redesign">${stylesheet}</style></head>`);
for (const match of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) new Script(match[1]);
await writeFile(new URL('./index.html', import.meta.url), html);
console.log('EONLINK actualizado. JavaScript validado.');
