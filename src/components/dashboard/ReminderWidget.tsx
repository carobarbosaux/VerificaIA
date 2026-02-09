"use client";

import { useState } from "react";
import { AlertTriangle, Clock, X } from "lucide-react";
import { mockDocuments } from "@/data/mock-student";
import Link from "next/link";

export function ReminderWidget() {
  const [dismissed, setDismissed] = useState(false);

  const pendingDocs = mockDocuments.filter(
    (d) => d.status === "not_uploaded" || d.status === "pending"
  );
  const rejectedDocs = mockDocuments.filter((d) => d.status === "rejected");
  const totalPending = pendingDocs.length + rejectedDocs.length;

  const nearestDeadline = mockDocuments
    .filter((d) => d.deadline && d.status !== "validated")
    .sort(
      (a, b) =>
        (a.deadline?.getTime() ?? 0) - (b.deadline?.getTime() ?? 0)
    )[0];

  const daysUntilDeadline = nearestDeadline?.deadline
    ? Math.ceil(
        (nearestDeadline.deadline.getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  if (dismissed || totalPending === 0) return null;

  return (
    <Link href="/matriculas" className="block">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-status-pending-bg border border-status-pending/30 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow">
        <AlertTriangle className="w-4 h-4 text-status-pending shrink-0" />
        <span className="text-sm font-medium text-neutral-900 flex-1">
          Tienes {totalPending} documento{totalPending !== 1 ? "s" : ""}{" "}
          pendiente{totalPending !== 1 ? "s" : ""}
        </span>
        {rejectedDocs.length > 0 && (
          <span className="text-xs text-status-error">
            {rejectedDocs.length} rechazado
            {rejectedDocs.length !== 1 ? "s" : ""}
          </span>
        )}
        {daysUntilDeadline !== null && (
          <span className="flex items-center gap-1 text-xs text-neutral-500">
            <Clock className="w-3 h-3" />
            {daysUntilDeadline > 0
              ? `${daysUntilDeadline}d`
              : "Vencido"}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDismissed(true);
          }}
          className="p-1 rounded-full hover:bg-status-pending/10 transition-colors"
          aria-label="Cerrar notificación"
        >
          <X className="w-3.5 h-3.5 text-neutral-400" />
        </button>
      </div>
    </Link>
  );
}
