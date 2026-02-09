"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, FolderOpen } from "lucide-react";
import { DocumentRow } from "./DocumentRow";
import type { DocumentGroup } from "@/types/document";

interface DocumentGroupSectionProps {
  group: DocumentGroup;
}

const categoryColors: Record<string, string> = {
  identity: "text-primary-400",
  academic: "text-secondary-500",
  financial: "text-status-payment",
};

export function DocumentGroupSection({ group }: DocumentGroupSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="mb-7">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 w-full text-left mb-3 py-1 group"
      >
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        )}
        <FolderOpen
          className={`w-4.5 h-4.5 ${categoryColors[group.category] || "text-neutral-500"}`}
        />
        <h3 className="text-sm font-semibold text-neutral-800 group-hover:text-primary-500 transition-colors">
          {group.label}
        </h3>
      </button>
      {isOpen && (
        <div className="space-y-3 ml-7">
          {group.documents.map((doc) => (
            <DocumentRow key={doc.id} document={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
