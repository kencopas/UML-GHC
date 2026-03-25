import { useEffect, useState } from "react";
import { api } from "../api";
import { User, UserCreate } from "../types";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<UserCreate>({ name: "", email: "", password: "" });
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        api.getUsers()
            .then(setUsers)
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
            const user = await api.createUser(form);
            setUsers((prev) => [...prev, user]);
            setForm({ name: "", email: "", password: "" });
        } catch (e: any) {
            setError(e.message);
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto w-full">
            <h2 className="text-2xl font-bold mb-6">Users</h2>
            <form onSubmit={handleSubmit} className="mb-8 bg-zinc-900 p-6 rounded-lg shadow-lg flex flex-col gap-4">
                <div className="flex gap-4">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="flex-1 px-4 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        required
                    />
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        type="email"
                        className="flex-1 px-4 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        required
                    />
                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        type="password"
                        className="flex-1 px-4 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-semibold py-2 px-6 rounded transition-colors disabled:opacity-50"
                    disabled={creating}
                >
                    {creating ? "Creating..." : "Add User"}
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
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-zinc-800 hover:bg-zinc-800 transition-colors">
                                    <td className="py-2 px-4">{user.id}</td>
                                    <td className="py-2 px-4">{user.name}</td>
                                    <td className="py-2 px-4">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
