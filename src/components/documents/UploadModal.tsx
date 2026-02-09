"use client";

import { useState, useRef, useCallback } from "react";
import { X, Upload, FileText, Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ACCEPTED_FORMATS = [".pdf", ".jpg", ".jpeg", ".png"];
const ACCEPTED_MIME = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  documentName: string;
}

export function UploadModal({ open, onClose, documentName }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setFile(null);
    setError(null);
    setUploaded(false);
    setDragOver(false);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const validateFile = useCallback((f: File): string | null => {
    if (!ACCEPTED_MIME.includes(f.type)) {
      return `Formato no válido. Solo se aceptan: ${ACCEPTED_FORMATS.join(", ")}`;
    }
    if (f.size > MAX_SIZE_BYTES) {
      return `El archivo excede el tamaño máximo de ${MAX_SIZE_MB} MB`;
    }
    return null;
  }, []);

  const handleFile = useCallback(
    (f: File) => {
      const validationError = validateFile(f);
      if (validationError) {
        setError(validationError);
        setFile(null);
      } else {
        setError(null);
        setFile(f);
      }
    },
    [validateFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) handleFile(selected);
    },
    [handleFile]
  );

  const handleUpload = useCallback(() => {
    if (!file) return;
    // Mock upload
    setUploaded(true);
  }, [file]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h3 className="font-semibold text-neutral-900">Subir documento</h3>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-sm text-neutral-600 mb-4">{documentName}</p>

          {uploaded ? (
            <div className="flex flex-col items-center py-8 text-center">
              <CheckCircle className="w-12 h-12 text-status-validated mb-3" />
              <p className="font-medium text-neutral-900">
                Documento subido correctamente
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                Tu documento será revisado próximamente
              </p>
            </div>
          ) : (
            <>
              {/* Drop zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                  dragOver
                    ? "border-primary-400 bg-primary-50"
                    : "border-neutral-300 hover:border-neutral-400"
                }`}
                onClick={() => inputRef.current?.click()}
              >
                <Upload
                  className={`w-8 h-8 mx-auto mb-3 ${
                    dragOver ? "text-primary-500" : "text-neutral-400"
                  }`}
                />
                <p className="text-sm font-medium text-neutral-700">
                  Arrastra tu archivo aquí
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  o{" "}
                  <span className="text-primary-500 underline">
                    selecciona desde tu equipo
                  </span>
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept={ACCEPTED_FORMATS.join(",")}
                  onChange={handleInputChange}
                  className="hidden"
                />
              </div>

              {/* File info */}
              <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500">
                <span>
                  Formatos: {ACCEPTED_FORMATS.join(", ").toUpperCase()}
                </span>
                <span>Máx: {MAX_SIZE_MB} MB</span>
              </div>

              {/* Error */}
              {error && (
                <p className="mt-3 text-xs text-status-error">{error}</p>
              )}

              {/* Selected file */}
              {file && (
                <div className="mt-4 flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                  <FileText className="w-5 h-5 text-primary-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null);
                      setError(null);
                    }}
                    className="p-1 rounded hover:bg-neutral-200 transition-colors"
                    aria-label="Eliminar archivo"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-neutral-500" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100">
          {uploaded ? (
            <Button onClick={handleClose}>Cerrar</Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button onClick={handleUpload} disabled={!file}>
                <Upload className="w-4 h-4" />
                Subir documento
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
