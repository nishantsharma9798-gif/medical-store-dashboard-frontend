import { api } from "./client";
import type { Supplier, SupplierOrder } from "@/types";

export async function getSuppliers(): Promise<Supplier[]> {
  const { data } = await api.get("/api/v1/suppliers");
  return data;
}

export async function createSupplier(payload: Partial<Supplier>): Promise<Supplier> {
  const { data } = await api.post("/api/v1/suppliers", payload);
  return data;
}

export async function getOrders(status?: string): Promise<SupplierOrder[]> {
  const { data } = await api.get("/api/v1/orders", { params: { status } });
  return data;
}

export async function createOrder(payload: {
  medicineId: string;
  supplierId: string;
  requestedQty: number;
}): Promise<SupplierOrder> {
  const { data } = await api.post("/api/v1/orders", payload);
  return data;
}
