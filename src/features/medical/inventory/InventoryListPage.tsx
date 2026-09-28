import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMedicine, getMedicines } from "@/api/medicines";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function InventoryListPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [stock, setStock] = useState("0");
  const [threshold, setThreshold] = useState("5");
  const [gstPercent, setGstPercent] = useState("0");
  const [expiryDate, setExpiryDate] = useState("");
  const queryClient = useQueryClient();
  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: getMedicines,
  });
  const addMedicine = useMutation({
    mutationFn: () => createMedicine({
      name: name.trim(),
      ...(barcode.trim() ? { barcode: barcode.trim() } : {}),
      currentStock: Number(stock),
      thresholdQty: Number(threshold),
      gstPercent: Number(gstPercent),
      expiryDate: expiryDate || null,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      setName("");
      setBarcode("");
      setStock("0");
      setThreshold("5");
      setGstPercent("0");
      setExpiryDate("");
      setShowAddForm(false);
    },
  });

  function handleAddMedicine(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addMedicine.mutate();
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-xl font-semibold">Inventory</h1><p className="mt-1 text-sm text-gray-500">Track stock, expiry dates and GST rates.</p></div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setShowAddForm((visible) => !visible)}>{showAddForm ? "Close" : "Add medicine"}</Button>
          <Link to="/medical/inventory/scan"><Button>Scan entry</Button></Link>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddMedicine} className="mb-6 border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-base font-semibold">Add medicine manually</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-sm font-medium text-gray-700">Medicine name
              <input required value={name} onChange={(event) => setName(event.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-normal" placeholder="Medicine name" />
            </label>
            <label className="text-sm font-medium text-gray-700">Barcode <span className="font-normal text-gray-500">(optional)</span>
              <input value={barcode} onChange={(event) => setBarcode(event.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-normal" placeholder="Leave blank if not available" />
            </label>
            <label className="text-sm font-medium text-gray-700">Opening stock
              <input required type="number" min="0" value={stock} onChange={(event) => setStock(event.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-normal" />
            </label>
            <label className="text-sm font-medium text-gray-700">Low-stock threshold
              <input required type="number" min="0" value={threshold} onChange={(event) => setThreshold(event.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-normal" />
            </label>
            <label className="text-sm font-medium text-gray-700">GST rate (%)
              <input required type="number" min="0" max="100" step="0.01" value={gstPercent} onChange={(event) => setGstPercent(event.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-normal" />
            </label>
            <label className="text-sm font-medium text-gray-700">Expiry date
              <input type="date" value={expiryDate} onChange={(event) => setExpiryDate(event.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-normal" />
            </label>
          </div>
          {addMedicine.isError && <p role="alert" className="mt-3 text-sm text-red-700">Could not add medicine. Check the details and try again.</p>}
          <div className="mt-4 flex justify-end">
            <Button type="submit" disabled={addMedicine.isPending || !name.trim()}>{addMedicine.isPending ? "Adding..." : "Add to stock"}</Button>
          </div>
        </form>
      )}

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading inventory...</p>
      ) : (
        <DataTable
          keyExtractor={(row) => row.id}
          rows={medicines}
          emptyMessage="No medicines added yet. Start by scanning your first item."
          columns={[
            { header: "Medicine", accessor: (row) => row.name },
            { header: "Barcode", accessor: (row) => row.barcode },
            { header: "Stock", accessor: (row) => row.currentStock },
            {
              header: "Status",
              accessor: (row) =>
                row.currentStock <= row.thresholdQty ? (
                  <Badge tone="danger">Low stock</Badge>
                ) : (
                  <Badge tone="success">In stock</Badge>
                ),
            },
            {
              header: "Expiry",
              accessor: (row) => (row.expiryDate ? new Date(row.expiryDate).toLocaleDateString("en-IN") : "—"),
            },
          ]}
        />
      )}
    </div>
  );
}
