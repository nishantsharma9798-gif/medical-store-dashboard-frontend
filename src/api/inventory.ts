import { api } from "./client";
import type { InventoryTransaction, TransactionType } from "@/types";

export interface CreateTransactionPayload {
  medicineId: string;
  type: TransactionType;
  quantity: number;
  unitPrice: number;
  supplierId?: string;
}

export async function getTransactions(params?: {
  from?: string;
  to?: string;
  medicineId?: string;
}): Promise<InventoryTransaction[]> {
  const { data } = await api.get("/api/v1/inventory/transactions", { params });
  return data;
}

export async function createTransaction(
  payload: CreateTransactionPayload
): Promise<InventoryTransaction> {
  const { data } = await api.post("/api/v1/inventory/transactions", payload);
  return data;
}
