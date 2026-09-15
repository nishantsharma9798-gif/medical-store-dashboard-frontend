import { api } from "./client";
import type { Invoice, ProfitLossRow } from "@/types";

export async function getInvoices(params?: {
  from?: string;
  to?: string;
  type?: string;
  party?: string;
}): Promise<Invoice[]> {
  const { data } = await api.get("/api/v1/invoices", { params });
  return data;
}

export async function getInvoiceById(id: string): Promise<Invoice> {
  const { data } = await api.get(`/api/v1/invoices/${id}`);
  return data;
}

export async function shareInvoiceOnWhatsApp(id: string): Promise<void> {
  await api.post(`/api/v1/invoices/${id}/share-whatsapp`);
}

export async function uploadPurchaseInvoice(file: File): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);
  await api.post("/api/v1/invoices/attachments", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function getProfitLossReport(params: {
  from: string;
  to: string;
  groupBy?: "medicine" | "supplier" | "category";
}): Promise<ProfitLossRow[]> {
  const { data } = await api.get("/api/v1/reports/profit-loss", { params });
  return data;
}
