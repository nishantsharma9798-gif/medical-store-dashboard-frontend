import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";

export default function UsersPage() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await api.get<User[]>("/api/v1/users")).data,
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Staff users</h1>
        <Button>+ Add staff user</Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <DataTable
          keyExtractor={(row) => row.id}
          rows={users}
          emptyMessage="No staff users added yet."
          columns={[
            { header: "Name", accessor: (row) => row.name },
            { header: "Email", accessor: (row) => row.email },
            { header: "Role", accessor: (row) => row.role },
            { header: "Permissions", accessor: (row) => row.permissions.join(", ") || "—" },
          ]}
        />
      )}
    </div>
  );
}
