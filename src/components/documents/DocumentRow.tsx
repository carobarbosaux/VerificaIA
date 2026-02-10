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
      <div
        className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition-shadow ${
          document.status === "validated"
            ? "bg-status-validated-bg/50 border-status-validated/20"
            : "bg-white border-neutral-200 hover:shadow-sm"
        }`}
      >
        {/* Document info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-900 truncate">
              {document.name}
            </span>
            {document.required && (
              <span className="text-xs text-status-error font-bold">*</span>
            )}
            {document.helpText && (
              <span title={document.helpText}>
                <HelpCircle className="w-3.5 h-3.5 text-neutral-400 shrink-0 cursor-help" />
              </span>
            )}
          </div>
          {document.status === "rejected" && document.rejectionReason && (
            <div className="flex items-start gap-1.5 mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-status-error shrink-0 mt-0.5" />
              <p className="text-xs text-status-error leading-relaxed">
                {document.rejectionReason}
              </p>
            </div>
          )}
          {document.description && (
            <p className="text-xs text-neutral-400 mt-1">
              {document.description}
            </p>
          )}
        </div>

        {/* Status badge */}
        <div className="shrink-0">
          <DocumentStatusBadge status={document.status} />
        </div>

        {/* Action */}
        <div className="shrink-0">
          {needsUpload && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUploadOpen(true)}
            >
              <Upload className="w-3.5 h-3.5" />
              {canResubmit ? "Reemplazar archivo" : "Subir archivo"}
            </Button>
          )}
          {document.status === "validated" && document.fileUrl && (
            <Button variant="ghost" size="sm">
              <Eye className="w-3.5 h-3.5" />
              Ver archivo
            </Button>
          )}
          {document.status === "validating" && (
            <Button variant="ghost" size="sm" disabled>
              <Clock className="w-3.5 h-3.5" />
              En revisión
            </Button>
          )}
          {document.status === "pending" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUploadOpen(true)}
            >
              <Upload className="w-3.5 h-3.5" />
              Subir archivo
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
