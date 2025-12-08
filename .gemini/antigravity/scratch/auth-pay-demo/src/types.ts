export interface User {
    id: string;
    email: string;
    password?: string; // In real app, don't store plain text
    name: string;
}

export interface LoginCredentials {
    email: string;
    password?: string;
}

export interface RegisterCredentials {
    email: string;
    password?: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    currency: string;
}

export interface Order {
    id: string;
    userId: string;
    productId: string;
    amount: number;
    status: 'pending' | 'success' | 'failed';
    razorpayOrderId?: string;
    paymentId?: string;
    createdAt: string;
}
