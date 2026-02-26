"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DocumentGroupSection } from "@/components/documents";
import { Card } from "@/components/ui/card";
import { FileText, ChevronRight, CalendarClock, ChevronDown, GraduationCap } from "lucide-react";
import {
  mockStudent,
  mockDocuments,
  mockDocumentGroups,
} from "@/data/mock-student";
import { useUploadedDocs } from "@/context/UploadedDocsContext";

const CREDITOS_RECONOCIDOS = [
  {
    cuatrimestre: "Primer Cuatrimestre",
    asignaturas: [
      { codigo: "00943", nombre: "Aprendizaje y desarrollo de la personalidad", ects: 6, estado: "Reconocida" },
      { codigo: "00946", nombre: "Dirección estratégica y herramientas visuales para la toma de decisiones", ects: 6, estado: "Reconocida" },
    ],
  },
  {
    cuatrimestre: "Segundo Cuatrimestre",
    asignaturas: [
      { codigo: "00944", nombre: "Procesos y contextos educativos", ects: 6, estado: "Susceptible de reconocimiento" },
      { codigo: "00948", nombre: "Microeconomía intermedia", ects: 6, estado: "Susceptible de reconocimiento" },
    ],
  },
];

const totalEcts = CREDITOS_RECONOCIDOS.flatMap((c) => c.asignaturas).reduce((sum, a) => sum + a.ects, 0);

export default function MatriculasPage() {
  const { uploadedDocs } = useUploadedDocs();
  const [creditosOpen, setCreditosOpen] = useState(false);

  // Docs completados = validados en mock + los recién subidos
  const validatedDocs = mockDocuments.filter((d) => d.status === "validated");
  const newlyUploaded = uploadedDocs.filter(
    (u) => !mockDocuments.find((d) => d.id === u.docId && d.status === "validated")
  );
  const completedCount = validatedDocs.length + newlyUploaded.length;
  const progress = Math.round((completedCount / mockDocuments.length) * 100);

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
                {completedCount} de {mockDocuments.length} documentos
                completados
              </span>
              <span className="text-sm font-bold text-status-pending">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-2.5">
              <div
                className="bg-status-pending h-2.5 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Créditos reconocidos — desplegable */}
          <div className="border-t border-neutral-100 pt-1">
            <button
              type="button"
              onClick={() => setCreditosOpen((o) => !o)}
              className="w-full flex items-center justify-between py-2 text-left group"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#009BDE] shrink-0" />
                <span className="text-sm font-semibold text-neutral-700">Créditos reconocidos</span>
                <span className="inline-flex items-center text-xs font-bold text-[#009BDE] bg-[#009BDE]/10 px-2 py-0.5 rounded-full">
                  {totalEcts} ECTS
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${creditosOpen ? "rotate-180" : ""}`} />
            </button>

            {creditosOpen && (
              <div className="mt-2 rounded-lg border border-neutral-200 overflow-hidden">
                {CREDITOS_RECONOCIDOS.map((cuatri, ci) => (
                  <div key={ci}>
                    <div className="px-4 py-2 bg-neutral-50 border-b border-neutral-100">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                        {cuatri.cuatrimestre}
                      </p>
                    </div>
                    {cuatri.asignaturas.map((a) => (
                      <div
                        key={a.codigo}
                        className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100 last:border-0 bg-white"
                      >
                        <span className="text-xs font-mono text-neutral-400 shrink-0 w-12">{a.codigo}</span>
                        <span className="text-sm text-neutral-800 flex-1 leading-snug">{a.nombre}</span>
                        <span className="text-xs font-semibold text-neutral-500 shrink-0">{a.ects} ECTS</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                          a.estado === "Reconocida"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-teal-50 text-teal-700"
                        }`}>
                          {a.estado}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-800 rounded-b-lg">
                  <span className="text-xs font-semibold text-white">Total reconocido</span>
                  <span className="text-xs font-bold text-white">{totalEcts} ECTS</span>
                </div>
              </div>
            )}
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
