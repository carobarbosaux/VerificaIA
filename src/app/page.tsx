"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Phone,
  LogOut,
  ChevronDown,
  Info,
  Check,
} from "lucide-react";

const STEPS = [
  { label: "SELECCIÓN DE\nESTUDIOS" },
  { label: "PAGO\nRESERVA" },
  { label: "CONFIRMACIÓN\nRESERVA" },
  { label: "DATOS\nPERSONALES" },
  { label: "DATOS\nACADÉMICOS" },
  { label: "PAGO\nMATRÍCULA" },
  { label: "DOCUMENTACIÓN" },
];

const ITINERARIOS = ["Bilingüe", "Presencial", "Online"];

const MENCIONES = [
  "Título Técnico Superior de Formación Profesional, Enseñanzas Artísticas, Deportivas, o equivalente.",
  "Títulos oficiales españoles de Grado, o equivalente, y de Máster Universitario",
];

type EstadoAsignatura = "reconocida" | "no_presentada" | "susceptible";

interface Asignatura {
  codigo: string;
  nombre: string;
  ects: number;
  tipo: string;
  estado: EstadoAsignatura;
}

interface Cuatrimestre {
  label: string;
  asignaturas: Asignatura[];
}

const CUATRIMESTRES: Cuatrimestre[] = [
  {
    label: "PRIMER CUATRIMESTRE",
    asignaturas: [
      { codigo: "00943", nombre: "Aprendizaje y desarrollo de la personalidad", ects: 6, tipo: "Obligatoria", estado: "reconocida" },
      { codigo: "00944", nombre: "Procesos y contextos educativos", ects: 6, tipo: "Obligatoria", estado: "susceptible" },
      { codigo: "00945", nombre: "Sociedad, familia y educación", ects: 6, tipo: "Obligatoria", estado: "no_presentada" },
    ],
  },
  {
    label: "SEGUNDO CUATRIMESTRE",
    asignaturas: [
      { codigo: "00946", nombre: "Dirección estratégica y herramientas visuales para la toma de decisiones", ects: 6, tipo: "Obligatoria", estado: "reconocida" },
      { codigo: "00947", nombre: "Análisis dinámico", ects: 6, tipo: "Obligatoria", estado: "no_presentada" },
      { codigo: "00948", nombre: "Microeconomía intermedia", ects: 6, tipo: "Obligatoria", estado: "susceptible" },
    ],
  },
];

function EstadoBadge({ estado }: { estado: EstadoAsignatura }) {
  if (estado === "reconocida") {
    return (
      <span className="inline-flex items-center text-xs font-semibold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full">
        Reconocida
      </span>
    );
  }
  if (estado === "susceptible") {
    return (
      <span className="text-xs text-neutral-500">
        Susceptible de{" "}
        <mark className="bg-amber-100 text-amber-800 px-0.5 rounded font-semibold not-italic">
          recono
        </mark>
        cimiento
      </span>
    );
  }
  return <span className="text-xs text-neutral-400 italic">No presentada</span>;
}

function AsignaturaRow({ asignatura }: { asignatura: Asignatura }) {
  const isReconocida = asignatura.estado === "reconocida";
  const isSusceptible = asignatura.estado === "susceptible";

  return (
    <div className={`flex items-start gap-4 px-5 py-4 border-b border-neutral-100 last:border-0 transition-colors ${
      isSusceptible ? "bg-teal-50/40" : "bg-white hover:bg-neutral-50/50"
    }`}>
      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
        isReconocida || isSusceptible
          ? "border-teal-500 bg-teal-50"
          : "border-neutral-300 bg-white"
      }`}>
        {(isReconocida || isSusceptible) && (
          <Check className="w-3.5 h-3.5 text-teal-600" strokeWidth={3} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <span className="text-xs font-mono text-neutral-400 shrink-0">{asignatura.codigo}</span>
          <span className="text-sm font-medium text-neutral-900 leading-snug">{asignatura.nombre}</span>
        </div>
        <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
          <span className="text-xs text-neutral-500 font-medium">{asignatura.ects} ECTS</span>
          <span className="text-neutral-200 text-xs">·</span>
          <span className="text-xs text-neutral-400">{asignatura.tipo}</span>
          <span className="text-neutral-200 text-xs">·</span>
          <EstadoBadge estado={asignatura.estado} />
        </div>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
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
  );
}

function PageFooter() {
  return (
    <footer className="bg-neutral-800 text-neutral-400 text-xs px-8 py-5 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex gap-5">
        <button className="hover:text-white transition-colors">Aviso Legal</button>
        <button className="hover:text-white transition-colors">Política de privacidad</button>
        <button className="hover:text-white transition-colors">Política de Cookies</button>
      </div>
      <span className="flex items-center gap-1">🇪🇸 Español</span>
    </footer>
  );
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
                {/* Row with lines and circle */}
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
                {/* Label below */}
                <div className={`mt-1.5 text-center px-1 w-full`}>
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

export default function ReconocimientoPage() {
  const router = useRouter();
  const [itinerario, setItinerario] = useState("Bilingüe");
  const [mencion, setMencion] = useState("");
  const [itinerarioOpen, setItinerarioOpen] = useState(false);
  const [mencionOpen, setMencionOpen] = useState(false);

  const canContinue = mencion !== "";

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <PageHeader />
      <Stepper activeStep={4} />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Title block */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
              Asignaturas · Créditos 2/3
            </p>
            <h1 className="text-xl font-bold text-neutral-900 leading-snug mb-2">
              Formulario de Matriculación
            </h1>
            <h2 className="text-base font-medium text-neutral-700 leading-snug mb-2">
              Formación del Profesorado de Educación Secundaria Obligatoria y Bachillerato,
              Formación Profesional y Enseñanzas de Idiomas
            </h2>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="font-medium text-neutral-500">UNIR ES</span>
              <span>·</span>
              <span>Otoño 2023</span>
              <span>·</span>
              <span>20-10-2023</span>
            </div>
          </div>

          {/* Credits badge */}
          <div className="inline-flex items-center gap-2 bg-[#009BDE]/10 text-[#0077aa] text-sm font-semibold px-3 py-1.5 rounded-full mb-6 border border-[#009BDE]/20">
            Créditos ofertados: 48 ECTS
          </div>

          {/* Form card */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm mb-5">
            <div className="px-6 py-5 space-y-5">
              {/* Itinerario */}
              <div className="relative">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                    Itinerario del estudio
                  </label>
                  <span className="text-[10px] text-[#009BDE] font-medium">(Obligatorio)</span>
                  <Info className="w-3.5 h-3.5 text-neutral-400 ml-0.5" />
                </div>
                <button
                  type="button"
                  onClick={() => { setItinerarioOpen((o) => !o); setMencionOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 border rounded-lg text-sm bg-white transition-all ${
                    itinerarioOpen
                      ? "border-[#009BDE] ring-2 ring-[#009BDE]/20"
                      : "border-neutral-300 hover:border-neutral-400"
                  }`}
                >
                  <span className="text-neutral-800 font-medium">{itinerario}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${itinerarioOpen ? "rotate-180" : ""}`} />
                </button>
                {itinerarioOpen && (
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden">
                    {ITINERARIOS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => { setItinerario(opt); setItinerarioOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                          itinerario === opt
                            ? "bg-[#009BDE]/5 text-[#009BDE] font-semibold"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        {itinerario === opt && <Check className="w-3.5 h-3.5 text-[#009BDE]" />}
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mención */}
              <div className="relative">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                    Mención del estudio
                  </label>
                  <Info className="w-3.5 h-3.5 text-neutral-400 ml-0.5" />
                </div>
                <button
                  type="button"
                  onClick={() => { setMencionOpen((o) => !o); setItinerarioOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 border rounded-lg text-sm bg-white transition-all ${
                    mencionOpen
                      ? "border-[#009BDE] ring-2 ring-[#009BDE]/20"
                      : mencion
                      ? "border-neutral-300"
                      : "border-neutral-300 hover:border-neutral-400"
                  }`}
                >
                  <span className={`text-left flex-1 pr-2 leading-snug ${mencion ? "text-neutral-800 font-medium" : "text-neutral-400"}`}>
                    {mencion || "Selecciona una opción"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${mencionOpen ? "rotate-180" : ""}`} />
                </button>
                {mencionOpen && (
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden">
                    {MENCIONES.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => { setMencion(opt); setMencionOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors border-b border-neutral-100 last:border-0 flex items-start gap-3 ${
                          mencion === opt
                            ? "bg-[#009BDE]/5 text-[#009BDE] font-semibold"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        <span className="flex-1 leading-snug">{opt}</span>
                        <Info className="w-4 h-4 text-[#009BDE]/60 shrink-0 mt-0.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Listado de asignaturas — sin mención */}
          {!mencion && (
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden mb-6">
              <div className="px-5 py-3.5 bg-neutral-50 border-b border-neutral-200">
                <p className="text-sm font-semibold text-neutral-700">Listado de asignaturas</p>
              </div>
              <div className="px-5 py-12 text-center">
                <p className="text-sm text-neutral-400">
                  Selecciona una <span className="font-medium text-neutral-500">mención del estudio</span> para ver las asignaturas disponibles.
                </p>
              </div>
            </div>
          )}

          {/* Listado de asignaturas — con mención */}
          {mencion && (
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden mb-6">
              <div className="px-5 py-3.5 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
                <p className="text-sm font-semibold text-neutral-700">Listado de asignaturas</p>
                <p className="text-xs text-neutral-400">
                  Mín. <span className="font-semibold text-neutral-600">10 ECTS</span> · Máx. <span className="font-semibold text-neutral-600">90 ECTS</span>
                </p>
              </div>

              {CUATRIMESTRES.map((cuatri) => (
                <div key={cuatri.label}>
                  <div className="px-5 py-2.5 bg-neutral-50/80 border-b border-neutral-100">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      {cuatri.label}
                    </p>
                  </div>
                  {cuatri.asignaturas.map((a) => (
                    <AsignaturaRow key={a.codigo} asignatura={a} />
                  ))}
                </div>
              ))}

              <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-800 rounded-b-xl">
                <p className="text-sm font-semibold text-white">Total de créditos</p>
                <p className="text-sm font-bold text-white">36 ECTS</p>
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            type="button"
            onClick={() => { if (canContinue) router.push("/upload"); }}
            disabled={!canContinue}
            className={`w-full py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${
              canContinue
                ? "bg-[#009BDE] hover:bg-[#007BB5] text-white shadow-sm hover:shadow-md"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
          >
            Continuar
          </button>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
