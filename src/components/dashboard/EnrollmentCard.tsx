"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Enrollment } from "@/types/student";

const statusConfig = {
  validated: { label: "Validado", variant: "validated" as const },
  pending_payment: {
    label: "Pendiente de pago",
    variant: "payment" as const,
  },
  in_progress: { label: "En curso", variant: "validating" as const },
  pending_documents: {
    label: "Pendiente de documentos",
    variant: "pending" as const,
  },
};

interface EnrollmentCardProps {
  enrollment: Enrollment;
}

export function EnrollmentCard({ enrollment }: EnrollmentCardProps) {
  const config = statusConfig[enrollment.status];

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h4 className="text-sm font-medium text-neutral-900 leading-snug flex-1">
            {enrollment.program}
          </h4>
          <Badge variant={config.variant}>{config.label}</Badge>
        </div>
        <p className="text-xs text-neutral-500">
          Matrícula {enrollment.enrollmentId}
        </p>
      </CardContent>
    </Card>
  );
}
