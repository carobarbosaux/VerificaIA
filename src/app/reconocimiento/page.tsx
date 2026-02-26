"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Phone,
  LogOut,
  ChevronDown,
  Info,
  Plus,
} from "lucide-react";

const STEPS = [
  "SELECCIÓN DE ESTUDIOS",
  "PAGO RESERVA",
  "CONFIRMACIÓN RESERVA",
  "DATOS PERSONALES",
  "DATOS ACADÉMICOS",
  "PAGO MATRÍCULA",
  "DOCUMENTACIÓN",
];

const ITINERARIOS = ["Bilingüe", "Presencial", "Online"];

const MENCIONES = [
  "Título Técnico Superior de Formación Profesional, Enseñanzas Artísticas, Deportivas, o equivalente.",
  "Títulos oficiales españoles de Grado, o equivalente, y de Máster Universitario",
];

const GRUPOS = [
  { label: "Selección de asignaturas", ects: 42, pendientes: 42 },
  { label: "Asignaturas optativas", ects: 24, pendientes: 24 },
  { label: "Prácticas y trabajo final", ects: 21, pendientes: 21 },
];

export default function ReconocimientoPage() {
  const router = useRouter();
  const [itinerario, setItinerario] = useState("Bilingüe");
  const [mencion, setMencion] = useState("");
  const [itinerarioOpen, setItinerarioOpen] = useState(false);
  const [mencionOpen, setMencionOpen] = useState(false);

  const canContinue = mencion !== "";

  const handleSiguiente = () => {
    if (canContinue) router.push("/upload");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-200 px-8 py-4 flex items-center justify-between">
        <img
          src="/logolightunir.svg"
          alt="UNIR - La Universidad en Internet"
          className="h-8"
        />
        <div className="flex items-center gap-6 text-sm text-neutral-600">
          <span className="flex items-center gap-1.5">
            <Phone className="w-4 h-4" />
            +34 941 209 743
          </span>
          <button className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors">
            <LogOut className="w-4 h-4" />
            DESCONECTAR
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-neutral-900 mb-8">
          Formulario de Matriculación
        </h1>

        {/* Stepper — paso 5 activo */}
        <div className="flex items-start gap-0 mb-10 overflow-x-auto pb-2">
          {STEPS.map((step, i) => {
            const isActive = i === 4; // DATOS ACADÉMICOS
            const isDone = i < 4;
            return (
              <div key={step} className="flex flex-col items-center min-w-[80px]">
                <div className="flex items-center w-full">
                  {i > 0 && <div className="flex-1 h-0.5 bg-neutral-300" />}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2 ${
                      isActive
                        ? "border-[#009BDE] bg-white text-[#009BDE]"
                        : isDone
                        ? "border-neutral-400 bg-neutral-400 text-white"
                        : "border-neutral-300 bg-white text-neutral-400"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-bold">{i + 1}</span>
                    )}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-0.5 bg-neutral-300" />
                  )}
                </div>
                <span
                  className={`text-[9px] font-semibold uppercase tracking-wide mt-1.5 text-center leading-tight ${
                    isActive ? "text-[#009BDE]" : "text-neutral-400"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div className="max-w-xl mx-auto">
          {/* Breadcrumb */}
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
            ASIGNATURAS · CRÉDITOS 2/3
          </p>

          {/* Program title */}
          <h2 className="text-xl font-semibold text-neutral-900 leading-snug mb-1">
            Formación del Profesorado de Educación Secundaria Obligatoria y
            Bachillerato, Formación Profesional y Enseñanzas de Idiomas
          </h2>
          <div className="flex items-center gap-3 text-xs text-neutral-500 mb-4">
            <span>UNIR ES</span>
            <span className="text-neutral-300">|</span>
            <span>Otoño 2023</span>
            <span className="text-neutral-300">|</span>
            <span>20-10-2023</span>
          </div>

          <p className="text-base font-semibold text-neutral-800 mb-5">
            Créditos ofertados 48 (ECTS)
          </p>

          {/* Itinerario dropdown */}
          <div className="mb-4 relative">
            <label className="block text-xs text-neutral-500 mb-1 flex items-center gap-1">
              Itinerario del estudio (Obligatorio)
              <Info className="w-3.5 h-3.5 text-neutral-400" />
            </label>
            <button
              type="button"
              onClick={() => {
                setItinerarioOpen((o) => !o);
                setMencionOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 border border-neutral-300 rounded-lg text-sm text-neutral-900 bg-white hover:border-neutral-400 transition-colors"
            >
              <span>{itinerario}</span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 transition-transform ${itinerarioOpen ? "rotate-180" : ""}`}
              />
            </button>
            {itinerarioOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden">
                {ITINERARIOS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setItinerario(opt);
                      setItinerarioOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-50 transition-colors ${
                      itinerario === opt ? "text-[#009BDE] font-medium" : "text-neutral-700"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mención dropdown */}
          <div className="mb-6 relative">
            <label className="block text-xs text-neutral-500 mb-1 flex items-center gap-1">
              Mención del estudio
              <Info className="w-3.5 h-3.5 text-neutral-400" />
            </label>
            <button
              type="button"
              onClick={() => {
                setMencionOpen((o) => !o);
                setItinerarioOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 border border-neutral-300 rounded-lg text-sm bg-white hover:border-neutral-400 transition-colors"
            >
              <span className={`truncate text-left flex-1 ${mencion ? "text-neutral-900" : "text-neutral-400"}`}>
                {mencion || "Selecciona una opción"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 ml-2 shrink-0 transition-transform ${mencionOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mencionOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden">
                {MENCIONES.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setMencion(opt);
                      setMencionOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0 flex items-start justify-between gap-3 ${
                      mencion === opt ? "text-[#009BDE] font-medium" : "text-neutral-700"
                    }`}
                  >
                    <span>{opt}</span>
                    <Info className="w-4 h-4 text-[#009BDE] shrink-0 mt-0.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Listado de asignaturas */}
          <div className="border border-neutral-200 rounded-lg overflow-hidden mb-6">
            <div className="bg-neutral-50 px-5 py-4 border-b border-neutral-200">
              <p className="text-sm font-semibold text-neutral-800">
                Listado de asignaturas
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Selecciona un <span className="font-semibold">mínimo de 10 ECTS</span> y un{" "}
                <span className="font-semibold">máximo de 90 ECTS</span>.
              </p>
            </div>
            {GRUPOS.map((g, i) => (
              <div
                key={g.label}
                className={`flex items-center justify-between px-5 py-4 ${
                  i < GRUPOS.length - 1 ? "border-b border-neutral-200" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-neutral-800">{g.label}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {g.ects} ECTS &nbsp;·&nbsp; {g.pendientes} pendientes
                  </p>
                </div>
                <button className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center hover:border-[#009BDE] hover:text-[#009BDE] transition-colors text-neutral-400">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="flex items-center justify-between px-5 py-3 bg-neutral-50 border-t border-neutral-200">
              <p className="text-sm font-semibold text-neutral-800">Total de créditos</p>
              <p className="text-sm font-semibold text-neutral-800">0 ECTS</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide border border-[#009BDE] text-[#009BDE] hover:bg-blue-50 transition-colors"
            >
              ANTERIOR
            </button>
            <button
              type="button"
              onClick={handleSiguiente}
              disabled={!canContinue}
              className={`flex-1 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-colors ${
                canContinue
                  ? "bg-[#009BDE] hover:bg-[#007BB5] text-white cursor-pointer"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
            >
              SIGUIENTE
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-800 text-neutral-400 text-xs px-8 py-5 flex items-center justify-between">
        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-white transition-colors">Aviso Legal</span>
          <span className="cursor-pointer hover:text-white transition-colors">Política de privacidad</span>
          <span className="cursor-pointer hover:text-white transition-colors">Política de Cookies</span>
        </div>
        <span>🇪🇸 Español</span>
      </footer>
    </div>
  );
}
