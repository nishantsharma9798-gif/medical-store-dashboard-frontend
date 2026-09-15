import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMedicines } from "@/api/medicines";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function InventoryListPage() {
  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: getMedicines,
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Inventory</h1>
        <Link to="/medical/inventory/scan">
          <Button>+ Scan entry</Button>
        </Link>
      </div>

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
