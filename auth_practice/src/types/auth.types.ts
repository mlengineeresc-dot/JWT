
export interface User {
    id: string,
    email: string,
    name: string,
    password: string,
    role: "admin" | "user"
}

export interface LoginCredentials {
    email: string,
    password: string
}

export interface RegistrationCredentials {
    name: string,
    email: string,
    password: string,
    confirm_password: string
}

export interface AuthContextType {
    user: Omit<User, 'password'> | null,
    isLoading: boolean,
    error: string | null

    login: (credential: LoginCredentials) => Promise<void>
    register: (credential: RegistrationCredentials) => Promise<void>
    logout: (expired?: boolean) => void
    clearError: () => void

}

export interface AuthResponse {
    user: Omit<User, 'password'>,
    token: string
}