"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  ClipboardList,
  Mail,
  MessageCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  studentName: string;
}

const mainNavItems = [
  { href: "/espacio", label: "Mi espacio", icon: Home },
  { href: "/tramites", label: "Trámites", icon: ClipboardList },
  { href: "/correo", label: "Correo", icon: Mail },
  { href: "/chats", label: "Chats", icon: MessageCircle },
];

const secondaryNavItems = [
  { href: "/mentor", label: "Mi mentor" },
  { href: "/matriculas", label: "Mi documentación" },
  { href: "/carne", label: "Carné de estudiante" },
];

const footerNavItems = [
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/noticias", label: "Noticias" },
  { href: "/app", label: "Conoce la App" },
  { href: "/estudia", label: "Estudia con nosotros" },
];

export function Sidebar({ isOpen, studentName }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed top-header left-0 h-[calc(100vh-var(--spacing-header))] bg-white border-r border-neutral-200 transition-transform duration-300 z-40 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "w-sidebar"
      )}
    >
      {/* Perfil del estudiante */}
      <div className="p-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold text-sm">
            {studentName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              {studentName}
            </p>
            <Link
              href="/perfil"
              className="text-xs text-secondary-500 hover:underline"
            >
              Mi perfil
            </Link>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-1 px-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-primary-50 text-primary-700 font-semibold"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Links secundarios */}
        <ul className="mt-4 px-2 space-y-1 border-t border-neutral-100 pt-4">
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-sm rounded-lg transition-colors",
                    isActive
                      ? "text-primary-700 font-semibold"
                      : "text-neutral-600 hover:text-neutral-900"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Links footer */}
        <ul className="mt-4 px-2 space-y-1 border-t border-neutral-100 pt-4">
          {footerNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-3 py-2 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Salir */}
      <div className="p-2 border-t border-neutral-100">
        <button className="flex items-center gap-3 px-3 py-2.5 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg w-full transition-colors">
          <LogOut className="w-5 h-5" />
          Salir
        </button>
      </div>
    </aside>
  );
}
