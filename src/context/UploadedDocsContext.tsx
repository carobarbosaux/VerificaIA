"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UploadedFileInfo {
  docId: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string; // ISO string for serialization
}

interface UploadedDocsContextValue {
  uploadedDocs: UploadedFileInfo[];
  addUploadedDoc: (doc: UploadedFileInfo) => void;
  clearUploadedDocs: () => void;
  isDocUploaded: (docId: string) => boolean;
}

const UploadedDocsContext = createContext<UploadedDocsContextValue | null>(null);

const STORAGE_KEY = "verifica_uploaded_docs";

export function UploadedDocsProvider({ children }: { children: React.ReactNode }) {
  const [uploadedDocs, setUploadedDocs] = useState<UploadedFileInfo[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUploadedDocs(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const addUploadedDoc = (doc: UploadedFileInfo) => {
    setUploadedDocs((prev) => {
      const next = [...prev.filter((d) => d.docId !== doc.docId), doc];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearUploadedDocs = () => {
    setUploadedDocs([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isDocUploaded = (docId: string) =>
    uploadedDocs.some((d) => d.docId === docId);

  return (
    <UploadedDocsContext.Provider
      value={{ uploadedDocs, addUploadedDoc, clearUploadedDocs, isDocUploaded }}
    >
      {children}
    </UploadedDocsContext.Provider>
  );
}

export function useUploadedDocs() {
  const ctx = useContext(UploadedDocsContext);
  if (!ctx) throw new Error("useUploadedDocs must be used within UploadedDocsProvider");
  return ctx;
}
