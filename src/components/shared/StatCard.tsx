import { Card, CardBody } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "danger" | "success";
}) {
  const valueColor =
    tone === "danger" ? "text-red-600" : tone === "success" ? "text-green-600" : "text-gray-900";

  return (
    <Card>
      <CardBody>
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`mt-1 text-2xl font-semibold ${valueColor}`}>{value}</p>
      </CardBody>
    </Card>
  );
}
