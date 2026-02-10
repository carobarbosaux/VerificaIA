"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight, X } from "lucide-react";
import { mockDocuments } from "@/data/mock-student";
import Link from "next/link";

export function ReminderWidget() {
  const [dismissed, setDismissed] = useState(false);

  const pendingDocs = mockDocuments.filter(
    (d) =>
      d.status === "not_uploaded" ||
      d.status === "pending" ||
      d.status === "rejected"
  );

  if (dismissed || pendingDocs.length === 0) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-status-pending-bg border border-status-pending/30 rounded-lg shadow-sm">
      <AlertTriangle className="w-4 h-4 text-status-pending shrink-0" />
      <span className="text-sm font-medium text-neutral-900 flex-1">
        Tienes {pendingDocs.length} documentos pendientes por subir para
        finalizar tu matriculación
      </span>
      <Link
        href="/matriculas"
        className="flex items-center gap-1.5 text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors whitespace-nowrap"
      >
        Mi documentación
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
      <button
        onClick={() => setDismissed(true)}
        className="p-1 rounded-full hover:bg-status-pending/10 transition-colors shrink-0"
        aria-label="Cerrar notificación"
      >
        <X className="w-3.5 h-3.5 text-neutral-400" />
      </button>
    </div>
  );
}
