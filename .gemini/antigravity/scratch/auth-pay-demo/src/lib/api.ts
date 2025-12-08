import { api } from './axios';
import type { User, LoginCredentials, RegisterCredentials } from '../types';

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<User> => {
        const { data } = await api.get<User[]>(`/users?email=${credentials.email}`);
        const user = data[0];

        if (!user || user.password !== credentials.password) {
            throw new Error('Invalid credentials');
        }
        return user;
    },

    register: async (credentials: RegisterCredentials): Promise<User> => {
        const { data: existing } = await api.get<User[]>(`/users?email=${credentials.email}`);
        if (existing.length > 0) {
            throw new Error('User already exists');
        }

        const newUser = {
            ...credentials,
            id: crypto.randomUUID(),
            role: 'user',
        };

        const { data } = await api.post<User>('/users', newUser);
        return data;
    }
};
