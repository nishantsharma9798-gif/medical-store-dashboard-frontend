import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Building2, Check, PackageSearch, Plus, Search, Users, X } from "lucide-react";
import { createSupplier, getSuppliers } from "@/api/suppliers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SuppliersPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const queryClient = useQueryClient();
  const { data: suppliers = [], isLoading, error, refetch } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });

  const createMutation = useMutation({
    mutationFn: createSupplier,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      setSupplierName("");
      setWhatsappNumber("");
      setShowAddModal(false);
    },
  });

  const filteredSuppliers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return suppliers;
    return suppliers.filter((supplier) =>
      `${supplier.name} ${supplier.whatsappNumber}`.toLowerCase().includes(query),
    );
  }, [search, suppliers]);

  const mappedMedicineCount = new Set(suppliers.flatMap((supplier) => supplier.mappedMedicineIds ?? [])).size;
  const suppliersWithPhone = suppliers.filter((supplier) => supplier.whatsappNumber?.trim()).length;

  return (
    <div className="min-h-screen bg-[#f6f8f7] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Partners</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">Suppliers</h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">Manage your distributor contacts and medicine connections.</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="h-11 gap-2 self-start rounded-lg px-5 sm:self-auto">
            <Plus className="h-4 w-4" /> Add supplier
          </Button>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Building2 className="h-5 w-5" /></span>
            <div><p className="text-sm text-gray-500">Total suppliers</p><p className="mt-1 text-2xl font-semibold text-gray-950">{isLoading ? "—" : suppliers.length}</p></div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700"><Users className="h-5 w-5" /></span>
            <div><p className="text-sm text-gray-500">WhatsApp contacts</p><p className="mt-1 text-2xl font-semibold text-gray-950">{isLoading ? "—" : suppliersWithPhone}</p></div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700"><PackageSearch className="h-5 w-5" /></span>
            <div><p className="text-sm text-gray-500">Medicines mapped</p><p className="mt-1 text-2xl font-semibold text-gray-950">{isLoading ? "—" : mappedMedicineCount}</p></div>
          </div>
        </div>

        <section className="mt-7 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="font-semibold text-gray-900">Supplier directory</h2>
              <p className="mt-1 text-sm text-gray-500">{suppliers.length} {suppliers.length === 1 ? "supplier" : "suppliers"} on your list</p>
            </div>
            <label className="relative block w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search suppliers" className="h-10 rounded-lg border-gray-200 pl-9" />
            </label>
          </div>

          {isLoading ? (
            <div className="space-y-3 p-6" aria-label="Loading suppliers">
              {[0, 1, 2].map((item) => <div key={item} className="h-12 animate-pulse rounded-lg bg-gray-100" />)}
            </div>
          ) : error ? (
            <div className="px-6 py-12 text-center">
              <p className="font-medium text-red-700">Suppliers couldn’t be loaded</p>
              <p className="mt-1 text-sm text-gray-500">Check your connection and try again.</p>
              <Button variant="secondary" onClick={() => refetch()} className="mt-4">Retry</Button>
            </div>
          ) : filteredSuppliers.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Building2 className="h-6 w-6" /></span>
              <h3 className="mt-4 font-semibold text-gray-900">{search ? "No matching suppliers" : "No suppliers yet"}</h3>
              <p className="mt-1 text-sm text-gray-500">{search ? "Try another name or WhatsApp number." : "Add your first distributor to start building your supplier list."}</p>
              {!search && <Button onClick={() => setShowAddModal(true)} className="mt-5 gap-2"><Plus className="h-4 w-4" /> Add supplier</Button>}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Supplier</th>
                    <th className="px-6 py-3 font-semibold">WhatsApp number</th>
                    <th className="px-6 py-3 font-semibold">Mapped medicines</th>
                    <th className="px-6 py-3 font-semibold">Contact status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="transition-colors hover:bg-gray-50/80">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-sm font-semibold text-brand-700">{supplier.name.slice(0, 1).toUpperCase()}</span>
                          <span className="font-medium text-gray-900">{supplier.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{supplier.whatsappNumber || "Not provided"}</td>
                      <td className="px-6 py-4 text-gray-700">{supplier.mappedMedicineIds?.length ?? 0}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${supplier.whatsappNumber?.trim() ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                          {supplier.whatsappNumber?.trim() && <Check className="h-3.5 w-3.5" />}
                          {supplier.whatsappNumber?.trim() ? "Contact added" : "No contact"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/45 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowAddModal(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="add-supplier-title" className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="add-supplier-title" className="text-xl font-semibold text-gray-950">Add supplier</h2>
                <p className="mt-1 text-sm text-gray-500">Save a distributor and their WhatsApp contact.</p>
              </div>
              <button type="button" onClick={() => setShowAddModal(false)} aria-label="Close dialog" className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900"><X className="h-5 w-5" /></button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={(event) => {
              event.preventDefault();
              createMutation.mutate({ name: supplierName.trim(), whatsappNumber: whatsappNumber.trim(), mappedMedicineIds: [] });
            }}>
              <div>
                <label htmlFor="supplier-name" className="mb-1.5 block text-sm font-medium text-gray-700">Supplier name</label>
                <Input id="supplier-name" autoFocus required minLength={2} value={supplierName} onChange={(event) => setSupplierName(event.target.value)} placeholder="e.g. HealthPlus Distributors" className="h-11 rounded-lg border-gray-300" />
              </div>
              <div>
                <label htmlFor="supplier-whatsapp" className="mb-1.5 block text-sm font-medium text-gray-700">WhatsApp number</label>
                <Input id="supplier-whatsapp" type="tel" value={whatsappNumber} onChange={(event) => setWhatsappNumber(event.target.value)} placeholder="e.g. +91 98765 43210" className="h-11 rounded-lg border-gray-300" />
              </div>
              {createMutation.isError && <p role="alert" className="text-sm text-red-600">Couldn’t save this supplier. Please try again.</p>}
              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" disabled={createMutation.isPending} className="gap-2">
                  {createMutation.isPending ? "Saving…" : "Save supplier"}
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}