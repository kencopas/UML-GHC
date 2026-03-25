import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="h-full w-56 bg-zinc-900 text-zinc-100 flex flex-col py-8 px-4 border-r border-zinc-800">
            <h1 className="text-2xl font-bold mb-8 tracking-tight text-emerald-400">APNorman Case</h1>
            <nav className="flex flex-col gap-4">
                <Link href="/users" className="hover:text-emerald-400 transition-colors">Users</Link>
                <Link href="/cards" className="hover:text-emerald-400 transition-colors">Cards</Link>
                <Link href="/transactions" className="hover:text-emerald-400 transition-colors">Transactions</Link>
            </nav>
            <div className="mt-auto text-xs text-zinc-500 pt-8">Credit Card API Demo</div>
        </aside>
    );
}
