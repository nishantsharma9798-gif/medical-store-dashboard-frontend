export type Role = "super_admin" | "client_admin" | "staff";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  clientId: string | null;
  permissions: string[];
}

export interface Medicine {
  id: string;
  name: string;
  barcode: string;
  gstPercent: number;
  thresholdQty: number;
  currentStock: number;
  expiryDate: string | null;
}

export type TransactionType = "purchase" | "sale";

export interface InventoryTransaction {
  id: string;
  medicineId: string;
  medicineName: string;
  type: TransactionType;
  quantity: number;
  unitPrice: number;
  supplierId?: string;
  invoiceId?: string;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  whatsappNumber: string;
  mappedMedicineIds: string[];
}

export type OrderStatus = "pending" | "confirmed" | "rejected";

export interface SupplierOrder {
  id: string;
  medicineId: string;
  medicineName: string;
  supplierId: string;
  supplierName: string;
  requestedQty: number;
  status: OrderStatus;
  createdAt: string;
}

export interface InvoiceItem {
  medicineId: string;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  gstPercent: number;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  type: TransactionType;
  partyName: string;
  subtotal: number;
  gstAmount: number;
  total: number;
  pdfUrl: string;
  createdAt: string;
  items: InvoiceItem[];
}

export interface DemandAlert {
  id: string;
  medicineId: string;
  medicineName: string;
  predictedDemand: number;
  currentStock: number;
  suggestedOrderQty: number;
}

export interface ProfitLossRow {
  medicineId: string;
  medicineName: string;
  supplierName: string;
  totalPurchaseCost: number;
  totalSaleRevenue: number;
  totalTaxPaid: number;
  profit: number;
}
