import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ClientRow {
  id: string;
  name: string;
  enabledApps: string[];
  createdAt: string;
}

export default function ClientListPage() {
  const { data: clients = [], isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => (await api.get<ClientRow[]>("/api/v1/clients")).data,
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Clients</h1>
        <Button>+ New client</Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading clients...</p>
      ) : (
        <DataTable
          keyExtractor={(row) => row.id}
          rows={clients}
          emptyMessage="No clients onboarded yet."
          columns={[
            { header: "Name", accessor: (row) => row.name },
            {
              header: "Enabled apps",
              accessor: (row) => (
                <div className="flex gap-1">
                  {row.enabledApps.map((app) => (
                    <Badge key={app} tone="neutral">
                      {app}
                    </Badge>
                  ))}
                </div>
              ),
            },
            { header: "Onboarded on", accessor: (row) => new Date(row.createdAt).toLocaleDateString("en-IN") },
          ]}
        />
      )}
    </div>
  );
}
