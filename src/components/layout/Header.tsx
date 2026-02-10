"use client";

import { Menu } from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-header bg-gradient-to-r from-primary-700 to-primary-500 flex items-center px-6 z-50">
      <button
        onClick={onToggleSidebar}
        className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors mr-4"
        aria-label="Toggle menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Logo UNIR */}
      <img
        src="/logo-unir.svg"
        alt="UNIR - La Universidad en Internet"
        className="h-6"
      />
    </header>
  );
}
