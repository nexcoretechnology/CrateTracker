"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight, Bell, Boxes, ChevronRight, ClipboardList, LayoutDashboard,
  Menu, MessageCircle, Plus, Search, Settings, Truck, UserRound, Users,
  X
} from "lucide-react";

type Activity = {
  farmer: string;
  detail: string;
  time: string;
  amount: number;
  sorted: boolean;
};

const activities: Activity[] = [
  { farmer: "Ramesh Singh", detail: "80 crates collected", time: "10:40 AM", amount: 80, sorted: true },
  { farmer: "Suresh Patil", detail: "50 crates collected", time: "09:55 AM", amount: 50, sorted: false },
  { farmer: "Mohan Yadav", detail: "90 crates given", time: "08:35 AM", amount: 90, sorted: false }
];

export default function Dashboard() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => activities.filter(a => a.farmer.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <main className="min-h-screen bg-[#f6f8f5]">
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <div>
            <div className="text-xs font-medium text-gray-500">Good morning</div>
            <h1 className="text-lg font-bold text-gray-900">Shivam</h1>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Notifications" className="rounded-full p-2 hover:bg-gray-100">
              <Bell size={20} />
            </button>
            <button aria-label="Menu" onClick={() => setMenu(true)} className="rounded-xl border border-gray-200 p-2 md:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-28 pt-5 md:px-8 md:pb-8">
        <section className="mb-5 rounded-3xl bg-leaf-700 p-5 text-white shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-green-100">Today&apos;s operations</p>
              <h2 className="mt-1 text-2xl font-bold">Keep collections moving.</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-green-100">
                Track crates given to farmers, collect ready produce, and send the collection summary on WhatsApp.
              </p>
            </div>
            <div className="hidden rounded-2xl bg-white/10 p-3 sm:block">
              <Boxes size={28} />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <QuickButton icon={<Plus size={18}/>} label="Give crates" />
            <QuickButton icon={<Truck size={18}/>} label="Collect crates" />
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Metric title="Given today" value="90" sub="crates" />
          <Metric title="Collected today" value="130" sub="crates" />
          <Metric title="Pending" value="40" sub="crates" />
          <Metric title="Farmers" value="28" sub="active" />
        </div>

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold">Quick actions</h2>
            <button className="text-sm font-semibold text-leaf-700">View all</button>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Action icon={<Users size={20}/>} title="Farmers" text="Manage farmer records" />
            <Action icon={<ClipboardList size={20}/>} title="Collections" text="Record a pickup" />
            <Action icon={<Truck size={20}/>} title="Wholesalers" text="Destinations" />
            <Action icon={<MessageCircle size={20}/>} title="WhatsApp" text="Send summaries" />
          </div>
        </section>

        <section className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold">Today&apos;s activity</h2>
            <button className="flex items-center gap-1 text-sm font-semibold text-leaf-700">History <ArrowRight size={15}/></button>
          </div>
          <div className="mb-3 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2.5">
            <Search size={18} className="text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search farmer"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {filtered.map((a, i) => (
              <div key={a.farmer} className={`flex items-center gap-3 p-4 ${i ? "border-t border-gray-100" : ""}`}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf-50 text-sm font-bold text-leaf-700">
                  {a.farmer.split(" ").map(x => x[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold">{a.farmer}</p>
                    {a.sorted && <span className="rounded-full bg-leaf-50 px-2 py-0.5 text-[10px] font-semibold text-leaf-700">Sorted</span>}
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">{a.detail} · {a.time}</p>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-amber-900">Pending collections</p>
              <p className="mt-1 text-xs text-amber-800">2 farmers have crates still to be collected.</p>
            </div>
            <button className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-amber-900 shadow-sm">Open</button>
          </div>
        </section>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-lg justify-around">
          <NavItem icon={<LayoutDashboard size={19}/>} label="Home" active />
          <NavItem icon={<Users size={19}/>} label="Farmers" />
          <NavItem icon={<Boxes size={19}/>} label="Collections" />
          <NavItem icon={<Truck size={19}/>} label="Reports" />
          <NavItem icon={<Settings size={19}/>} label="Settings" />
        </div>
      </nav>

      {menu && (
        <div className="fixed inset-0 z-50 bg-black/30 md:hidden" onClick={() => setMenu(false)}>
          <aside className="ml-auto h-full w-[82%] max-w-sm bg-white p-5 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Business</p>
                <h2 className="font-bold">Shivam Collection</h2>
              </div>
              <button onClick={() => setMenu(false)} className="rounded-xl p-2 hover:bg-gray-100"><X size={20}/></button>
            </div>
            <div className="mt-6 space-y-2">
              {["Farmers", "Wholesalers", "Crate Types", "Give Crates", "Collections", "Pending Collections", "Collection History", "Reports & Analytics", "WhatsApp", "Settings"].map(item => (
                <button key={item} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-medium hover:bg-gray-50">
                  <span>{item}</span><ChevronRight size={16} className="text-gray-400"/>
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}

function Metric({ title, value, sub }: { title: string; value: string; sub: string }) {
  return <div className="rounded-2xl border border-gray-200 bg-white p-4">
    <p className="text-xs text-gray-500">{title}</p>
    <div className="mt-1 flex items-baseline gap-1"><span className="text-2xl font-bold">{value}</span><span className="text-xs text-gray-500">{sub}</span></div>
  </div>;
}

function QuickButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <button className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-leaf-700 shadow-sm">{icon}{label}</button>;
}

function Action({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <button className="rounded-2xl border border-gray-200 bg-white p-4 text-left transition hover:border-leaf-200 hover:bg-leaf-50">
    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-leaf-50 text-leaf-700">{icon}</div>
    <p className="text-sm font-bold">{title}</p>
    <p className="mt-1 text-xs leading-5 text-gray-500">{text}</p>
  </button>;
}

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return <button className={`flex min-w-14 flex-col items-center gap-1 px-2 py-2 text-[10px] font-semibold ${active ? "text-leaf-700" : "text-gray-500"}`}>
    {icon}{label}
  </button>;
}