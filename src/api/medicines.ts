import { api } from "./client";
import type { Medicine } from "@/types";

export async function getMedicines(): Promise<Medicine[]> {
  const { data } = await api.get("/api/v1/medicines");
  return data;
}

export async function getMedicineByBarcode(barcode: string): Promise<Medicine> {
  const { data } = await api.get(`/api/v1/medicines/${barcode}`);
  return data;
}

export async function createMedicine(payload: Partial<Medicine>): Promise<Medicine> {
  const { data } = await api.post("/api/v1/medicines", payload);
  return data;
}
