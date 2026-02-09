"use client";

import { Menu } from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="h-header w-full bg-gradient-to-r from-primary-700 to-primary-500 flex items-center px-6">
      <button
        onClick={onToggleSidebar}
        className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors mr-4"
        aria-label="Toggle menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Logo UNIR */}
      <div className="flex items-center gap-2">
        <span className="text-white text-2xl font-bold tracking-tight">
          unir
        </span>
        <span className="text-white/70 text-[10px] leading-tight uppercase">
          La Universidad
          <br />
          en Internet
        </span>
      </div>
    </header>
  );
}
