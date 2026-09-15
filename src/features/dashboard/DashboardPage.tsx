import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="mb-1 text-xl font-semibold">Welcome{user ? `, ${user.name}` : ""}</h1>
      <p className="text-sm text-gray-500">Choose a project from the Projects menu to get started.</p>
    </div>
  );
}
