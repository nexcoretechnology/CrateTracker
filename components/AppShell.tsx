 "use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3, Bell, Boxes, ChevronLeft, ChevronRight, ClipboardList, FileText,
  LayoutDashboard, Menu, MessageCircle, Plus, Search, Settings, Truck,
  UserRound, Users, X, Phone, Check, AlertCircle, ArrowRight, CalendarDays,
  PackageCheck, MapPin, MoreHorizontal, Pencil, Trash2
} from "lucide-react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

type Farmer={id:number;name:string;phone:string;village:string;given:number;collected:number;pending:number};
type Wholesaler={id:number;name:string;location:string;phone:string};
type Collection={id:number;farmer:string;date:string;given:number;collected:number;pending:number;sorted:boolean;wholesaler:string;items:{name:string;qty:number}[]};

const initialFarmers:Farmer[]=[
 {id:1,name:"Ramesh Singh",phone:"9876543210",village:"Katol",given:90,collected:80,pending:10},
 {id:2,name:"Suresh Patil",phone:"9823012345",village:"Hingna",given:70,collected:50,pending:20},
 {id:3,name:"Mohan Yadav",phone:"9765432109",village:"Saoner",given:90,collected:90,pending:0},
 {id:4,name:"Ganesh Pawar",phone:"9898989898",village:"Kalmeshwar",given:60,collected:60,pending:0},
];
const wholesalers:Wholesaler[]=[
 {id:1,name:"ABC Fresh Produce",location:"Nashik",phone:"9811111111"},
 {id:2,name:"Shree Market",location:"Nagpur",phone:"9822222222"},
 {id:3,name:"Kisan Wholesale Hub",location:"Pune",phone:"9833333333"},
];
const crateTypes=["Tomato Crate","Onion Crate","Grapes Crate","Apple Crate","Potato Crate"];
const initialCollections:Collection[]=[
 {id:1,farmer:"Ramesh Singh",date:"27 Sep 2026",given:90,collected:80,pending:10,sorted:true,wholesaler:"ABC Fresh Produce",items:[{name:"Tomato Crate",qty:30},{name:"Onion Crate",qty:20},{name:"Grapes Crate",qty:20},{name:"Apple Crate",qty:10}]},
 {id:2,farmer:"Suresh Patil",date:"27 Sep 2026",given:70,collected:50,pending:20,sorted:false,wholesaler:"Shree Market",items:[]},
 {id:3,farmer:"Mohan Yadav",date:"26 Sep 2026",given:90,collected:90,pending:0,sorted:true,wholesaler:"ABC Fresh Produce",items:[{name:"Tomato Crate",qty:45},{name:"Onion Crate",qty:25},{name:"Potato Crate",qty:20}]}
];

const nav=[
 {href:"/",label:"Home",icon:LayoutDashboard},
 {href:"/farmers",label:"Farmers",icon:Users},
 {href:"/collections",label:"Collections",icon:Boxes},
 {href:"/reports",label:"Reports",icon:BarChart3},
 {href:"/settings",label:"Settings",icon:Settings},
];

export default function AppShell(){
 const path=usePathname();
 const router=useRouter();
 const [menu,setMenu]=useState(false);
 const [farmers,setFarmers]=useState(initialFarmers);
 const [collections,setCollections]=useState(initialCollections);
 const [search,setSearch]=useState("");
 const [modal,setModal]=useState<string|null>(null);

 const page = useMemo(()=>path==="/"?"dashboard":path.split("/")[1]||"dashboard",[path]);

 useEffect(()=>{setMenu(false);setModal(null);},[path]);

 const title=page==="dashboard"?"Dashboard":page==="farmers"?"Farmers":page==="collections"?"Collections":page==="reports"?"Reports & Analytics":page==="settings"?"Settings":"Shivam Collection";

 const createCollection=(data:Omit<Collection,"id">)=>{
   setCollections(v=>[{...data,id:Date.now()},...v]);
   setFarmers(v=>v.map(f=>f.name===data.farmer?{...f,collected:f.collected+data.collected,pending:Math.max(0,f.pending-data.collected)}:f));
 };

 return <div className="min-h-screen bg-[#f5f7f4]">
   <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
     <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-7">
       <div className="flex items-center gap-3">
         <button onClick={()=>setMenu(true)} className="rounded-xl p-2 hover:bg-gray-100 md:hidden"><Menu size={21}/></button>
         <Link href="/" className="flex items-center gap-2.5">
           <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-leaf-700 text-white"><Boxes size={20}/></span>
           <span className="hidden sm:block"><b className="block text-sm">Shivam Collection</b><span className="text-[11px] text-gray-500">Farmer operations</span></span>
         </Link>
       </div>
       <div className="flex items-center gap-2">
         <button className="hidden rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold md:block">Today · 27 Sep 2026</button>
         <button className="rounded-xl p-2 hover:bg-gray-100"><Bell size={19}/></button>
         <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-leaf-100 text-xs font-bold text-leaf-700 md:flex">S</div>
       </div>
     </div>
   </header>

   <div className="mx-auto flex max-w-7xl">
     <aside className="sticky top-16 hidden h-[calc(100vh-64px)] w-60 shrink-0 border-r border-gray-200 bg-white px-3 py-5 md:block">
       <nav className="space-y-1">
         {nav.map(n=><NavLink key={n.href} {...n} active={path===n.href}/>)}
       </nav>
       <div className="mt-7 border-t border-gray-100 pt-5">
         <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Operations</p>
         {[
           ["/give-crates","Give Crates",Plus],
           ["/collect","Collect Crates",PackageCheck],
           ["/pending","Pending Collections",AlertCircle],
           ["/wholesalers","Wholesalers",Truck],
           ["/crate-types","Crate Types",Boxes],
           ["/whatsapp","WhatsApp",MessageCircle],
         ].map(([href,label,Icon]:any)=><NavLink key={href} href={href} label={label} icon={Icon} active={path===href}/>)}
       </div>
     </aside>

     <main className="min-w-0 flex-1 px-4 pb-28 pt-5 md:px-7 md:pb-8">
       {page==="dashboard" && <Dashboard farmers={farmers} collections={collections} router={router} setModal={setModal}/>}
       {page==="farmers" && <FarmersPage farmers={farmers} setFarmers={setFarmers} search={search} setSearch={setSearch} router={router}/>}
       {page==="collections" && <CollectionsPage collections={collections} router={router}/>}
       {page==="reports" && <ReportsPage collections={collections}/>}
       {page==="settings" && <SettingsPage/>}
       {page==="give-crates" && <GivePage farmers={farmers} />}
       {page==="collect" && <CollectPage farmers={farmers} wholesalers={wholesalers} onCreate={createCollection} router={router}/>}
       {page==="pending" && <PendingPage farmers={farmers} router={router}/>}
       {page==="wholesalers" && <WholesalersPage/>}
       {page==="crate-types" && <CrateTypesPage/>}
       {page==="whatsapp" && <WhatsAppPage collections={collections}/>}
     </main>
   </div>

   <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
     <div className="mx-auto flex max-w-xl justify-around">
       {nav.map(n=><MobileNav key={n.href} {...n} active={path===n.href}/>)}
     </div>
   </nav>

   {menu && <div className="fixed inset-0 z-50 bg-black/30 md:hidden" onClick={()=>setMenu(false)}>
     <aside className="h-full w-[84%] max-w-sm bg-white p-5 shadow-xl" onClick={e=>e.stopPropagation()}>
       <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-leaf-700 text-white"><Boxes size={19}/></span><b>Shivam Collection</b></div><button onClick={()=>setMenu(false)} className="rounded-xl p-2"><X/></button></div>
       <div className="mt-6 space-y-1">{[
         ...nav.map(n=>[n.href,n.label,n.icon]),
         ["/give-crates","Give Crates",Plus],["/collect","Collect Crates",PackageCheck],["/pending","Pending Collections",AlertCircle],
         ["/wholesalers","Wholesalers",Truck],["/crate-types","Crate Types",Boxes],["/whatsapp","WhatsApp",MessageCircle]
       ].map(([href,label,Icon]:any)=><Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${path===href?"bg-leaf-50 text-leaf-700":"text-gray-700 hover:bg-gray-50"}`}><Icon size={18}/>{label}</Link>)}</div>
     </aside>
   </div>}

   {modal==="quick" && <QuickModal close={()=>setModal(null)} router={router}/>}
 </div>;
}

function NavLink({href,label,icon:Icon,active}:{href:string;label:string;icon:any;active:boolean}){
 return <Link href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${active?"bg-leaf-50 text-leaf-700":"text-gray-600 hover:bg-gray-50"}`}><Icon size={18}/>{label}</Link>;
}
function MobileNav({href,label,icon:Icon,active}:{href:string;label:string;icon:any;active:boolean}){
 return <Link href={href} className={`flex min-w-14 flex-col items-center gap-1 px-2 py-2 text-[10px] font-semibold ${active?"text-leaf-700":"text-gray-500"}`}><Icon size={19}/><span>{label}</span></Link>;
}

function Dashboard({farmers,collections,router,setModal}:{farmers:Farmer[];collections:Collection[];router:any;setModal:(x:string|null)=>void}){
 const pending=farmers.filter(f=>f.pending>0);
 return <div className="mx-auto max-w-6xl">
   <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
     <div><p className="text-xs font-medium text-gray-500">Good morning</p><h1 className="mt-1 text-2xl font-bold">Shivam</h1><p className="mt-1 text-sm text-gray-500">Here&apos;s today&apos;s collection overview.</p></div>
     <div className="flex gap-2"><button onClick={()=>router.push("/give-crates")} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-bold"><Plus size={17}/> Give crates</button><button onClick={()=>router.push("/collect")} className="flex items-center gap-2 rounded-xl bg-leaf-700 px-3 py-2.5 text-sm font-bold text-white"><PackageCheck size={17}/> Collect</button></div>
   </div>
   <section className="rounded-3xl bg-leaf-700 p-5 text-white shadow-soft sm:p-6">
     <div className="flex justify-between gap-5"><div><p className="text-xs font-semibold text-green-100">TODAY&apos;S OPERATIONS</p><h2 className="mt-1 text-xl font-bold sm:text-2xl">Keep collections moving.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-green-100">Record crates given, collect ready produce, track pending crates, and send the farmer&apos;s collection summary.</p></div><div className="hidden rounded-2xl bg-white/10 p-3 sm:block"><Boxes size={28}/></div></div>
     <div className="mt-5 grid grid-cols-2 gap-3 sm:max-w-md"><button onClick={()=>router.push("/give-crates")} className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-leaf-700">Give crates</button><button onClick={()=>router.push("/collect")} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white ring-1 ring-white/20">Collect crates</button></div>
   </section>
   <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4"><Metric title="Given today" value="90" sub="crates"/><Metric title="Collected today" value="130" sub="crates"/><Metric title="Pending" value={String(pending.reduce((a,f)=>a+f.pending,0))} sub="crates"/><Metric title="Active farmers" value={String(farmers.length)} sub="farmers"/></div>
   <div className="mt-7 grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
     <section><div className="mb-3 flex items-center justify-between"><h2 className="font-bold">Today&apos;s activity</h2><Link href="/collections" className="text-sm font-bold text-leaf-700">History →</Link></div>
       <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">{collections.slice(0,4).map((c,i)=><Link href={`/collections/${c.id}`} key={c.id} className={`flex items-center gap-3 p-4 ${i?"border-t border-gray-100":""}`}><Avatar name={c.farmer}/><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="truncate text-sm font-bold">{c.farmer}</p>{c.sorted?<Tag>Sorted</Tag>:<Tag muted>Unsorted</Tag>}</div><p className="mt-1 text-xs text-gray-500">{c.collected} crates collected · {c.date}</p></div><ChevronRight size={17} className="text-gray-400"/></Link>)}</div>
     </section>
     <section><div className="mb-3 flex items-center justify-between"><h2 className="font-bold">Pending</h2><Link href="/pending" className="text-sm font-bold text-leaf-700">View all</Link></div><div className="space-y-3">{pending.slice(0,3).map(f=><Link href="/pending" key={f.id} className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4"><Avatar name={f.name}/><div className="flex-1"><p className="text-sm font-bold">{f.name}</p><p className="text-xs text-amber-800">{f.pending} crates pending</p></div><ChevronRight size={17}/></Link>)}</div></section>
   </div>
 </div>;
}
function Metric({title,value,sub}:{title:string;value:string;sub:string}){return <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"><p className="text-xs text-gray-500">{title}</p><div className="mt-1 flex items-baseline gap-1"><span className="text-2xl font-bold">{value}</span><span className="text-xs text-gray-500">{sub}</span></div></div>}
function Avatar({name}:{name:string}){return <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf-50 text-xs font-bold text-leaf-700">{name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div>}
function Tag({children,muted=false}:{children:React.ReactNode;muted?:boolean}){return <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${muted?"bg-gray-100 text-gray-600":"bg-leaf-50 text-leaf-700"}`}>{children}</span>}

function FarmersPage({farmers,setFarmers,search,setSearch,router}:{farmers:Farmer[];setFarmers:any;search:string;setSearch:any;router:any}){
 const [show,setShow]=useState(false);
 const filtered=farmers.filter(f=>(f.name+" "+f.village).toLowerCase().includes(search.toLowerCase()));
 return <PageHeader title="Farmers" subtitle={`${farmers.length} active farmer records`} action={<button onClick={()=>setShow(true)} className="flex items-center gap-2 rounded-xl bg-leaf-700 px-4 py-2.5 text-sm font-bold text-white"><Plus size={17}/> Add farmer</button>}>
   <div className="mb-4 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2.5"><Search size={18} className="text-gray-400"/><input value={search} onChange={e=>setSearch(e.target.value)} className="w-full outline-none" placeholder="Search farmer or village"/></div>
   <div className="grid gap-3 md:grid-cols-2">{filtered.map(f=><button onClick={()=>router.push(`/farmers/${f.id}`)} key={f.id} className="rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm hover:border-leaf-200"><div className="flex items-center gap-3"><Avatar name={f.name}/><div className="min-w-0 flex-1"><p className="font-bold">{f.name}</p><p className="text-xs text-gray-500">{f.village} · {f.phone}</p></div><ChevronRight size={18} className="text-gray-400"/></div><div className="mt-4 grid grid-cols-3 gap-2"><MiniStat label="Given" value={f.given}/><MiniStat label="Collected" value={f.collected}/><MiniStat label="Pending" value={f.pending} warning={f.pending>0}/></div></button>)}</div>
   {show&&<FormModal title="Add farmer" close={()=>setShow(false)} onSave={(x:any)=>{setFarmers((v:any)=>[...v,{id:Date.now(),name:x.name,phone:x.phone,village:x.village,given:0,collected:0,pending:0}]);setShow(false)}} fields={["name","phone","village"]}/>}
 </PageHeader>;
}
function MiniStat({label,value,warning}:{label:string;value:number;warning?:boolean}){return <div className={`rounded-xl p-2 ${warning?"bg-amber-50":"bg-gray-50"}`}><p className="text-[10px] text-gray-500">{label}</p><p className={`mt-1 text-sm font-bold ${warning?"text-amber-800":""}`}>{value}</p></div>}

function CollectionsPage({collections,router}:{collections:Collection[];router:any}){return <PageHeader title="Collections" subtitle="Every pickup recorded from farmers" action={<button onClick={()=>router.push("/collect")} className="flex items-center gap-2 rounded-xl bg-leaf-700 px-4 py-2.5 text-sm font-bold text-white"><Plus size={17}/> New collection</button>}><div className="space-y-3">{collections.map(c=><button key={c.id} onClick={()=>router.push(`/collections/${c.id}`)} className="w-full rounded-2xl border border-gray-200 bg-white p-4 text-left"><div className="flex items-center gap-3"><Avatar name={c.farmer}/><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><b className="text-sm">{c.farmer}</b><Tag muted={!c.sorted}>{c.sorted?"Sorted":"Unsorted"}</Tag></div><p className="mt-1 text-xs text-gray-500">{c.date} · {c.wholesaler}</p></div><div className="text-right"><b className="text-sm">{c.collected}</b><p className="text-[10px] text-gray-500">collected</p></div><ChevronRight size={17} className="text-gray-400"/></div><div className="mt-3 grid grid-cols-3 gap-2"><MiniStat label="Given" value={c.given}/><MiniStat label="Collected" value={c.collected}/><MiniStat label="Remaining" value={c.pending} warning={c.pending>0}/></div></button>)}</div></PageHeader>}

function CollectPage({farmers,wholesalers,onCreate,router}:{farmers:Farmer[];wholesalers:Wholesaler[];onCreate:(x:any)=>void;router:any}){
 const [farmerId,setFarmerId]=useState(String(farmers[0]?.id||""));
 const [sorted,setSorted]=useState(true); const [given,setGiven]=useState(farmers[0]?.pending+farmers[0]?.collected||90);
 const [total,setTotal]=useState(80); const [wholesaler,setWholesaler]=useState(wholesalers[0]?.name||"");
 const [items,setItems]=useState<Record<string,number>>({"Tomato Crate":30,"Onion Crate":20,"Grapes Crate":20,"Apple Crate":10});
 const farmer=farmers.find(f=>f.id===Number(farmerId)); const sum=Object.values(items).reduce((a,b)=>a+(Number(b)||0),0); const collected=sorted?sum:total; const pending=Math.max(0,given-collected);
 useEffect(()=>{if(farmer)setGiven(farmer.pending+farmer.collected)},[farmerId]);
 const save=()=>{onCreate({farmer:farmer?.name||"",date:"27 Sep 2026",given,collected,pending,sorted,wholesaler,items:sorted?Object.entries(items).filter(([,q])=>q>0).map(([name,qty])=>({name,qty})):[]});router.push("/collections");};
 return <PageHeader title="Collect crates" subtitle="Record what is ready at the farmer"><div className="mx-auto max-w-2xl space-y-5">
   <Card><Field label="Farmer"><select value={farmerId} onChange={e=>setFarmerId(e.target.value)} className="input">{farmers.map(f=><option key={f.id} value={f.id}>{f.name}</option>)}</select></Field><div className="mt-4 grid grid-cols-2 gap-3"><Info label="Given earlier" value={`${given} crates`}/><Info label="Already collected" value={`${farmer?.collected||0} crates`}/></div></Card>
   <Card><p className="text-sm font-bold">Was the produce sorted by farmer?</p><div className="mt-3 grid grid-cols-2 gap-3"><button onClick={()=>setSorted(true)} className={`rounded-2xl border p-4 text-left ${sorted?"border-leaf-500 bg-leaf-50":"border-gray-200 bg-white"}`}><b className="block text-sm">Yes, sorted</b><span className="mt-1 block text-xs text-gray-500">Enter crate type quantities</span></button><button onClick={()=>setSorted(false)} className={`rounded-2xl border p-4 text-left ${!sorted?"border-leaf-500 bg-leaf-50":"border-gray-200 bg-white"}`}><b className="block text-sm">No, unsorted</b><span className="mt-1 block text-xs text-gray-500">Wholesaler will sort</span></button></div></Card>
   {sorted?<Card><div className="flex items-center justify-between"><div><b className="text-sm">Product-wise quantities</b><p className="text-xs text-gray-500">Total updates automatically</p></div><span className="rounded-full bg-leaf-50 px-2.5 py-1 text-xs font-bold text-leaf-700">{sum} crates</span></div><div className="mt-4 space-y-3">{crateTypes.map(t=><div key={t} className="flex items-center justify-between gap-3"><span className="text-sm">{t}</span><input type="number" min="0" value={items[t]||0} onChange={e=>setItems({...items,[t]:Number(e.target.value)})} className="w-24 rounded-xl border border-gray-200 px-3 py-2 text-right outline-none focus:border-leaf-500"/></div>)}</div></Card>:<Card><Field label="Total crates collected"><input type="number" min="0" value={total} onChange={e=>setTotal(Number(e.target.value))} className="input"/></Field><p className="mt-3 rounded-xl bg-gray-50 p-3 text-xs text-gray-600">Produce was not sorted by farmer. The wholesaler will sort it.</p></Card>}
   <Card><Field label="Destination wholesaler"><select value={wholesaler} onChange={e=>setWholesaler(e.target.value)} className="input">{wholesalers.map(w=><option key={w.id}>{w.name}</option>)}</select></Field><div className="mt-4 grid grid-cols-2 gap-3"><Info label="Collected" value={`${collected} crates`} green/><Info label="Remaining" value={`${pending} crates`} warning={pending>0}/></div></Card>
   <div className="flex gap-3"><button onClick={()=>router.back()} className="flex-1 rounded-xl border border-gray-200 bg-white py-3 font-bold">Cancel</button><button onClick={save} className="flex-1 rounded-xl bg-leaf-700 py-3 font-bold text-white">Save collection</button></div>
 </div></PageHeader>
}
function GivePage({farmers}:{farmers:Farmer[]}){const [farmer,setFarmer]=useState(String(farmers[0]?.id||""));const [qty,setQty]=useState(90);const [saved,setSaved]=useState(false);return <PageHeader title="Give crates" subtitle="Record crates handed to a farmer"><div className="mx-auto max-w-xl"><Card><Field label="Farmer"><select value={farmer} onChange={e=>setFarmer(e.target.value)} className="input">{farmers.map(f=><option value={f.id} key={f.id}>{f.name}</option>)}</select></Field><Field label="Number of crates" className="mt-4"><input type="number" value={qty} onChange={e=>setQty(Number(e.target.value))} className="input"/></Field><Field label="Date" className="mt-4"><input type="date" defaultValue="2026-09-27" className="input"/></Field><button onClick={()=>setSaved(true)} className="mt-5 w-full rounded-xl bg-leaf-700 py-3 font-bold text-white">{saved?"Saved ✓":"Save crates given"}</button>{saved&&<p className="mt-3 rounded-xl bg-leaf-50 p-3 text-sm text-leaf-700">Recorded {qty} crates for the selected farmer. Database connection will replace this demo state later.</p>}</Card></div></PageHeader>}

function PendingPage({farmers,router}:{farmers:Farmer[];router:any}){const pending=farmers.filter(f=>f.pending>0);return <PageHeader title="Pending collections" subtitle="Crates still expected from farmers"><div className="space-y-3">{pending.map(f=><div key={f.id} className="rounded-2xl border border-amber-200 bg-white p-4"><div className="flex items-center gap-3"><Avatar name={f.name}/><div className="flex-1"><b>{f.name}</b><p className="text-xs text-gray-500">{f.village} · {f.phone}</p></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">{f.pending} pending</span></div><div className="mt-4 flex gap-2"><button onClick={()=>router.push("/collect")} className="flex-1 rounded-xl bg-leaf-700 py-2.5 text-sm font-bold text-white">Collect now</button><a href={`tel:${f.phone}`} className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold"><Phone size={16}/> Call</a></div></div>)}{pending.length===0&&<Empty title="No pending collections" text="All farmer collections are up to date."/>}</div></PageHeader>}

function WholesalersPage(){return <PageHeader title="Wholesalers" subtitle="Collection destinations"><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{wholesalers.map(w=><div key={w.id} className="rounded-2xl border border-gray-200 bg-white p-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-leaf-50 text-leaf-700"><Truck size={19}/></div><div><b className="text-sm">{w.name}</b><p className="text-xs text-gray-500">{w.location}</p></div></div><div className="mt-4 flex gap-2"><a href={`tel:${w.phone}`} className="flex-1 rounded-xl border border-gray-200 py-2 text-center text-xs font-bold">Call</a><button className="flex-1 rounded-xl bg-gray-50 py-2 text-xs font-bold">Edit</button></div></div>)}</div></PageHeader>}
function CrateTypesPage(){const [types,setTypes]=useState(crateTypes);const [value,setValue]=useState("");return <PageHeader title="Crate types" subtitle="Predefined types used during sorted collections"><Card><div className="flex gap-2"><input value={value} onChange={e=>setValue(e.target.value)} placeholder="New crate type" className="input"/><button onClick={()=>{if(value.trim()){setTypes([...types,value.trim()]);setValue("")}}} className="rounded-xl bg-leaf-700 px-4 text-sm font-bold text-white">Add</button></div><div className="mt-4 space-y-2">{types.map((t,i)=><div key={`${t}-${i}`} className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-3 text-sm"><span>{t}</span><button onClick={()=>setTypes(types.filter((_,x)=>x!==i))} className="text-gray-400"><Trash2 size={16}/></button></div>)}</div></Card></PageHeader>}
function WhatsAppPage({collections}:{collections:Collection[]}){const [id,setId]=useState(collections[0]?.id);const c=collections.find(x=>x.id===id)||collections[0];if(!c)return <Empty title="No collections" text="Create a collection first."/>;const message=c.sorted?`Hello ${c.farmer},\\n\\nWe collected your crates today, 27 Sep 2026.\\n\\n${c.items.map(i=>`• ${i.name.replace(" Crate","")} – ${i.qty} crates`).join("\\n")}\\n\\nTotal collected: ${c.collected}/${c.given} crates\\nRemaining: ${c.pending} crates\\n\\nThese crates are being sent to ${c.wholesaler}.\\n\\nThank you,\\nShivam`:`Hello ${c.farmer},\\n\\nWe collected ${c.collected} crates from your farm today, 27 Sep 2026.\\n\\nThe produce was received without sorting by type.\\n${c.pending} crates are still pending and will be collected later.\\n\\nThe collected crates will be sent to ${c.wholesaler}, where the produce will be sorted according to their requirements.\\n\\nThank you,\\nShivam`;return <PageHeader title="WhatsApp" subtitle="Review a collection message before sending"><div className="mx-auto max-w-xl"><Card><Field label="Collection"><select value={id} onChange={e=>setId(Number(e.target.value))} className="input">{collections.map(x=><option value={x.id} key={x.id}>{x.farmer} · {x.date}</option>)}</select></Field><div className="mt-4 rounded-2xl bg-[#f0f7ee] p-4"><p className="mb-2 text-xs font-bold text-leaf-700">MESSAGE PREVIEW</p><pre className="whitespace-pre-wrap font-sans text-sm leading-6 text-gray-700">{message}</pre></div><button onClick={()=>window.open(`https://wa.me/${getPhone(c.farmer) || ""}?text=${encodeURIComponent(message)}`,"_blank")} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#168b43] py-3 font-bold text-white"><MessageCircle size={18}/> Open WhatsApp</button></Card></div></PageHeader>}
function getPhone(name:string){return ({ "Ramesh Singh":"919876543210","Suresh Patil":"919823012345","Mohan Yadav":"919765432109"} as any)[name]||""}

function ReportsPage({collections}:{collections:Collection[]}){const total=collections.reduce((a,c)=>a+c.collected,0),pending=collections.reduce((a,c)=>a+c.pending,0),sorted=collections.filter(c=>c.sorted).length;const data=collections.map(c=>({name:c.farmer.split(" ")[0],collected:c.collected,pending:c.pending}));return <PageHeader title="Reports & analytics" subtitle="Operational overview without costing"><div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Metric title="Total collected" value={String(total)} sub="crates"/><Metric title="Pending" value={String(pending)} sub="crates"/><Metric title="Sorted" value={String(sorted)} sub="collections"/><Metric title="Unsorted" value={String(collections.length-sorted)} sub="collections"/></div><div className="mt-6 grid gap-6 lg:grid-cols-2"><Card><h3 className="font-bold">Collected vs pending</h3><p className="mt-1 text-xs text-gray-500">Demo data from recorded collections.</p><div className="mt-5 h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="collected" fill="#32783d" radius={[6,6,0,0]}/><Bar dataKey="pending" fill="#d8a52b" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div></Card><Card><h3 className="font-bold">Collection completion</h3><p className="mt-1 text-xs text-gray-500">Given vs collected across current demo records.</p><div className="mt-5 h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Line type="monotone" dataKey="collected" stroke="#32783d" strokeWidth={3}/></LineChart></ResponsiveContainer></div></Card></div><div className="mt-6"><Card><h3 className="font-bold">Available reports</h3><div className="mt-3 grid gap-2 sm:grid-cols-2">{["Farmer-wise collection","Wholesaler destination","Sorted vs unsorted","Pending collections","Crate type collection","Collection history"].map(x=><button key={x} className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-semibold hover:bg-gray-50">{x}<ChevronRight size={16}/></button>)}</div></Card></div></PageHeader>}

function SettingsPage(){return <PageHeader title="Settings" subtitle="Website preferences and business setup"><div className="max-w-2xl space-y-3"><Setting title="Business profile" text="Shivam · Farmer collection operations"/><Setting title="WhatsApp" text="Connect WhatsApp Business when API setup begins"/><Setting title="Data & database" text="Frontend demo mode — Supabase connection is not active yet"/><Setting title="Security" text="Authentication will be enabled after the frontend flow is finalized"/></div></PageHeader>}
function Setting({title,text}:{title:string;text:string}){return <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50"><Settings size={18}/></div><div className="flex-1"><b className="text-sm">{title}</b><p className="mt-1 text-xs text-gray-500">{text}</p></div><ChevronRight size={17} className="text-gray-400"/></div>}

function PageHeader({title,subtitle,action,children}:{title:string;subtitle?:string;action?:React.ReactNode;children:React.ReactNode}){return <div className="mx-auto max-w-6xl"><div className="mb-5 flex items-end justify-between gap-4"><div><h1 className="text-2xl font-bold">{title}</h1>{subtitle&&<p className="mt-1 text-sm text-gray-500">{subtitle}</p>}</div>{action}</div>{children}</div>}
function Card({children}:{children:React.ReactNode}){return <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">{children}</div>}
function Field({label,children,className=""}:{label:string;children:React.ReactNode;className?:string}){return <label className={`block ${className}`}><span className="mb-1.5 block text-xs font-bold text-gray-600">{label}</span>{children}</label>}
function Info({label,value,green,warning}:{label:string;value:string;green?:boolean;warning?:boolean}){return <div className={`rounded-xl p-3 ${warning?"bg-amber-50":"bg-gray-50"}`}><p className="text-[10px] text-gray-500">{label}</p><p className={`mt-1 text-sm font-bold ${green?"text-leaf-700":warning?"text-amber-800":""}`}>{value}</p></div>}
function Empty({title,text}:{title:string;text:string}){return <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center"><p className="font-bold">{title}</p><p className="mt-1 text-sm text-gray-500">{text}</p></div>}
function FormModal({title,close,onSave,fields}:{title:string;close:()=>void;onSave:(x:any)=>void;fields:string[]}){const [v,setV]=useState<any>({});return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-0 sm:items-center sm:p-4"><div className="w-full max-w-md rounded-t-3xl bg-white p-5 sm:rounded-3xl"><div className="flex items-center justify-between"><h3 className="font-bold">{title}</h3><button onClick={close}><X/></button></div>{fields.map(f=><Field key={f} label={f[0].toUpperCase()+f.slice(1)} className="mt-4"><input className="input w-full rounded-xl border border-gray-200 px-3 py-3 outline-none focus:border-leaf-500" value={v[f]||""} onChange={e=>setV({...v,[f]:e.target.value})}/></Field>)}<button onClick={()=>onSave(v)} className="mt-5 w-full rounded-xl bg-leaf-700 py-3 font-bold text-white">Save</button></div></div>}
function QuickModal({close,router}:{close:()=>void;router:any}){return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-4 sm:items-center"><div className="w-full max-w-md rounded-3xl bg-white p-5"><div className="flex items-center justify-between"><b>Quick action</b><button onClick={close}><X/></button></div><div className="mt-4 grid gap-2"><button onClick={()=>router.push("/give-crates")} className="rounded-xl bg-gray-50 p-3 text-left font-bold">Give crates</button><button onClick={()=>router.push("/collect")} className="rounded-xl bg-gray-50 p-3 text-left font-bold">Collect crates</button></div></div></div>}
