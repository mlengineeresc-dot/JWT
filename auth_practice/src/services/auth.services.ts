import type {
  LoginCredentials,
  RegistrationCredentials,
  User,
  AuthResponse,
} from "../types/auth.types";

const API_URL = "http://localhost:3000/users";
const SIMULATE_DELAY = 800;

export const loginAPI = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_DELAY));

  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const users: User[] = await response.json();

  const user = users.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const expiresIn = 2 * 60 * 1000;
  const expiryTime = Date.now() + expiresIn;
  const token = `mock_jwt_token_${user.id}_${expiryTime}`;

  localStorage.setItem("auth_token", token);

  const { password, ...remaining_details } = user;
  return {
    user: remaining_details,
    token,
  };
};

export const registerAPI = async (
  credentials: RegistrationCredentials
): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_DELAY));

  if (credentials.password !== credentials.confirm_password) {
    throw new Error("Password does not match");
  }

  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to connect to backend");
  }
  const users: User[] = await response.json();

  const existingUser = users.find((u) => u.email === credentials.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  if (credentials.password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const newUser = {
    email: credentials.email,
    name: credentials.name,
    password: credentials.password,
    role: "user" as const 
  };

  const createResponse = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!createResponse.ok) {
    throw new Error("Failed to create user");
  }

  const createdUser: User = await createResponse.json();

  const expiresIn = 2 * 60 * 1000;
  const expiryTime = Date.now() + expiresIn;
  const token = `mock_jwt_token_${createdUser.id}_${expiryTime}`;

  localStorage.setItem("auth_token", token);

  const { password, ...userWithoutPassword } = createdUser;
  return {
    user: userWithoutPassword,
    token,
  };
};

export const logoutAPI = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  localStorage.removeItem("auth_token");
};

export const validateTokenAPI = async (): Promise<Omit<User, 'password'> | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const token = localStorage.getItem("auth_token");

  if (!token) {
    return null;
  }

  const parts = token.split("_");
  const userId = parts[3];
  const expiryTime = Number(parts[4]);

  if (expiryTime && Date.now() > expiryTime) {
    console.log("Token expired");
    localStorage.removeItem("auth_token");
    return null;
  }

  const response = await fetch(`${API_URL}/${userId}`);
  if (!response.ok) {
    localStorage.removeItem("auth_token");
    return null;
  }

  const user: User = await response.json();

  if (!user) {
    localStorage.removeItem("auth_token");
    return null;
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};