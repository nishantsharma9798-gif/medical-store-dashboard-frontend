import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMedicineByBarcode } from "@/api/medicines";
import { createTransaction } from "@/api/inventory";
import { getSuppliers } from "@/api/suppliers";
import { ScannerInput } from "@/components/shared/ScannerInput";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Medicine, TransactionType } from "@/types";

export default function ScanEntryPage() {
  const [mode, setMode] = useState<TransactionType>("sale");
  const [scannedMedicine, setScannedMedicine] = useState<Medicine | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [supplierId, setSupplierId] = useState("");
  const [notFound, setNotFound] = useState(false);
  const queryClient = useQueryClient();

  const { data: suppliers = [] } = useQuery({ queryKey: ["suppliers"], queryFn: getSuppliers });

  const lookupMutation = useMutation({
    mutationFn: getMedicineByBarcode,
    onSuccess: (medicine) => {
      setScannedMedicine(medicine);
      setNotFound(false);
    },
    onError: () => {
      setScannedMedicine(null);
      setNotFound(true);
    },
  });

  const submitMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      resetForm();
    },
  });

  function resetForm() {
    setScannedMedicine(null);
    setQuantity(1);
    setUnitPrice(0);
    setSupplierId("");
    setNotFound(false);
  }

  function handleScan(barcode: string) {
    lookupMutation.mutate(barcode);
  }

  function handleConfirm() {
    if (!scannedMedicine) return;
    submitMutation.mutate({
      medicineId: scannedMedicine.id,
      type: mode,
      quantity,
      unitPrice,
      supplierId: mode === "purchase" ? supplierId : undefined,
    });
  }

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="mb-4 text-xl font-semibold">Scan entry</h1>

      <div className="mb-4 flex gap-2">
        <Button variant={mode === "sale" ? "primary" : "secondary"} onClick={() => setMode("sale")}>
          Sale entry
        </Button>
        <Button variant={mode === "purchase" ? "primary" : "secondary"} onClick={() => setMode("purchase")}>
          Purchase entry
        </Button>
      </div>

      <Card>
        <CardBody className="space-y-4">
          <ScannerInput onScan={handleScan} />

          {notFound && (
            <p className="text-sm text-amber-600">
              Medicine not found for this barcode. Add it to inventory first.
            </p>
          )}

          {scannedMedicine && (
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <p className="font-medium">{scannedMedicine.name}</p>

              <div>
                <label className="mb-1 block text-sm font-medium">Quantity</label>
                <Input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Unit price</label>
                <Input
                  type="number"
                  min={0}
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(Number(e.target.value))}
                />
              </div>

              {mode === "purchase" && (
                <div>
                  <label className="mb-1 block text-sm font-medium">Supplier</label>
                  <select
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={supplierId}
                    onChange={(e) => setSupplierId(e.target.value)}
                  >
                    <option value="">Select supplier</option>
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <Button className="w-full" onClick={handleConfirm} disabled={submitMutation.isPending}>
                {submitMutation.isPending ? "Saving..." : "Confirm entry"}
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
