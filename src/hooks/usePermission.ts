import { useAuthStore } from "@/store/authStore";
import type { Role } from "@/types";

export function usePermission() {
  const user = useAuthStore((s) => s.user);

  function hasRole(...roles: Role[]) {
    return !!user && roles.includes(user.role);
  }

  function can(permission: string) {
    if (!user) return false;
    if (user.role === "super_admin" || user.role === "client_admin") return true;
    return user.permissions.includes(permission);
  }

  return { hasRole, can };
}
