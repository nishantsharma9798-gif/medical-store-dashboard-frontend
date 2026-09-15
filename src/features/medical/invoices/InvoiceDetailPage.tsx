import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getInvoiceById, shareInvoiceOnWhatsApp } from "@/api/invoices";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: invoice, isLoading } = useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(id!),
    enabled: !!id,
  });

  const shareMutation = useMutation({
    mutationFn: () => shareInvoiceOnWhatsApp(id!),
  });

  if (isLoading) return <p className="p-6 text-sm text-gray-500">Loading invoice...</p>;
  if (!invoice) return <p className="p-6 text-sm text-gray-500">Invoice not found.</p>;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Invoice {invoice.invoiceNo}</h1>
        <div className="flex gap-2">
          <a href={invoice.pdfUrl} target="_blank" rel="noreferrer">
            <Button variant="secondary">Download PDF</Button>
          </a>
          <Button onClick={() => shareMutation.mutate()} disabled={shareMutation.isPending}>
            {shareMutation.isPending ? "Sending..." : "Share on WhatsApp"}
          </Button>
        </div>
      </div>

      <Card>
        <CardBody className="space-y-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>{invoice.partyName}</span>
            <span>{formatDate(invoice.createdAt)}</span>
          </div>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2">Medicine</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Rate</th>
                <th className="py-2">GST %</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="py-2">{item.medicineName}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-2">{item.gstPercent}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ml-auto w-48 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">GST</span>
              <span>{formatCurrency(invoice.gstAmount)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-1 font-semibold">
              <span>Total</span>
              <span>{formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
