import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfitLossReport } from "@/api/invoices";
import { DataTable } from "@/components/shared/DataTable";
import { StatCard } from "@/components/shared/StatCard";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";

function lastNDaysISO(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

export default function ProfitLossPage() {
  const [from, setFrom] = useState(lastNDaysISO(30));
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10));

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["profit-loss", from, to],
    queryFn: () => getProfitLossReport({ from, to, groupBy: "medicine" }),
  });

  const totalProfit = rows.reduce((sum, r) => sum + r.profit, 0);
  const totalTax = rows.reduce((sum, r) => sum + r.totalTaxPaid, 0);
  const totalRevenue = rows.reduce((sum, r) => sum + r.totalSaleRevenue, 0);

  return (
    <div className="p-6">
      <h1 className="mb-1 text-xl font-semibold">Profit &amp; Loss</h1>
      <p className="mb-6 text-sm text-gray-500">Medicine-wise and supplier-wise breakdown</p>

      <div className="mb-6 flex gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">From</label>
          <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">To</label>
          <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total revenue" value={formatCurrency(totalRevenue)} />
        <StatCard label="Total tax paid" value={formatCurrency(totalTax)} />
        <StatCard
          label="Net profit"
          value={formatCurrency(totalProfit)}
          tone={totalProfit >= 0 ? "success" : "danger"}
        />
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading report...</p>
      ) : (
        <DataTable
          keyExtractor={(row) => row.medicineId}
          rows={rows}
          emptyMessage="No transactions in this date range."
          columns={[
            { header: "Medicine", accessor: (row) => row.medicineName },
            { header: "Supplier", accessor: (row) => row.supplierName },
            { header: "Purchase cost", accessor: (row) => formatCurrency(row.totalPurchaseCost) },
            { header: "Sale revenue", accessor: (row) => formatCurrency(row.totalSaleRevenue) },
            { header: "Tax paid", accessor: (row) => formatCurrency(row.totalTaxPaid) },
            {
              header: "Profit",
              accessor: (row) => (
                <span className={row.profit >= 0 ? "text-green-600" : "text-red-600"}>
                  {formatCurrency(row.profit)}
                </span>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
