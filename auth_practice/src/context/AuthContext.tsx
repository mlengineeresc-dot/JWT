import { createContext, useState, useEffect, type ReactNode, useContext } from "react";
import type {
  User,
  LoginCredentials,
  RegistrationCredentials,
  AuthContextType,
} from "../types/auth.types";
import {
  loginAPI,
  registerAPI,
  validateTokenAPI,
  logoutAPI,
} from "../services/auth.services";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true);
        const validatedUser = await validateTokenAPI();

        if (validatedUser) {
          setUser(validatedUser);
          console.log("Session restored:", validatedUser.email);

          // Schedule auto-logout
          const token = localStorage.getItem("auth_token");
          if (token) {
            const parts = token.split("_");
            const expiryTime = Number(parts[4]);
            if (expiryTime > Date.now()) {
              const timeLeft = expiryTime - Date.now();
              console.log(`Auto-logout scheduled in ${timeLeft / 1000} seconds`);
              setTimeout(() => {
                logout(true); // pass true for "expired"
              }, timeLeft);
            }
          }

        } else {
          console.log("No valid session found");
        }
      } catch (err) {
        console.error("Session validation failed:", err);
        setError("Failed to restore session");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("🔐 Attempting login for:", credentials.email);

      const response = await loginAPI(credentials);

      setUser(response.user);

      // Schedule auto-logout
      const token = response.token;
      const parts = token.split("_");
      const expiryTime = Number(parts[4]);
      if (expiryTime > Date.now()) {
        const timeLeft = expiryTime - Date.now();
        console.log(`Auto-logout scheduled in ${timeLeft / 1000} seconds`);
        setTimeout(() => {
          logout(true);
        }, timeLeft);
      }

      console.log(" Login successful:", response.user.email);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      console.error(" Login failed:", errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegistrationCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log(" Attempting registration for:", credentials.email);

      const response = await registerAPI(credentials);

      setUser(response.user);

      console.log(" Registration successful:", response.user.email);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      console.error(" Registration failed:", errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (expired: boolean = false) => {
    try {
      console.log(" Logging out:", user?.email);

      await logoutAPI();

      setUser(null);
      if (expired) {
        setError("Session expired. Please login again.");
      } else {
        setError(null);
      }

      console.log(" Logout successful");
    } catch (err) {
      console.error(" Logout failed:", err);
      setUser(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
