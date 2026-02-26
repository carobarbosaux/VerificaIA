"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  X,
  FileText,
  Trash2,
  CheckCircle2,
  Phone,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useUploadedDocs } from "@/context/UploadedDocsContext";

const ALL_REQUIRED_DOCS = [
  "Curriculum Vitae",
  "Fotocopia del documento de identificación",
  "Contrato de financiación de Grado en Economía",
  "Autorización de gestión de datos - RGPD",
  "Matrícula Grado en Economía",
];

const STEPS = [
  { label: "SELECCIÓN DE\nESTUDIOS" },
  { label: "PAGO\nRESERVA" },
  { label: "CONFIRMACIÓN\nRESERVA" },
  { label: "DATOS\nPERSONALES" },
  { label: "DATOS\nACADÉMICOS" },
  { label: "PAGO\nMATRÍCULA" },
  { label: "DOCUMENTACIÓN" },
];

const SIMULATED_FILES = [
  { docId: "doc-2", name: "CV_Laura_Hernandez.pdf", size: 245760 },
  { docId: "doc-4", name: "Certificado_de_notas.pdf", size: 184320 },
  { docId: "doc-7", name: "Comprobante_pago_matricula.pdf", size: 102400 },
];

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Stepper({ activeStep }: { activeStep: number }) {
  return (
    <div className="bg-white border-b border-neutral-100 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-start">
        {STEPS.map((step, i) => {
          const isActive = i === activeStep;
          const isDone = i < activeStep;
          return (
            <div key={i} className="flex items-start flex-1 min-w-0">
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center w-full">
                  <div className={`flex-1 h-px ${i === 0 ? "opacity-0" : isDone || isActive ? "bg-neutral-300" : "bg-neutral-200"}`} />
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border-2 transition-all ${
                    isActive
                      ? "border-[#009BDE] bg-[#009BDE] text-white shadow-sm shadow-[#009BDE]/30"
                      : isDone
                      ? "border-neutral-400 bg-neutral-400 text-white"
                      : "border-neutral-200 bg-white text-neutral-400"
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : <span>{i + 1}</span>}
                  </div>
                  <div className={`flex-1 h-px ${i === STEPS.length - 1 ? "opacity-0" : isDone ? "bg-neutral-300" : "bg-neutral-200"}`} />
                </div>
                <div className="mt-1.5 text-center px-1 w-full">
                  <span className={`text-[8.5px] font-semibold uppercase tracking-wider leading-tight whitespace-pre-line block ${
                    isActive ? "text-[#009BDE]" : isDone ? "text-neutral-400" : "text-neutral-300"
                  }`}>
                    {step.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function UploadPage() {
  const router = useRouter();
  const { addUploadedDoc } = useUploadedDocs();
  const [filesLoaded, setFilesLoaded] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleSimulateUpload = () => {
    if (!filesLoaded) setFilesLoaded(true);
  };

  const handleRemoveFile = () => {
    setFilesLoaded(false);
  };

  const handleContinue = () => {
    for (const sf of SIMULATED_FILES) {
      addUploadedDoc({
        docId: sf.docId,
        fileName: sf.name,
        fileSize: sf.size,
        uploadedAt: new Date().toISOString(),
      });
    }
    router.push("/espacio");
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-8 h-16 flex items-center justify-between">
        <img src="/logolightunir.svg" alt="UNIR" className="h-8" />
        <div className="flex items-center gap-6 text-sm text-neutral-500">
          <a href="tel:+34941209743" className="flex items-center gap-1.5 hover:text-neutral-700 transition-colors">
            <Phone className="w-4 h-4" />
            <span>+34 941 209 743</span>
          </a>
          <button className="flex items-center gap-1.5 hover:text-neutral-700 transition-colors font-medium tracking-wide text-xs uppercase">
            <LogOut className="w-4 h-4" />
            Desconectar
          </button>
        </div>
      </header>

      <Stepper activeStep={6} />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-neutral-900 mb-1">Formulario de Matriculación</h1>
            <p className="text-sm text-neutral-500">Paso final: adjunta los documentos requeridos para completar tu matriculación.</p>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#009BDE]" />
                <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wide">Subir documentos</h2>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-neutral-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
                  Documentos obligatorios
                </p>
                <ul className="space-y-1.5">
                  {ALL_REQUIRED_DOCS.map((doc) => (
                    <li key={doc} className="flex items-start gap-2 text-sm text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0 mt-2" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              {!filesLoaded && (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setDragOver(false); handleSimulateUpload(); }}
                  onClick={handleSimulateUpload}
                  className={`border-2 border-dashed rounded-xl px-6 py-10 text-center cursor-pointer transition-all ${
                    dragOver
                      ? "border-[#009BDE] bg-[#009BDE]/5"
                      : "border-neutral-200 hover:border-[#009BDE]/50 hover:bg-neutral-50/80"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors ${
                    dragOver ? "bg-[#009BDE]/10" : "bg-neutral-100"
                  }`}>
                    <Upload className={`w-5 h-5 transition-colors ${dragOver ? "text-[#009BDE]" : "text-neutral-400"}`} />
                  </div>
                  <p className="text-sm text-neutral-600 mb-0.5">
                    Arrastra tus archivos o{" "}
                    <span className="text-[#009BDE] font-semibold underline underline-offset-2">haz click</span>{" "}
                    para buscarlos
                  </p>
                  <p className="text-xs text-neutral-400">Límite de peso máximo: 5 MB por archivo</p>
                </div>
              )}

              {filesLoaded && (
                <div className="space-y-2">
                  {SIMULATED_FILES.map((sf) => (
                    <div
                      key={sf.docId}
                      className="flex items-center gap-3 px-4 py-3 bg-neutral-50 rounded-lg border border-neutral-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#009BDE]/10 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-[#009BDE]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-800 truncate">{sf.name}</p>
                        <p className="text-xs text-neutral-400">{formatSize(sf.size)}</p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <button
                        onClick={handleRemoveFile}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-neutral-400 hover:text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {filesLoaded && (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">Documentos listos</p>
                    <p className="text-xs text-emerald-600">Todos los archivos han sido cargados correctamente.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
              <button
                onClick={handleContinue}
                disabled={!filesLoaded}
                className={`w-full py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${
                  filesLoaded
                    ? "bg-[#009BDE] hover:bg-[#007BB5] text-white shadow-sm hover:shadow-md"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-neutral-800 text-neutral-400 text-xs px-8 py-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-5">
          <button className="hover:text-white transition-colors">Aviso Legal</button>
          <button className="hover:text-white transition-colors">Política de privacidad</button>
          <button className="hover:text-white transition-colors">Política de Cookies</button>
        </div>
        <span>🇪🇸 Español</span>
      </footer>
    </div>
  );
}
