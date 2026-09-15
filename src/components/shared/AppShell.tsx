import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/medical/inventory", label: "Inventory", icon: "📦" },
  { to: "/medical/suppliers", label: "Suppliers", icon: "🏢" },
  { to: "/medical/alerts", label: "Alerts", icon: "🔔" },
  { to: "/medical/invoices", label: "Invoices", icon: "📄" },
  { to: "/medical/reports/profit-loss", label: "Reports", icon: "📊" },
];

export function AppShell() {
  const { user } = useAuth();
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <aside className="w-64 shrink-0 border-r border-neutral-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-neutral-100 px-6 py-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="text-2xl">💊</div>
            <h1 className="text-xl font-bold text-neutral-900">MedStock</h1>
          </div>
          <p className="text-xs text-neutral-500">Professional Pharmacy Management</p>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 bg-brand-50">
          <p className="text-sm font-semibold text-neutral-900">{user?.name}</p>
          <p className="text-xs text-neutral-600">{user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-4 flex-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-brand-100 text-brand-700 shadow-sm"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                )
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-neutral-100 p-4">
          <button
            onClick={logout}
            className="w-full px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-neutral-200 bg-white shadow-xs">
          <div className="px-8 py-4">
            <p className="text-xs text-neutral-500">Medical Store Management System</p>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
