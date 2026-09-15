import { api } from "./client";
import type { DemandAlert } from "@/types";

export async function getAlerts(): Promise<DemandAlert[]> {
  const { data } = await api.get("/api/v1/alerts");
  return data;
}
