import { Badge } from "@/components/ui/badge";
import type { DocumentStatus } from "@/types/document";

const statusMap: Record<
  DocumentStatus,
  { label: string; variant: "validated" | "pending" | "validating" | "error" | "default" }
> = {
  validated: { label: "Validado", variant: "validated" },
  pending: { label: "Pendiente", variant: "pending" },
  validating: { label: "En validación", variant: "validating" },
  rejected: { label: "Rechazado", variant: "error" },
  not_uploaded: { label: "Sin subir", variant: "default" },
};

export function DocumentStatusBadge({ status }: { status: DocumentStatus }) {
  const config = statusMap[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
