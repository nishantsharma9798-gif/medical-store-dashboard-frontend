import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Printer, Search, Trash2 } from "lucide-react";
import { createTransaction } from "@/api/inventory";
import { getMedicines } from "@/api/medicines";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import type { Medicine } from "@/types";

interface CartLine {
  medicineId: string;
  name: string;
  stock: number;
  quantity: number;
  unitPrice: number;
  gstPercent: number;
}

interface CheckoutResult {
  recorded: CartLine[];
  failed: CartLine[];
}

export default function QuickBillingPage() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [receiptLines, setReceiptLines] = useState<CartLine[]>([]);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const queryClient = useQueryClient();
  const { data: medicines = [], isLoading } = useQuery({ queryKey: ["medicines"], queryFn: getMedicines });

  const checkout = useMutation({
    mutationFn: async (lines: CartLine[]): Promise<CheckoutResult> => {
      const results = await Promise.all(lines.map(async (line) => {
        try {
          await createTransaction({
            medicineId: line.medicineId,
            type: "sale",
            quantity: line.quantity,
            unitPrice: line.unitPrice,
          });
          return { line, ok: true as const };
        } catch {
          return { line, ok: false as const };
        }
      }));
      return {
        recorded: results.filter((result) => result.ok).map((result) => result.line),
        failed: results.filter((result) => !result.ok).map((result) => result.line),
      };
    },
    onSuccess: ({ recorded, failed }) => {
      setReceiptLines(recorded);
      setCart(failed);
      setCheckoutMessage(failed.length ? `${recorded.length} item(s) recorded; ${failed.length} need another attempt.` : "Sale recorded. You can print the sale summary.");
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const matches = medicines.filter((medicine) => {
    const query = search.trim().toLowerCase();
    return query && (medicine.name.toLowerCase().includes(query) || medicine.barcode?.toLowerCase().includes(query));
  }).slice(0, 6);
  const subtotal = cart.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
  const gstAmount = cart.reduce((sum, line) => sum + line.quantity * line.unitPrice * line.gstPercent / 100, 0);
  const total = subtotal + gstAmount;
  const hasInvalidLine = cart.some((line) => line.quantity < 1 || line.quantity > line.stock || line.unitPrice <= 0);

  function addToCart(medicine: Medicine) {
    setCheckoutMessage("");
    setReceiptLines([]);
    setCart((current) => {
      const existing = current.find((line) => line.medicineId === medicine.id);
      if (existing) {
        return current.map((line) => line.medicineId === medicine.id
          ? { ...line, quantity: Math.min(line.quantity + 1, line.stock) }
          : line);
      }
      return [...current, {
        medicineId: medicine.id,
        name: medicine.name,
        stock: medicine.currentStock,
        quantity: 1,
        unitPrice: 0,
        gstPercent: medicine.gstPercent,
      }];
    });
    setSearch("");
  }

  function updateLine(medicineId: string, updates: Partial<Pick<CartLine, "quantity" | "unitPrice">>) {
    setCart((current) => current.map((line) => line.medicineId === medicineId ? { ...line, ...updates } : line));
  }

  return (
    <div className="mx-auto max-w-7xl p-5 lg:p-8">
      <style>{`@media print { @page { margin: 14mm; } body * { visibility: hidden !important; } #print-receipt, #print-receipt * { visibility: visible !important; } #print-receipt { display: block !important; position: absolute; left: 0; top: 0; width: 100%; } }`}</style>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-brand-700">Counter checkout</p>
          <h1 className="mt-1 text-2xl font-semibold text-gray-950">Quick billing</h1>
          <p className="mt-2 text-sm text-gray-600">Find by medicine name or barcode, set the selling rate, and record the sale.</p>
        </div>
        <span className="border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-800">GST preview uses each medicine's saved rate</span>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section>
          <label htmlFor="medicine-search" className="mb-2 block text-sm font-medium text-gray-700">Add medicine</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input id="medicine-search" value={search} onChange={(event) => setSearch(event.target.value)} className="pl-9" placeholder="Search medicine or scan barcode" autoComplete="off" />
          </div>
          {search.trim() && (
            <div className="mt-2 divide-y divide-gray-100 border border-gray-200 bg-white">
              {isLoading ? <p className="p-3 text-sm text-gray-500">Loading medicines...</p> : matches.length === 0 ? (
                <p className="p-3 text-sm text-gray-500">No matching medicine found. Add it from Inventory first.</p>
              ) : matches.map((medicine) => (
                <button key={medicine.id} type="button" onClick={() => addToCart(medicine)} disabled={medicine.currentStock < 1} className="flex w-full items-center justify-between gap-4 p-3 text-left hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
                  <span><span className="block text-sm font-medium text-gray-900">{medicine.name}</span><span className="text-xs text-gray-500">{medicine.barcode || "No barcode"} · GST {medicine.gstPercent}%</span></span>
                  <span className="shrink-0 text-xs text-gray-600">{medicine.currentStock} in stock</span>
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-b border-gray-200 pb-3">
            <h2 className="text-base font-semibold text-gray-950">Bill items</h2>
            <span className="text-sm text-gray-500">{cart.length} items</span>
          </div>
          {cart.length === 0 ? <p className="border-b border-gray-200 py-8 text-center text-sm text-gray-500">Search and select medicines to start a bill.</p> : (
            <div className="divide-y divide-gray-200">
              {cart.map((line) => (
                <div key={line.medicineId} className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_100px_120px_32px] sm:items-center">
                  <div className="min-w-0"><p className="truncate text-sm font-medium text-gray-900">{line.name}</p><p className="mt-1 text-xs text-gray-500">{line.stock} available · GST {line.gstPercent}%</p></div>
                  <label className="text-xs text-gray-500">Qty
                    <Input className="mt-1 h-9" type="number" min="1" max={line.stock} value={line.quantity} onChange={(event) => updateLine(line.medicineId, { quantity: Number(event.target.value) })} />
                  </label>
                  <label className="text-xs text-gray-500">Rate (₹)
                    <Input className="mt-1 h-9" type="number" min="0" step="0.01" value={line.unitPrice} onChange={(event) => updateLine(line.medicineId, { unitPrice: Number(event.target.value) })} />
                  </label>
                  <button type="button" onClick={() => setCart((current) => current.filter((item) => item.medicineId !== line.medicineId))} className="grid h-8 w-8 place-items-center text-gray-500 hover:bg-red-50 hover:text-red-700" aria-label={`Remove ${line.name}`} title="Remove item"><Trash2 className="h-4 w-4" /></button>
                  {line.quantity > line.stock && <p className="text-xs text-red-700 sm:col-span-4">Quantity is higher than available stock.</p>}
                  {line.unitPrice <= 0 && <p className="text-xs text-red-700 sm:col-span-4">Enter a selling rate greater than zero.</p>}
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="border border-gray-200 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-950">Bill summary</h2>
          <div className="mt-5 space-y-3 border-b border-gray-200 pb-4 text-sm">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between text-gray-600"><span>GST estimate</span><span>{formatCurrency(gstAmount)}</span></div>
          </div>
          <div className="flex justify-between py-4 font-semibold text-gray-950"><span>Total</span><span>{formatCurrency(total)}</span></div>
          <Button className="w-full gap-2" disabled={cart.length === 0 || hasInvalidLine || checkout.isPending} onClick={() => checkout.mutate(cart)}>
            <Check className="h-4 w-4" /> {checkout.isPending ? "Recording sale..." : "Record sale"}
          </Button>
          {checkoutMessage && <p role="status" className="mt-3 text-sm text-gray-700">{checkoutMessage}</p>}
          {checkout.isError && <p role="alert" className="mt-3 text-sm text-red-700">Sale could not be recorded. Review stock and try again.</p>}
          {receiptLines.length > 0 && <Button variant="secondary" className="mt-2 w-full gap-2" onClick={() => window.print()}><Printer className="h-4 w-4" /> Print sale summary</Button>}
          <p className="mt-4 text-xs leading-5 text-gray-500">This records stock transactions and shows a GST estimate. Formal GST invoice creation is not available in the connected API yet.</p>
        </aside>
      </div>

      {receiptLines.length > 0 && (
        <section id="print-receipt" className="hidden print:block">
          <h1>MedStock - Sale summary</h1>
          <p>{new Date().toLocaleString("en-IN")}</p>
          <table className="mt-4 w-full text-left">
            <thead><tr><th>Medicine</th><th>Qty</th><th>Rate</th><th>GST</th><th>Amount</th></tr></thead>
            <tbody>{receiptLines.map((line) => <tr key={line.medicineId}><td>{line.name}</td><td>{line.quantity}</td><td>{formatCurrency(line.unitPrice)}</td><td>{line.gstPercent}%</td><td>{formatCurrency(line.quantity * line.unitPrice * (1 + line.gstPercent / 100))}</td></tr>)}</tbody>
          </table>
          <p>Subtotal: {formatCurrency(receiptLines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0))}</p>
          <p>GST estimate: {formatCurrency(receiptLines.reduce((sum, line) => sum + line.quantity * line.unitPrice * line.gstPercent / 100, 0))}</p>
          <p>Total: {formatCurrency(receiptLines.reduce((sum, line) => sum + line.quantity * line.unitPrice * (1 + line.gstPercent / 100), 0))}</p>
        </section>
      )}
    </div>
  );
}