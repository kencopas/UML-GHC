import { useEffect, useState } from "react";
import { api } from "../api";
import { CreditCard, CreditCardCreate } from "../types";

export default function CardsPage() {
    const [cards, setCards] = useState<CreditCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<CreditCardCreate>({
        card_number: "",
        expiration: "",
        cvv: "",
        limit: 0,
    });
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        api.getCards()
            .then(setCards)
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
            const card = await api.createCard({ ...form, limit: Number(form.limit) });
            setCards((prev) => [...prev, card]);
            setForm({ card_number: "", expiration: "", cvv: "", limit: 0 });
        } catch (e: any) {
            setError(e.message);
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto w-full">
            <h2 className="text-2xl font-bold mb-6">Credit Cards</h2>
            <form onSubmit={handleSubmit} className="mb-8 bg-zinc-900 p-6 rounded-lg shadow-lg flex flex-col gap-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <input
                        name="card_number"
                        value={form.card_number}
                        onChange={handleChange}
                        placeholder="Card Number"
                        className="px-4 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        required
                        minLength={16}
                        maxLength={16}
                    />
                    <input
                        name="expiration"
                        value={form.expiration}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="px-4 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        required
                    />
                    <input
                        name="cvv"
                        value={form.cvv}
                        onChange={handleChange}
                        placeholder="CVV"
                        className="px-4 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        required
                        minLength={3}
                        maxLength={4}
                    />
                    <input
                        name="limit"
                        value={form.limit}
                        onChange={handleChange}
                        placeholder="Limit"
                        type="number"
                        className="px-4 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        required
                        min={0}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-semibold py-2 px-6 rounded transition-colors disabled:opacity-50"
                    disabled={creating}
                >
                    {creating ? "Creating..." : "Add Card"}
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
                                <th className="py-3 px-4">Number</th>
                                <th className="py-3 px-4">Expiration</th>
                                <th className="py-3 px-4">CVV</th>
                                <th className="py-3 px-4">Limit</th>
                                <th className="py-3 px-4">Balance</th>
                                <th className="py-3 px-4">Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cards.map((card) => (
                                <tr key={card.id} className="border-b border-zinc-800 hover:bg-zinc-800 transition-colors">
                                    <td className="py-2 px-4">{card.id}</td>
                                    <td className="py-2 px-4 font-mono">{card.card_number}</td>
                                    <td className="py-2 px-4">{card.expiration}</td>
                                    <td className="py-2 px-4">{card.cvv}</td>
                                    <td className="py-2 px-4">${card.limit.toLocaleString()}</td>
                                    <td className="py-2 px-4">${card.balance.toLocaleString()}</td>
                                    <td className="py-2 px-4">{card.active ? "Yes" : "No"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
