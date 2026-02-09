"use client";

import { AppShell } from "@/components/layout/AppShell";
import { DocumentGroupSection } from "@/components/documents";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronRight } from "lucide-react";
import {
  mockStudent,
  mockDocuments,
  mockDocumentGroups,
} from "@/data/mock-student";

export default function MatriculasPage() {
  const pendingDocs = mockDocuments.filter(
    (d) =>
      d.status === "not_uploaded" ||
      d.status === "pending" ||
      d.status === "rejected"
  );
  const validatedDocs = mockDocuments.filter((d) => d.status === "validated");

  return (
    <AppShell studentName={mockStudent.name}>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">
        Mi documentación
      </h1>

      {/* Estado de Matrícula */}
      <Card className="mb-6 border-l-4 border-l-status-pending">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-status-pending" />
                Estado de tu Matrícula
              </h3>
              <p className="text-neutral-600 mb-3">
                Completa los pasos pendientes para finalizar tu inscripción
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-neutral-500">Paso actual:</span>
                  <span className="ml-2 font-semibold text-status-pending">
                    {mockStudent.enrollmentStep} de {mockStudent.totalSteps} -
                    Documentación
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500">Progreso:</span>
                  <span className="ml-2 font-semibold">
                    {mockStudent.progress}%
                  </span>
                </div>
              </div>
              <div className="mt-3 w-full bg-neutral-100 rounded-full h-2">
                <div
                  className="bg-status-pending h-2 rounded-full transition-all"
                  style={{ width: `${mockStudent.progress}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-status-pending-bg border-2 border-status-pending/20">
              <span className="text-xl font-bold text-status-pending">
                {mockStudent.enrollmentStep}/{mockStudent.totalSteps}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentación */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">
            Documentación
          </h2>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-neutral-500">
              {validatedDocs.length}/{mockDocuments.length} documentos
              completados
            </span>
            {pendingDocs.length > 0 && (
              <Badge variant="pending">{pendingDocs.length} pendientes</Badge>
            )}
          </div>
        </div>

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
          <CardContent className="p-5 flex items-start justify-between">
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
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
          <CardContent className="p-5 flex items-start justify-between">
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
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
