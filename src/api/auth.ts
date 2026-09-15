import { api } from "./client";
import type { User } from "@/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/api/v1/auth/login", payload);
  return data;
}

export async function logoutRequest(): Promise<void> {
  await api.post("/api/v1/auth/logout");
}

export interface SignupPayload {
  businessName: string;
  adminName: string;
  email: string;
  password: string;
}

// Creates a new Client + its first Client Admin user in one step.
export async function signup(payload: SignupPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/api/v1/auth/signup", payload);
  return data;
}

export async function forgotPassword(email: string): Promise<void> {
  await api.post("/api/v1/auth/forgot-password", { email });
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await api.post("/api/v1/auth/reset-password", { token, newPassword });
}

// Restore auth from refresh token cookie on app load
export async function restoreAuth(): Promise<LoginResponse | null> {
  try {
    const { data } = await api.post<LoginResponse>("/api/v1/auth/refresh", {});
    return data;
  } catch (error) {
    return null;
  }
}
