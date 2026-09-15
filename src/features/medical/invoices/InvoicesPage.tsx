import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInvoices, uploadPurchaseInvoice } from "@/api/invoices";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function InvoicesPage() {
  const [type, setType] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ["invoices", type],
    queryFn: () => getInvoices({ type: type || undefined }),
  });

  const uploadMutation = useMutation({
    mutationFn: uploadPurchaseInvoice,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["invoices"] }),
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Invoices</h1>
        <div className="flex items-center gap-2">
          <select
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All types</option>
            <option value="sale">Sale</option>
            <option value="purchase">Purchase</option>
          </select>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadMutation.mutate(file);
            }}
          />
          <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
            {uploadMutation.isPending ? "Uploading..." : "Upload supplier invoice"}
          </Button>
        </div>
      </div>

      <p className="mb-4 text-xs text-gray-500">
        Invoices received on WhatsApp from suppliers are captured here automatically. Use "Upload supplier
        invoice" only if a supplier sent it outside WhatsApp.
      </p>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading invoices...</p>
      ) : (
        <DataTable
          keyExtractor={(row) => row.id}
          rows={invoices}
          emptyMessage="No invoices yet."
          columns={[
            { header: "Invoice #", accessor: (row) => row.invoiceNo },
            { header: "Party", accessor: (row) => row.partyName },
            {
              header: "Type",
              accessor: (row) => <Badge tone={row.type === "sale" ? "success" : "neutral"}>{row.type}</Badge>,
            },
            { header: "GST", accessor: (row) => formatCurrency(row.gstAmount) },
            { header: "Total", accessor: (row) => formatCurrency(row.total) },
            { header: "Date", accessor: (row) => formatDate(row.createdAt) },
            {
              header: "",
              accessor: (row) => (
                <Link to={`/medical/invoices/${row.id}`} className="text-brand-600 hover:underline">
                  View
                </Link>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
