"use client";

import { useState } from "react";
import { Upload, Eye, Clock, HelpCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentStatusBadge } from "./DocumentStatusBadge";
import { UploadModal } from "./UploadModal";
import type { Document } from "@/types/document";

interface DocumentRowProps {
  document: Document;
}

export function DocumentRow({ document }: DocumentRowProps) {
  const [uploadOpen, setUploadOpen] = useState(false);
  const needsUpload =
    document.status === "not_uploaded" || document.status === "rejected";
  const canResubmit =
    document.status === "rejected" &&
    document.resubmitAttempts < document.maxResubmitAttempts;

  return (
    <>
      <div className="flex items-center gap-4 px-4 py-3 bg-white rounded-lg border border-neutral-200 hover:shadow-sm transition-shadow">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-medium text-neutral-900 truncate">
              {document.name}
            </span>
            {document.required && (
              <span className="text-xs text-status-error">*</span>
            )}
            {document.helpText && (
              <span title={document.helpText}>
                <HelpCircle className="w-3.5 h-3.5 text-neutral-400 shrink-0 cursor-help" />
              </span>
            )}
          </div>
          {document.status === "rejected" && document.rejectionReason && (
            <div className="flex items-start gap-1.5 mt-1">
              <AlertCircle className="w-3.5 h-3.5 text-status-error shrink-0 mt-0.5" />
              <p className="text-xs text-status-error">
                {document.rejectionReason}
              </p>
            </div>
          )}
          {document.deadline && (
            <p className="text-xs text-neutral-500 mt-0.5">
              Fecha límite: {document.deadline.toLocaleDateString("es-ES")}
            </p>
          )}
        </div>

        <DocumentStatusBadge status={document.status} />

        <div className="shrink-0">
          {needsUpload && (
            <Button variant="outline" size="sm" onClick={() => setUploadOpen(true)}>
              <Upload className="w-3.5 h-3.5" />
              {canResubmit ? "Resubir" : "Subir"}
            </Button>
          )}
          {document.status === "validated" && document.fileUrl && (
            <Button variant="ghost" size="sm">
              <Eye className="w-3.5 h-3.5" />
              Ver
            </Button>
          )}
          {document.status === "validating" && (
            <Button variant="ghost" size="sm" disabled>
              <Clock className="w-3.5 h-3.5" />
              Pendiente
            </Button>
          )}
          {document.status === "pending" && (
            <Button variant="outline" size="sm" onClick={() => setUploadOpen(true)}>
              <Upload className="w-3.5 h-3.5" />
              Subir
            </Button>
          )}
        </div>
      </div>

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        documentName={document.name}
      />
    </>
  );
}
