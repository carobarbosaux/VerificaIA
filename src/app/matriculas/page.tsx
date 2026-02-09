"use client";

import { AppShell } from "@/components/layout/AppShell";
import { DocumentGroupSection } from "@/components/documents";
import { Card } from "@/components/ui/card";
import { FileText, ChevronRight, CalendarClock } from "lucide-react";
import {
  mockStudent,
  mockDocuments,
  mockDocumentGroups,
} from "@/data/mock-student";

export default function MatriculasPage() {
  const validatedDocs = mockDocuments.filter((d) => d.status === "validated");

  return (
    <AppShell studentName={mockStudent.name}>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">
        Mi documentación
      </h1>

      {/* Estado de Matrícula */}
      <Card className="mb-8 border-l-4 border-l-status-pending overflow-hidden">
        <div className="p-6 space-y-5">
          {/* Título del programa */}
          <div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-lg bg-status-pending-bg shrink-0">
                <FileText className="w-5 h-5 text-status-pending" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 leading-snug">
                  {mockStudent.program}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Completa los pasos pendientes para finalizar tu inscripción
                </p>
              </div>
            </div>
          </div>

          {/* Barra de progreso */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-700">
                {validatedDocs.length} de {mockDocuments.length} documentos
                completados
              </span>
              <span className="text-sm font-bold text-status-pending">
                {mockStudent.progress}%
              </span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-2.5">
              <div
                className="bg-status-pending h-2.5 rounded-full transition-all"
                style={{ width: `${mockStudent.progress}%` }}
              />
            </div>
          </div>

          {/* Fecha límite */}
          <div className="flex items-center gap-2 text-sm text-neutral-500 pt-1 border-t border-neutral-100">
            <CalendarClock className="w-4 h-4 shrink-0 text-neutral-400" />
            <span>Fecha límite: 20 de febrero de 2025</span>
          </div>
        </div>
      </Card>

      {/* Documentación */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-neutral-900 mb-5">
          Documentación
        </h2>

        {mockDocumentGroups.map((group) => (
          <DocumentGroupSection key={group.category} group={group} />
        ))}
      </div>

      {/* Más trámites relacionados */}
      <h2 className="text-lg font-semibold text-neutral-900 mb-4">
        Más trámites relacionados con matrículas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
          <div className="p-5 flex items-start justify-between gap-3">
            <div>
              <h4 className="font-medium text-neutral-900 mb-1">
                Solicitud de variación de matrícula
              </h4>
              <p className="text-sm text-neutral-500">
                Recuerda que el período hábil para modificar tu matrícula viene
                marcado por la normativa de la universidad.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 transition-colors mt-1 shrink-0" />
          </div>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
          <div className="p-5 flex items-start justify-between gap-3">
            <div>
              <h4 className="font-medium text-neutral-900 mb-1">
                Ampliar o renovar matrícula
              </h4>
              <p className="text-sm text-neutral-500">
                Podrás realizar este proceso durante el período establecido y
                ante cualquier cuestión ponte en contacto con tu Mentor.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 transition-colors mt-1 shrink-0" />
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
