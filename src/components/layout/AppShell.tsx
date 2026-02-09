"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  studentName: string;
}

export function AppShell({ children, studentName }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="h-header" />
      <Sidebar isOpen={sidebarOpen} studentName={studentName} />
      <main
        className={cn(
          "pt-6 pb-12 px-6 transition-all duration-300",
          sidebarOpen ? "ml-sidebar" : "ml-0"
        )}
      >
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
