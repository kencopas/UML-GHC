// TypeScript types for API models
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface UserCreate {
    name: string;
    email: string;
    password: string;
}

export interface CreditCard {
    id: number;
    card_number: string;
    expiration: string;
    cvv: string;
    limit: number;
    balance: number;
    active: boolean;
}

export interface CreditCardCreate {
    card_number: string;
    expiration: string;
    cvv: string;
    limit: number;
}

export interface Transaction {
    id: number;
    amount: number;
    merchant: string;
    timestamp: string;
    status: string;
}

export interface TransactionCreate {
    amount: number;
    merchant: string;
}
