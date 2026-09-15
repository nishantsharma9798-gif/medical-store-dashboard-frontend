import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = !!user;
  return { user, isAuthenticated };
}
