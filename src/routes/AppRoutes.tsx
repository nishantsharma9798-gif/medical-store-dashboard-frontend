import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { AppShell } from "@/components/shared/AppShell";

import HomePage from "@/features/home/HomePage";
import LoginPage from "@/features/auth/LoginPage";
import SignupPage from "@/features/auth/SignupPage";
import ForgotPasswordPage from "@/features/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/ResetPasswordPage";
import ClientListPage from "@/features/admin/ClientListPage";
import DashboardPage from "@/features/dashboard/DashboardPage";
import UsersPage from "@/features/dashboard/UsersPage";
import InventoryListPage from "@/features/medical/inventory/InventoryListPage";
import ScanEntryPage from "@/features/medical/inventory/ScanEntryPage";
import SuppliersPage from "@/features/medical/suppliers/SuppliersPage";
import AlertsPage from "@/features/medical/alerts/AlertsPage";
import InvoicesPage from "@/features/medical/invoices/InvoicesPage";
import InvoiceDetailPage from "@/features/medical/invoices/InvoiceDetailPage";
import ProfitLossPage from "@/features/medical/invoices/ProfitLossPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Super Admin — kept minimal for now, not a current priority */}
      <Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
        <Route path="/super-admin/clients" element={<ClientListPage />} />
      </Route>

      {/* Client Admin + Staff */}
      <Route element={<ProtectedRoute allowedRoles={["client_admin", "staff"]} />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/users" element={<UsersPage />} />

          <Route path="/medical/inventory" element={<InventoryListPage />} />
          <Route path="/medical/inventory/scan" element={<ScanEntryPage />} />
          <Route path="/medical/suppliers" element={<SuppliersPage />} />
          <Route path="/medical/alerts" element={<AlertsPage />} />
          <Route path="/medical/invoices" element={<InvoicesPage />} />
          <Route path="/medical/invoices/:id" element={<InvoiceDetailPage />} />
          <Route path="/medical/reports/profit-loss" element={<ProfitLossPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
