// API utility for backend requests
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

async function request<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
        next: { revalidate: 0 }, // disables Next.js cache for API calls
    });
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res.json();
}

export const api = {
    // Users
    getUsers: () => request("/users/"),
    createUser: (data: any) =>
        request("/users/", { method: "POST", body: JSON.stringify(data) }),

    // Cards
    getCards: () => request("/cards/"),
    createCard: (data: any) =>
        request("/cards/", { method: "POST", body: JSON.stringify(data) }),

    // Transactions
    getTransactions: () => request("/transactions/"),
    createTransaction: (data: any) =>
        request("/transactions/", { method: "POST", body: JSON.stringify(data) }),
};
