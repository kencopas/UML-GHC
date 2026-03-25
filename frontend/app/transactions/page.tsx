import { useEffect, useState } from "react";
import { api } from "../api";
import { Transaction, TransactionCreate } from "../types";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<TransactionCreate>({ amount: 0, merchant: "" });
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        api.getTransactions()
            .then(setTransactions)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        setError(null);
        try {
            const tx = await api.createTransaction({ ...form, amount: Number(form.amount) });
            setTransactions((prev) => [...prev, tx]);
            setForm({ amount: 0, merchant: "" });
        } catch (e: any) {
            setError(e.message);
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto w-full">
            <h2 className="text-2xl font-bold mb-6">Transactions</h2>
            <form onSubmit={handleSubmit} className="mb-8 bg-zinc-900 p-6 rounded-lg shadow-lg flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="Amount"
                        type="number"
                        className="px-4 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        required
                        min={0}
                    />
                    <input
                        name="merchant"
                        value={form.merchant}
                        onChange={handleChange}
                        placeholder="Merchant"
                        className="px-4 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-semibold py-2 px-6 rounded transition-colors disabled:opacity-50"
                    disabled={creating}
                >
                    {creating ? "Creating..." : "Add Transaction"}
                </button>
                {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
            </form>
            <div className="bg-zinc-900 rounded-lg shadow-lg overflow-x-auto">
                {loading ? (
                    <div className="p-8 text-center text-zinc-400">Loading...</div>
                ) : (
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="border-b border-zinc-800">
                                <th className="py-3 px-4">ID</th>
                                <th className="py-3 px-4">Amount</th>
                                <th className="py-3 px-4">Merchant</th>
                                <th className="py-3 px-4">Timestamp</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="border-b border-zinc-800 hover:bg-zinc-800 transition-colors">
                                    <td className="py-2 px-4">{tx.id}</td>
                                    <td className="py-2 px-4">${tx.amount.toLocaleString()}</td>
                                    <td className="py-2 px-4">{tx.merchant}</td>
                                    <td className="py-2 px-4">{new Date(tx.timestamp).toLocaleString()}</td>
                                    <td className="py-2 px-4">{tx.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
