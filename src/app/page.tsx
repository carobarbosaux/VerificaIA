"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ReminderWidget } from "@/components/dashboard/ReminderWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Calendar,
  BookOpen,
  CreditCard,
  User,
  MessageSquare,
  Settings,
  HelpCircle,
} from "lucide-react";
import { mockStudent, mockEnrollments } from "@/data/mock-student";
import { EnrollmentCard } from "@/components/dashboard/EnrollmentCard";
import Link from "next/link";

const quickAccessItems = [
  {
    href: "/matriculas",
    label: "Mis Documentos",
    description: "Gestiona tu documentación",
    icon: FileText,
    iconColor: "text-status-pending",
    highlight: true,
    badge: "7 pendientes",
  },
  {
    href: "/asignaturas",
    label: "Mis Asignaturas",
    description: "Accede a tus cursos",
    icon: BookOpen,
    iconColor: "text-primary-400",
  },
  {
    href: "/calendario",
    label: "Calendario",
    description: "Fechas importantes",
    icon: Calendar,
    iconColor: "text-status-validated",
  },
  {
    href: "/pagos",
    label: "Pagos",
    description: "Gestiona tus pagos",
    icon: CreditCard,
    iconColor: "text-purple-600",
  },
  {
    href: "/perfil",
    label: "Mi Perfil",
    description: "Datos personales",
    icon: User,
    iconColor: "text-primary-300",
  },
  {
    href: "/mensajes",
    label: "Mensajes",
    description: "Centro de mensajes",
    icon: MessageSquare,
    iconColor: "text-pink-600",
  },
  {
    href: "/ayuda",
    label: "Ayuda",
    description: "Soporte y tutoriales",
    icon: HelpCircle,
    iconColor: "text-status-pending",
  },
  {
    href: "/configuracion",
    label: "Configuración",
    description: "Ajustes de cuenta",
    icon: Settings,
    iconColor: "text-neutral-500",
  },
];

export default function DashboardPage() {
  return (
    <AppShell studentName={mockStudent.name}>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Mi espacio</h1>
      <p className="text-neutral-600 mb-6">
        Bienvenida, {mockStudent.name.split(" ")[0]}. Aquí tienes un resumen de
        tu actividad.
      </p>

      {/* Toast de recordatorio */}
      <div className="mb-6">
        <ReminderWidget />
      </div>

      {/* Tus matrículas */}
      <h2 className="text-lg font-semibold text-neutral-900 mb-4">
        Tus matrículas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {mockEnrollments.map((enrollment) => (
          <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
        ))}
      </div>

      {/* Accesos Rápidos */}
      <h2 className="text-lg font-semibold text-neutral-900 mb-4">
        Accesos Rápidos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickAccessItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Card
                className={`hover:shadow-md transition-shadow cursor-pointer h-full ${
                  item.highlight
                    ? "border-2 border-status-pending/30 bg-status-pending-bg/30"
                    : ""
                }`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                    {item.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600">{item.description}</p>
                  {item.badge && (
                    <Badge variant="pending" className="mt-2">
                      {item.badge}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
