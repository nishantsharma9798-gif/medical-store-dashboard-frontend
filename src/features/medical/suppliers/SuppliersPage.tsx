import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSuppliers } from "@/api/suppliers";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";

export default function SuppliersPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const { data: suppliers = [], isLoading, error, refetch } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-3">
                <span className="text-3xl">🏢</span> Supplier Management
              </h1>
              <p className="text-neutral-600 mt-1">Manage all your medical suppliers and distributors</p>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <span>+</span> Add New Supplier
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
            <p className="text-neutral-600 text-sm font-medium">Total Suppliers</p>
            <p className="text-3xl font-bold text-neutral-900 mt-2">{suppliers.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
            <p className="text-neutral-600 text-sm font-medium">Active Suppliers</p>
            <p className="text-3xl font-bold text-brand-600 mt-2">{suppliers.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
            <p className="text-neutral-600 text-sm font-medium">Mapped Medicines</p>
            <p className="text-3xl font-bold text-medical-primary mt-2">
              {suppliers.reduce((sum, s) => sum + (s.mappedMedicineIds?.length ?? 0), 0)}
            </p>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <p className="text-neutral-600 animate-pulse">Loading suppliers...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center bg-red-50">
              <p className="text-red-700 font-medium mb-2">Failed to load suppliers</p>
              <p className="text-red-600 text-sm">{error instanceof Error ? error.message : "Unknown error"}</p>
              <button
                onClick={() => refetch()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          ) : suppliers.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-neutral-600 text-lg font-medium">No suppliers yet</p>
              <p className="text-neutral-500 text-sm mt-1">Add your first supplier to get started</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-6 px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
              >
                Add Supplier
              </button>
            </div>
          ) : (
            <DataTable
              keyExtractor={(row) => row.id}
              rows={suppliers}
              emptyMessage="No suppliers added yet."
              columns={[
                { header: "Supplier Name", accessor: (row) => row.name },
                { header: "WhatsApp Number", accessor: (row) => row.whatsappNumber || "N/A" },
                { header: "Medicines Mapped", accessor: (row) => row.mappedMedicineIds?.length ?? 0 },
                {
                  header: "Actions",
                  accessor: () => (
                    <div className="flex gap-2">
                      <button className="text-xs px-3 py-1 bg-brand-100 text-brand-700 rounded hover:bg-brand-200">
                        Edit
                      </button>
                      <button className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">
                        Delete
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          )}
        </div>
      </div>

      {/* Add Supplier Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Add New Supplier</h2>
            <p className="text-neutral-600 mb-6">Modal form coming soon...</p>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full px-4 py-2 bg-neutral-200 text-neutral-900 rounded-lg hover:bg-neutral-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
