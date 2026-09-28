import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BellRing, CalendarClock, PackagePlus, PackageSearch, TrendingDown } from "lucide-react";
import { getTransactions } from "@/api/inventory";
import { getMedicines } from "@/api/medicines";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();
  const from = new Date();
  from.setDate(from.getDate() - 30);
  const { data: medicines = [], isLoading: medicinesLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: getMedicines,
  });
  const { data: transactions = [], isLoading: transactionsLoading } = useQuery({
    queryKey: ["transactions", "last-30-days"],
    queryFn: () => getTransactions({ from: from.toISOString() }),
  });

  const now = new Date();
  const expiryLimit = new Date();
  expiryLimit.setDate(expiryLimit.getDate() + 30);
  const lowStock = medicines.filter((medicine) => medicine.currentStock <= medicine.thresholdQty);
  const expiring = medicines.filter((medicine) => {
    if (!medicine.expiryDate) return false;
    const expiry = new Date(medicine.expiryDate);
    return expiry >= now && expiry <= expiryLimit;
  });
  const soldMedicineIds = new Set(
    transactions.filter((transaction) => transaction.type === "sale").map((transaction) => transaction.medicineId)
  );
  const slowMoving = medicines.filter((medicine) => medicine.currentStock > 0 && !soldMedicineIds.has(medicine.id));
  const loading = medicinesLoading || transactionsLoading;

  const metrics = [
    { label: "Medicines tracked", value: medicines.length, icon: PackageSearch, tone: "text-brand-700 bg-brand-50" },
    { label: "Low stock", value: lowStock.length, icon: BellRing, tone: "text-amber-700 bg-amber-50" },
    { label: "Expiring in 30 days", value: expiring.length, icon: CalendarClock, tone: "text-red-700 bg-red-50" },
    { label: "No sales in 30 days", value: slowMoving.length, icon: TrendingDown, tone: "text-sky-700 bg-sky-50" },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-brand-700">Daily overview</p>
          <h1 className="mt-1 text-2xl font-semibold text-gray-950">Welcome{user ? `, ${user.name}` : ""}</h1>
          <p className="mt-2 text-sm text-gray-600">Stock risks and medicines that may need your attention.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/medical/inventory" className="inline-flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50">
            <PackagePlus className="h-4 w-4" /> Add medicine
          </Link>
          <Link to="/medical/billing" className="inline-flex items-center gap-2 bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800">
            Quick billing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <section aria-label="Inventory summary" className="grid gap-px border border-gray-200 bg-gray-200 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="flex items-center gap-4 bg-white p-5">
            <span className={`grid h-11 w-11 shrink-0 place-items-center ${tone}`}><Icon className="h-5 w-5" /></span>
            <div>
              <p className="text-sm text-gray-600">{label}</p>
              <p className="mt-1 text-2xl font-semibold text-gray-950">{loading ? "—" : value}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-950">Needs restocking</h2>
            <Link to="/medical/alerts" className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline">Open alerts <ArrowRight className="h-4 w-4" /></Link>
          </div>
          {loading ? <p className="border-y border-gray-200 py-5 text-sm text-gray-500">Loading stock status...</p> : lowStock.length === 0 ? (
            <p className="border-y border-gray-200 py-5 text-sm text-gray-500">All tracked medicines are above their stock thresholds.</p>
          ) : (
            <ul className="divide-y divide-gray-200 border-y border-gray-200">
              {lowStock.slice(0, 5).map((medicine) => (
                <li key={medicine.id} className="flex items-center justify-between gap-4 py-3">
                  <span className="min-w-0"><span className="block truncate text-sm font-medium text-gray-900">{medicine.name}</span><span className="text-xs text-gray-500">Threshold {medicine.thresholdQty}</span></span>
                  <span className="shrink-0 text-sm font-semibold text-amber-700">{medicine.currentStock} left</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-950">Expiry watch</h2>
            <Link to="/medical/inventory" className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline">View inventory <ArrowRight className="h-4 w-4" /></Link>
          </div>
          {loading ? <p className="border-y border-gray-200 py-5 text-sm text-gray-500">Loading expiry status...</p> : expiring.length === 0 ? (
            <p className="border-y border-gray-200 py-5 text-sm text-gray-500">No medicine records expire in the next 30 days.</p>
          ) : (
            <ul className="divide-y divide-gray-200 border-y border-gray-200">
              {expiring.slice(0, 5).map((medicine) => (
                <li key={medicine.id} className="flex items-center justify-between gap-4 py-3">
                  <span className="min-w-0 truncate text-sm font-medium text-gray-900">{medicine.name}</span>
                  <time className="shrink-0 text-sm text-red-700">{new Date(medicine.expiryDate!).toLocaleDateString("en-IN")}</time>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="border-t border-gray-200 pt-6">
        <div className="mb-3 flex items-center justify-between">
          <div><h2 className="text-lg font-semibold text-gray-950">Review slow-moving stock</h2><p className="mt-1 text-sm text-gray-600">Medicines with stock on hand and no recorded sale in the last 30 days.</p></div>
          <Link to="/medical/inventory" className="hidden text-sm font-medium text-brand-700 hover:underline sm:block">Manage inventory <ArrowRight className="inline h-4 w-4" /></Link>
        </div>
        {loading ? <p className="py-4 text-sm text-gray-500">Checking recent sales...</p> : slowMoving.length === 0 ? (
          <p className="py-4 text-sm text-gray-500">No slow-moving items found in the current inventory.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {slowMoving.slice(0, 8).map((medicine) => <span key={medicine.id} className="border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">{medicine.name} <span className="text-gray-500">· {medicine.currentStock} in stock</span></span>)}
          </div>
        )}
      </section>
    </div>
  );
}
