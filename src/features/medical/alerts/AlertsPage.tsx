import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAlerts } from "@/api/alerts";
import { createOrder } from "@/api/suppliers";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AlertsPage() {
  const { data: alerts = [], isLoading } = useQuery({ queryKey: ["alerts"], queryFn: getAlerts });
  const queryClient = useQueryClient();

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["alerts"] }),
  });

  return (
    <div className="p-6">
      <h1 className="mb-1 text-xl font-semibold">Restock alerts</h1>
      <p className="mb-6 text-sm text-gray-500">
        Based on last 4 weeks' same-weekday average — updated every Friday
      </p>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p className="text-sm text-gray-500">No restock alerts right now. Stock levels look healthy.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {alerts.map((alert) => (
            <Card key={alert.id}>
              <CardBody>
                <p className="font-medium">{alert.medicineName}</p>
                <p className="mt-1 text-sm text-gray-500">
                  Predicted demand: {alert.predictedDemand} · Current stock: {alert.currentStock}
                </p>
                <Button
                  className="mt-3"
                  variant="secondary"
                  disabled={orderMutation.isPending}
                  onClick={() =>
                    orderMutation.mutate({
                      medicineId: alert.medicineId,
                      supplierId: "", // resolved server-side from mapped supplier
                      requestedQty: alert.suggestedOrderQty,
                    })
                  }
                >
                  Order {alert.suggestedOrderQty} units via WhatsApp
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
