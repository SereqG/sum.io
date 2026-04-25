"use client";

import { useState, useRef, useEffect } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Flame, Settings, LogOut, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    await signOut();
    router.push("/sign-in");
  }

  const initials = user?.firstName?.[0] ?? user?.emailAddresses[0]?.emailAddress[0] ?? "U";

  return (
    <nav className="glass sticky top-0 z-50 flex items-center justify-between px-6 py-3">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Flame className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold tracking-tight">
          sum<span className="gradient-text">.io</span>
        </span>
      </div>

      {/* User menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary"
          aria-expanded={open}
          aria-haspopup="true"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase">
            {initials}
          </span>
          <span className="hidden sm:block max-w-[140px] truncate text-foreground">
            {user?.firstName ?? user?.emailAddresses[0]?.emailAddress}
          </span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="glass absolute right-0 mt-2 w-48 rounded-xl py-1 shadow-lg">
            <button
              onClick={() => { router.push("/dashboard/settings"); setOpen(false); }}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
            >
              <Settings className="h-4 w-4" />
              Ustawienia
            </button>
            <div className="my-1 border-t border-border" />
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-secondary transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Wyloguj się
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
