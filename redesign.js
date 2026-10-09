/* Editable design layer. The original quote, expense and permission flows remain in the bundle. */
const ehx = d.default.createElement;
const EonContext = d.default.createContext(null);
const EonExampleFiles = ef;
const EON_ACCOUNTS = [
  { id: 'operating', purpose: 'Cuenta operativa', name: 'Cuenta operativa', bank: 'Maestro', last4: '4821', balance: 426830, theme: 'coral' },
  { id: 'reserve', purpose: 'Reserva para obras', name: 'Reserva para obras', bank: 'Mastercard', last4: '1936', balance: 185900, theme: 'violet' },
  { id: 'business', purpose: 'Tarjeta del negocio', name: 'Tarjeta del negocio', bank: 'Maestro', last4: '7780', balance: 42510, theme: 'gold' }
];
function eonAccountId(record) {
  if (record.accountId) return record.accountId;
  const label = record.account || '';
  return /Reserva|1936/.test(label) ? 'reserve' : /Tarjeta|7780/.test(label) ? 'business' : 'operating';
}
function eonFinancialRecords(records, accounts) {
  return records.map(record => {
    const accountId = eonAccountId(record);
    const account = accounts.find(item => item.id === accountId);
    return { ...record, accountId, account: account ? `${account.name} · ${account.last4}` : record.account };
  });
}
function useEonStore(key, initial) {
  const [value, update] = d.useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) || initial; } catch { return initial; }
  });
  const current = d.useRef(value);
  const set = next => {
    const result = typeof next === 'function' ? next(current.current) : next;
    localStorage.setItem(key, JSON.stringify(result));
    current.current=result;
    update(result);
  };
  return [value, set];
}
function EonProvider({children}) {
  const [accounts, setAccounts] = useEonStore('eonlink-accounts-v2', EON_ACCOUNTS);
  const [photos, setPhotos] = useEonStore('eonlink-project-photos-v2', {});
  const [files, setFiles] = useEonStore('eonlink-files-v2', []);
  const [notice, setNotice] = d.useState('');
  ef=[...files,...EonExampleFiles];
  d.useEffect(() => {
    if (!notice) return;
    if (notice.undo) return;
    const timer = setTimeout(() => setNotice(''), 4500);
    return () => clearTimeout(timer);
  }, [notice]);
  return ehx(EonContext.Provider, {value: {accounts, setAccounts, photos, setPhotos, files, setFiles, notify:setNotice}}, children,
    notice && ehx('div', {className:'toast eon-toast', role:'status'}, ehx(Ka,{size:18}), typeof notice==='string'?notice:notice.text,
      notice.undo&&ehx('button',{className:'eon-undo',onClick:()=>{try{notice.undo();setNotice('Imagen anterior restaurada.');}catch{setNotice('No se pudo restaurar la imagen.');}}},'Deshacer'),
      notice.undo&&ehx('button',{className:'eon-notice-close','aria-label':'Cerrar aviso',onClick:()=>setNotice('')},'×')));
}
const eonArt = (name, className='') => ehx('img', {className:`eon-art ${className}`, src:`/iconos-3d/${name}.png`, alt:'', 'aria-hidden':true, loading:'lazy'});
function eonTone(eyebrow, title) {
  const text = `${eyebrow} ${title}`;
  if (/asistente|precios|operación|nómina/i.test(eyebrow)) return 'violet';
  if (/seguimiento de cotizaciones/i.test(eyebrow)) return 'blue';
  return /cotiza|autoriza|equipo|pendiente|revis/i.test(text) ? 'amber'
    : /asistente|precios|operación|nómina/i.test(text) ? 'violet'
    : /gastos?|caja|cuenta|fondo|dinero|saldo/i.test(text) ? 'mint' : 'blue';
}
Y = function EonModule({eyebrow,title,children,onClick,span=1,className=''}) {
  const tone=eonTone(eyebrow,title), Icon=tone==='amber'?ye:tone==='violet'?ra:tone==='mint'?ol:gt;
  return ehx(_u,{as:'button',type:'button','data-tone':tone,className:`module span-${span} ${className}`,onClick},
    ehx('div',{className:'module-heading'},ehx('div',null,ehx('span',{className:'eyebrow'},ehx(Icon,{size:14,'aria-hidden':true}),eyebrow),ehx('h2',null,title)),ehx(Hu,{size:17,'aria-hidden':true})),children);
};
function EonHero({art}) { return ehx('div',{className:'eon-hero','aria-hidden':true},eonArt(art)); }
function EonQuoteCarousel({children,label='Cotizaciones',initialIndex=0}) {
  const slides=d.default.Children.toArray(children), track=d.useRef(null);
  const [active,setActive]=d.useState(0),[height,setHeight]=d.useState(null);
  function measure(){
    const element=track.current;if(!element)return;
    const cards=[...element.children];
    let nearest=0;
    cards.forEach((card,index)=>{if(Math.abs(card.offsetLeft-element.scrollLeft)<Math.abs(cards[nearest].offsetLeft-element.scrollLeft))nearest=index;});
    setActive(nearest);setHeight(cards[nearest]?.offsetHeight+12||null);
  }
  d.useEffect(()=>{
    const element=track.current;if(!element)return;
    const observer=new ResizeObserver(measure);
    [...element.children].forEach(card=>observer.observe(card));
    observer.observe(element);
    element.scrollTo({left:element.children[Math.min(initialIndex,slides.length-1)]?.offsetLeft||0,behavior:'auto'});
    measure();
    return()=>observer.disconnect();
  },[slides.length,initialIndex]);
  function go(index){
    const element=track.current,card=element?.children[Math.max(0,Math.min(slides.length-1,index))];
    if(card)element.scrollTo({left:card.offsetLeft,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }
  if(!slides.length)return ehx('p',{className:'drawer-intro'},'No hay cotizaciones para mostrar.');
  return ehx('section',{className:'eon-quote-carousel',role:'region','aria-label':label,'aria-roledescription':'carrusel'},
    ehx('div',{className:'eon-carousel-controls'},ehx('span',null,label),ehx('div',null,
      ehx('button',{type:'button','aria-label':'Cotización anterior',disabled:active===0,onClick:()=>go(active-1)},ehx(Yo,{size:18})),
      ehx('span',{className:'eon-carousel-position',role:'status','aria-live':'polite'},`${active+1} de ${slides.length}`),
      ehx('button',{type:'button','aria-label':'Cotización siguiente',disabled:active>=slides.length-1,onClick:()=>go(active+1)},ehx(Qo,{size:18})))),
    ehx('div',{ref:track,className:'eon-carousel-track',tabIndex:0,'aria-label':'Desliza horizontalmente para consultar las cotizaciones',style:height?{height}:undefined,onScroll:measure,onKeyDown:event=>{
      if(event.target!==event.currentTarget)return;
      if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){
        event.preventDefault();go(event.key==='Home'?0:event.key==='End'?slides.length-1:active+(event.key==='ArrowRight'?1:-1));
      }
    }},slides.map((slide,index)=>ehx('div',{className:'eon-carousel-slide',key:slide.key||index,role:'group','aria-roledescription':'tarjeta','aria-label':`${index+1} de ${slides.length}`},slide))));
}
function eonQuoteDrawerSlides(children,quoteId){
  return d.default.Children.map(children,node=>{
    if(!d.default.isValidElement(node)||node.type!==d.default.Fragment)return node;
    const parts=d.default.Children.toArray(node.props.children);
    const cards=parts.filter(part=>part.props?.className==='detail-card');
    if(!cards.length)return node;
    let added=false;
    return ehx(d.default.Fragment,null,parts.map(part=>{
      if(part.props?.className!=='detail-card')return part;
      if(added)return null;added=true;
      return ehx(EonQuoteCarousel,{key:'quote-slides',label:'Cotizaciones',initialIndex:Math.max(0,cards.findIndex(card=>String(card.key).endsWith(quoteId)))},cards);
    }));
  });
}
async function eonReadPhoto(file) {
  if (!file.type.startsWith('image/')) throw new Error('Selecciona una imagen.');
  if (file.size > 20*1024*1024) throw new Error('La imagen debe pesar menos de 20 MB.');
  const url=URL.createObjectURL(file);
  try {
    const image = new Image(); image.src=url; await image.decode();
    const scale=Math.min(1,1000/Math.max(image.width,image.height));
    const canvas=document.createElement('canvas'); canvas.width=Math.round(image.width*scale); canvas.height=Math.round(image.height*scale);
    canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
    return canvas.toDataURL('image/jpeg',.82);
  } finally { URL.revokeObjectURL(url); }
}
function EonThumbnail({project}) {
  const {photos,setPhotos,notify}=d.useContext(EonContext);
  const input=d.useRef(null), [busy,setBusy]=d.useState(false);
  async function change(event) {
    const file=event.target.files?.[0]; if (!file) return;
    setBusy(true);
    try {
      const oldPhoto=photos[project.name];
      const photo=await eonReadPhoto(file);
      setPhotos(previous=>({...previous,[project.name]:photo}));
      notify({text:'Imagen de la obra actualizada.',undo:()=>setPhotos(previous=>({...previous,[project.name]:oldPhoto}))});
    }
    catch(error) { notify(error.name==='QuotaExceededError'?'No hay espacio local suficiente para guardar la imagen.':error.message); }
    finally { setBusy(false); event.target.value=''; }
  }
  return ehx('div',{className:`eon-thumbnail ${photos[project.name]?'has-photo':'no-photo'}`},
    photos[project.name]?ehx('img',{src:photos[project.name],alt:`Imagen de ${project.name}`}):ehx('div',{className:'eon-thumbnail-empty'},eonArt('obras'),ehx('span',null,'Añadir imagen')),
    ehx('button',{className:'eon-photo-add',type:'button',title:'Cambiar imagen de la obra','aria-label':`Cambiar imagen de ${project.name}`,disabled:busy,onClick:()=>input.current.click()},busy?'…':'+'),
    photos[project.name]&&ehx('button',{className:'eon-photo-reset',type:'button',title:'Restaurar imagen predeterminada','aria-label':`Restaurar imagen predeterminada de ${project.name}`,disabled:busy,onClick:()=>{
      const oldPhoto=photos[project.name];
      try{setPhotos(previous=>({...previous,[project.name]:undefined}));notify({text:'Imagen predeterminada restaurada.',undo:()=>setPhotos(previous=>({...previous,[project.name]:oldPhoto}))});}
      catch{notify('No se pudo restaurar la imagen.');}
    }},'↺'),
    ehx('input',{ref:input,type:'file',accept:'image/*',hidden:true,'aria-label':`Seleccionar imagen de ${project.name}`,onChange:change}));
}
function EonProjectCard({project,open}) {
  return ehx('article',{className:'module eon-project-card','data-tone':'blue'},ehx(EonThumbnail,{project}),
    ehx('button',{className:'eon-project-data',onClick:()=>open({type:'project',item:project})},
      ehx('div',{className:'module-heading'},ehx('div',null,ehx('span',{className:'eyebrow'},ehx(gt,{size:14}),'Obra'),ehx('h2',null,project.name)),ehx(Hu,{size:17})),
      ehx('div',{className:'project-visual'},ehx(jg,{value:project.progress}),ehx(Fa,{tone:project.phase==='Por revisar'?'warning':'neutral'},project.phase)),
      ehx(j,{label:'Próxima entrega',value:project.due})));
}
const EonOriginalUS=US, EonOriginalQS=qS, EonOriginalDrawer=kS, EonOriginalMenu=nr, EonOriginalHeader=BS;
BS = function EonHeader(props) {
  d.useContext(EonContext);
  return ehx(EonOriginalHeader,{...props,dataset:{...props.dataset}});
};
qS = function EonOverview(props) {
  const {accounts}=d.useContext(EonContext);
  const mapped=eonFinancialRecords(props.transactionRecords,accounts);
  const tree=EonOriginalQS({...props,transactionRecords:mapped});
  if(props.mode!=='calculate') return tree;
  const children=d.default.Children.toArray(tree.props.children);
  children[0]=ehx(Y,{eyebrow:'Dinero del negocio',title:'Saldo en cuentas',span:2,onClick:()=>props.open({type:'accounts'})},
    ehx(qa,{label:'Saldo · MXN',value:Te(accounts.slice(0,2).reduce((total,item)=>total+Number(item.balance),0)),note:'2 cuentas · sin caja chica'}),
    ehx(Zd,{rows:accounts.slice(0,2).map((item,index)=>({label:item.name,value:Number(item.balance),color:index?'#8ebcff':'#7ee2c3'})),caption:'Saldos de ejemplo · bancos sin conectar'}));
  return d.default.cloneElement(tree,{},...children);
};
US = function EonScreens(props) {
  const {view,open,projectRecords,quoteRecords,startWizard}=props;
  const {accounts}=d.useContext(EonContext);
  if(view==='projects') return ehx(d.default.Fragment,null,ehx(EonHero,{art:'obras'}),ehx('div',{className:'bento-grid eon-projects'},
    projectRecords.map(project=>ehx(EonProjectCard,{key:project.name,project,open})),
    ehx(Y,{eyebrow:'Equipo',title:'Siguientes pasos',span:2,className:'eon-next-steps',onClick:()=>open({type:'attention'})},
      eonArt('pendientes'),ehx('div',{className:'compact-list'},
        ehx(j,{label:'Revisar comprobante de malla',detail:projectRecords[0]?.name,status:ehx(Fa,{tone:'warning'},'Por revisar')}),
        ehx(j,{label:'Revisar fotos de la obra',detail:projectRecords[1]?.name}),ehx(j,{label:'Cerrar pendientes de oficinas',detail:projectRecords[2]?.name}))),
    ehx(Y,{eyebrow:'Obras',title:'Resumen de obras',onClick:()=>open({type:'projects'})},ehx(qa,{label:'Obras activas',value:String(projectRecords.length).padStart(2,'0'),note:'2 entregas este mes'}))));
  if(view==='quotes') return ehx('div',{className:'bento-grid eon-quotes'},
    ehx(Y,{eyebrow:'Seguimiento de cotizaciones',title:'Seguimiento',span:2,onClick:()=>open({type:'quotes'})},ehx(dr,{records:quoteRecords})),
    ehx(Y,{eyebrow:'Asistente',title:'Nueva cotización',className:'eon-quote-create',onClick:()=>startWizard('quote')},ehx('p',{className:'module-note'},'Describe → edita → autoriza.'),eonArt('asistente')),
    ehx(EonQuoteCarousel,{label:'Tus cotizaciones'},[...quoteRecords].sort((a,b)=>(a.status==='Borrador'?-1:1)-(b.status==='Borrador'?-1:1)).map(record=>ehx(Y,{key:record.id,eyebrow:record.id,title:record.project,className:'eon-quote-record',onClick:()=>open({type:'quotes',project:record.project,quoteId:record.id})},
      ehx(qa,{label:'Importe cotizado',value:record.amount}),ehx(Fa,{tone:record.status==='Autorizada'?'success':'warning'},record.status),eonArt('cotizaciones')))));
  if(view==='wallet') return ehx(d.default.Fragment,null,ehx(EonHero,{art:'caja-chica'}),ehx('div',{className:'bento-grid eon-wallet'},
    [{eyebrow:'Fondo para obra',title:'Efectivo para Rejas',amount:8450},{eyebrow:'Operación',title:'Vehículos y obra',amount:4000},{eyebrow:'Reserva',title:'Materiales',amount:6000}].map(item=>ehx(Y,{key:item.title,eyebrow:item.eyebrow,title:item.title,onClick:()=>open({type:'wallet'})},ehx(qa,{label:'Disponible',value:Te(item.amount)})))));
  if(view==='transactions') return ehx('div',{className:'bento-grid'},
    ehx(Y,{eyebrow:'Todas las cuentas',title:'Entradas y salidas',span:2,onClick:()=>open({type:'transactions'})},ehx(fr,{records:eonFinancialRecords(props.transactionRecords,accounts)})),
    ehx(Y,{eyebrow:'Revisión de movimientos',title:'Relacionar comprobantes',onClick:()=>open({type:'transactions'})},ehx(Fa,{tone:'warning'},`${props.transactionRecords.filter(item=>item.status==='Por revisar').length} por relacionar`),ehx('p',{className:'module-note'},'Asocia cada movimiento con su comprobante, obra y categoría.')),
    accounts.map(account=>ehx(Y,{key:account.id,eyebrow:account.purpose,title:account.name,onClick:()=>open({type:'accounts'})},ehx(qa,{label:'Saldo de ejemplo',value:Te(account.balance),note:`${account.bank} · ••${account.last4}`}))));
  return ehx(EonOriginalUS,props);
};
function EonModal({title,onClose,children}) {
  const root=d.useRef(null);
  d.useEffect(()=>{
    const focus=document.activeElement, previous=document.body.style.overflow;
    const siblings=[...root.current.parentElement.children].filter(item=>item!==root.current);
    const previousInert=siblings.map(item=>item.inert); siblings.forEach(item=>item.inert=true);
    document.body.style.overflow='hidden'; root.current.querySelector('button')?.focus();
    return ()=>{document.body.style.overflow=previous;siblings.forEach((item,index)=>item.inert=previousInert[index]);focus?.focus();};
  },[]);
  function keys(event) {
    if(event.key==='Escape') onClose();
    if(event.key!=='Tab') return;
    const focusable=[...root.current.querySelectorAll('button:not(:disabled),input:not([hidden]),select,a[href]')];
    const first=focusable[0],last=focusable.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
  }
  return ehx('div',{ref:root,className:'overlay eon-overlay',onKeyDown:keys,onMouseDown:event=>{if(event.target===event.currentTarget)onClose();}},
    ehx('aside',{className:'detail-drawer eon-drawer',role:'dialog','aria-modal':true,'aria-label':title},
      ehx('header',{className:'drawer-top'},ehx('div',null,ehx('span',{className:'eyebrow'},'DETALLE · DATOS DE EJEMPLO'),ehx('h2',null,title)),ehx('button',{className:'icon-button','aria-label':'Cerrar detalle',onClick:onClose},ehx(be,{size:20}))),
      ehx('div',{className:'drawer-scroll'},children)));
}
function EonBankCard({account}) {
  return ehx('div',{className:`eon-bank-card theme-${account.theme}`,'aria-label':`${account.bank}, terminación ${account.last4}`},
    ehx('div',{className:'eon-card-brand'},ehx('span',{className:'eon-card-circles'}),ehx('span',null,account.bank),ehx('span',{className:'eon-contactless'},')))')),
    ehx('span',{className:'eon-chip','aria-hidden':true}),ehx('span',{className:'eon-bank-number'},`••••  ••••  ••••  ${account.last4}`),ehx('span',{className:'eon-card-holder'},account.name));
}
function EonAccounts({onClose}) {
  const {accounts,setAccounts,notify}=d.useContext(EonContext);
  const [editing,setEditing]=d.useState(null),[draft,setDraft]=d.useState(null),[error,setError]=d.useState('');
  const editRef=d.useRef(null),replaceRef=d.useRef(null);
  d.useEffect(()=>{if(editing)editRef.current?.focus();},[editing]);
  function begin(account,event){replaceRef.current=event.currentTarget;setEditing(account.id);setDraft({...account});setError('');}
  function cancel(){setEditing(null);requestAnimationFrame(()=>replaceRef.current?.focus());}
  function save(event) {
    event.preventDefault();
    if(!draft.name.trim()||!draft.bank.trim()||!/^\d{4}$/.test(draft.last4)||draft.balance===''||!Number.isFinite(Number(draft.balance))){setError('Completa el nombre, banco, cuatro dígitos y un saldo válido.');return;}
    try {setAccounts(items=>items.map(item=>item.id===editing?{...draft,name:draft.name.trim(),bank:draft.bank.trim(),balance:Number(draft.balance)}:item));cancel();notify('Cuenta reemplazada. Resumen y movimientos actualizados.');}
    catch {setError('No se pudo guardar. Revisa el espacio disponible del navegador.');}
  }
  return ehx(EonModal,{title:'Cuentas del negocio',onClose},
    ehx('p',{className:'drawer-intro'},'Saldos de ejemplo. Primero se podrán cargar estados de cuenta en CSV; la conexión bancaria se evaluará según disponibilidad y costo.'),
    accounts.map(account=>ehx('section',{key:account.id,className:'detail-card eon-account'},
      ehx('div',{className:'detail-card-top'},ehx('strong',null,`${account.name} · ••${account.last4}`),ehx('b',null,Te(account.balance))),
      ehx('div',{className:'eon-account-body'},ehx('button',{className:'eon-replace-card','aria-label':`Reemplazar ${account.purpose}`,title:'Actualizar / reemplazar cuenta o tarjeta',onClick:event=>begin(account,event)},
        ehx('svg',{viewBox:'0 0 24 24',width:28,height:28,fill:'none',stroke:'currentColor',strokeWidth:1.7,'aria-hidden':true},ehx('path',{d:'M20 7v5h-5M4 17v-5h5M20 12a8 8 0 0 0-14-5M4 12a8 8 0 0 0 14 5'}))),ehx(EonBankCard,{account})),
      editing===account.id&&ehx('form',{className:'eon-account-form',onSubmit:save},ehx('h3',null,`Reemplazar: ${account.purpose}`),ehx('p',null,'La cuenta que designes se usará en el resumen y en los movimientos de este aspecto del negocio.'),
        [['Nombre de la cuenta','name','text'],['Banco o emisor','bank','text'],['Últimos cuatro dígitos','last4','text'],['Saldo de ejemplo (MXN)','balance','number']].map(([label,key,type],index)=>ehx('label',{key,className:'form-field'},ehx('span',null,label),ehx('input',{ref:index===0?editRef:undefined,type,required:true,value:draft[key],maxLength:key==='last4'?4:80,inputMode:key==='last4'?'numeric':undefined,step:key==='balance'?'.01':undefined,onChange:event=>setDraft(previous=>({...previous,[key]:event.target.value}))}))),
        ehx('label',{className:'form-field'},ehx('span',null,'Color de tarjeta'),ehx('select',{value:draft.theme,onChange:event=>setDraft(previous=>({...previous,theme:event.target.value}))},[['coral','Coral'],['violet','Violeta'],['gold','Dorado']].map(([value,label])=>ehx('option',{key:value,value},label)))),
        error&&ehx('p',{role:'alert',className:'eon-error'},error),ehx('div',{className:'eon-form-actions'},ehx('button',{type:'button',className:'secondary-action',onClick:cancel},'Cancelar'),ehx('button',{className:'primary-action',type:'submit'},'Guardar reemplazo'))))));
}
function eonFileKind(name,type='') {
  return /\.pdf$/i.test(name)||type==='application/pdf'?'pdf':/\.(xlsx?|csv)$/i.test(name)?'excel':/\.(docx?|odt)$/i.test(name)?'word':type.startsWith('image/')||/\.(png|jpe?g|webp|gif)$/i.test(name)||type==='Fotos'?'image':'word';
}
function eonFileDatabase() {
  return new Promise((resolve,reject)=>{
    const request=indexedDB.open('eonlink-files',1);
    request.onupgradeneeded=()=>request.result.createObjectStore('blobs');
    request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error);
  });
}
async function eonSaveFile(id,file) {
  const db=await eonFileDatabase();
  try {await new Promise((resolve,reject)=>{const transaction=db.transaction('blobs','readwrite');transaction.objectStore('blobs').put(file,id);transaction.oncomplete=resolve;transaction.onerror=()=>reject(transaction.error);});}
  finally {db.close();}
}
async function eonDownloadFile(record) {
  const db=await eonFileDatabase();
  let blob;
  try {blob=await new Promise((resolve,reject)=>{const request=db.transaction('blobs').objectStore('blobs').get(record.id);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
  finally {db.close();}
  if(!blob)throw new Error('No se encontró el archivo local.');
  const url=URL.createObjectURL(blob),anchor=document.createElement('a');anchor.href=url;anchor.download=record.name;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function EonFiles(props) {
  const {files,setFiles,notify}=d.useContext(EonContext), {drawer,projectRecords,onNavigate,onClose}=props;
  const selected=drawer.project||drawer.item?.name||projectRecords[0]?.name;
  const [project,setProject]=d.useState(selected),[busy,setBusy]=d.useState(false);
  const input=d.useRef(null);
  async function upload(event){
    const picked=[...event.target.files];if(!picked.length)return;setBusy(true);
    try {
      const additions=[];
      for(const file of picked){if(file.size>25*1024*1024)throw new Error('Cada archivo debe pesar menos de 25 MB.');const id=crypto.randomUUID();await eonSaveFile(id,file);additions.push({id,name:file.name,project,type:file.type,kind:eonFileKind(file.name,file.type),source:'Este dispositivo',date:new Date().toLocaleDateString('es-MX',{day:'numeric',month:'short'})});}
      setFiles(previous=>[...additions,...previous]);notify('Archivos guardados en esta obra.');
    }catch(error){notify(error.message||'No se pudo guardar el archivo.');}
    finally {setBusy(false);event.target.value='';}
  }
  return ehx(EonModal,{title:'Archivos de la obra',onClose},
    ehx('div',{className:'project-context'},ehx('span',{className:'eyebrow'},'Obra seleccionada'),
      drawer.project?ehx('strong',null,project):ehx('label',{className:'eon-project-select'},ehx('span',{className:'sr-only'},'Seleccionar obra'),ehx('select',{value:project,onChange:event=>setProject(event.target.value)},projectRecords.map(item=>ehx('option',{key:item.name},item.name)))),
      ehx('nav',{'aria-label':'Secciones de la obra'},[{type:'project',label:'Resumen',icon:Lt},{type:'quotes',label:'Cotizaciones',icon:ye},{type:'files',label:'Archivos',icon:gt},{type:'expenses',label:'Gastos',icon:vt}].map(item=>ehx('button',{key:item.type,'aria-current':item.type==='files'?'page':undefined,onClick:()=>{if(item.type!=='files')onNavigate({type:item.type,project,item:projectRecords.find(record=>record.name===project)});}},ehx(item.icon,{size:18}),ehx('span',null,item.label))))),
    ehx('p',{className:'drawer-intro'},'Archivos · ejemplo. WhatsApp y Google Drive aún no están conectados.'),
    ehx('button',{className:'eon-add-file','aria-label':`Añadir archivos a ${project}`,disabled:busy,onClick:()=>input.current.click()},busy?'Guardando…':'+'),
    ehx('input',{ref:input,type:'file',multiple:true,accept:'.pdf,.xlsx,.xls,.csv,.doc,.docx,.odt,image/*',hidden:true,'aria-label':'Seleccionar archivos de la obra',onChange:upload}),
    ef.filter(record=>record.project===project).map((record,index)=>ehx('article',{className:`detail-card eon-file-card kind-${record.kind||eonFileKind(record.name,record.type)}`,key:record.id||index},
      ehx('span',{className:'eon-file-format'},({pdf:'PDF',excel:'XLS',image:'IMG',word:'DOC'})[record.kind||eonFileKind(record.name,record.type)]),ehx('strong',null,record.name),ehx('small',null,record.project),
      ehx('div',{className:'detail-pair'},ehx('span',null,`${record.id?(record.kind==='image'?'Imagen':'Documento'):record.type} · ${record.date}`),ehx('b',null,record.source)),
      record.id&&ehx('button',{className:'eon-file-download',onClick:async()=>{try{await eonDownloadFile(record);}catch(error){notify(error.message);}}},'Descargar archivo'))),
    ehx('div',{className:'detail-card'},ehx('strong',null,'Cómo llegan los archivos'),ehx('p',null,'Recibir en el WhatsApp del negocio → sugerir obra y categoría → confirmar → guardar en la carpeta de Drive.')));
}
kS = function EonDrawer(props) {
  const {accounts}=d.useContext(EonContext);
  if(props.drawer.type==='accounts')return ehx(EonAccounts,{onClose:props.onClose});
  if(props.drawer.type==='files')return ehx(EonFiles,props);
  const current=props.drawer.type==='project'?props.projectRecords.find(item=>item.name===(props.drawer.project||props.drawer.item?.name)):null;
  return ehx(EonLegacyDrawer,{...props,drawer:current?{...props.drawer,item:current}:props.drawer,transactionRecords:eonFinancialRecords(props.transactionRecords,accounts)});
};
function EonLegacyDrawer(props) {
  const original=EonOriginalDrawer(props);
  const panel=original.props.children;
  const [header,scroll]=d.default.Children.toArray(panel.props.children);
  const title=header.props.children[0].props.children[1].props.children;
  return ehx(EonModal,{title,onClose:props.onClose},
    props.drawer.type==='project'&&ehx('div',{className:'eon-detail-thumbnail'},ehx(EonThumbnail,{project:props.drawer.item})),
    props.drawer.type==='quotes'?eonQuoteDrawerSlides(scroll.props.children,props.drawer.quoteId):scroll.props.children);
}
nr = function EonMenu(props) {
  const tree=EonOriginalMenu(props);
  const sheet=tree.props.children,children=d.default.Children.toArray(sheet.props.children),scroll=children.at(-1);
  const parts=d.default.Children.toArray(scroll.props.children),workspaces=parts[0],create=parts[1],destinations=parts[2];
  const createButtons=d.default.Children.toArray(create.props.children).map((button,index)=>d.default.cloneElement(button,{},eonArt(index?'registrar-gasto':'crear-cotizacion'),ehx('span',null,index?'Registrar gasto':'Cotizar')));
  const newCreate=d.default.cloneElement(create,{},...createButtons);
  const newScroll=d.default.cloneElement(scroll,{},newCreate,destinations,workspaces);
  return d.default.cloneElement(tree,{},d.default.cloneElement(sheet,{},...children.slice(0,-1),newScroll));
};
