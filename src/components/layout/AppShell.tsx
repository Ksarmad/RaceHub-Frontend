import type { ReactNode } from "react";

import { Link, useLocation } from "react-router-dom";

function AppShell({
  children,
  active,
}: {
  children: ReactNode;
  active?: "register" | "admin" | "student";
}) {

  const location = useLocation();

  const resolveActive = () => {
    if (active) return active;
    if (location.pathname.startsWith("/admin")) return "admin";
    if (location.pathname.startsWith("/student")) return "student";
    return "register";
  };

  const current = resolveActive();

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Background overlays */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(255,0,0,0.22), transparent 40%), radial-gradient(circle at 90% 10%, rgba(255,0,0,0.12), transparent 35%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      {/* Top bar */}
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-red-500/30 bg-red-600/10 shadow-[0_0_40px_rgba(255,0,0,0.18)]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-red-500/30 to-transparent blur-sm" />
            <span className="relative text-lg font-black text-red-400">RG</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm text-zinc-300">QR Game Registration</div>
            <div className="text-base font-black tracking-tight text-white">
              RaceHub
              <span className="text-red-400">.</span>
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          <NavItem to="/" label="Register" active={current === "register"} />
          <NavItem
            to="/student/dashboard"
            label="Student Dashboard"
            active={current === "student"}
          />
          <NavItem
            to="/admin/login"
            label="Admin"
            active={current === "admin"}
          />
        </nav>

        <div className="md:hidden">
          <div className="flex items-center gap-2">
            <NavPill to="/" label="Register" active={current === "register"} />
            <NavPill
              to="/admin/login"
              label="Admin"
              active={current === "admin"}
            />
          </div>
        </div>
      </header>

      <main className="relative">{children}</main>

      {/* Footer */}
      <footer className="relative mx-auto max-w-6xl px-4 pb-8 pt-10">
        <div className="flex flex-col gap-2 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} RaceHub • Built for college game events
          </span>
          <span className="text-zinc-600">
            Red/Black UI • PERN-ready architecture
          </span>
        </div>
      </footer>
    </div>
  );
}

function NavItem({
  to,
  label,
  active,
}: {
  to: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={
        "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 " +
        (active
          ? "border border-red-500/40 bg-red-600/15 text-red-200 shadow-[0_0_30px_rgba(255,0,0,0.18)]"
          : "border border-transparent bg-white/0 text-zinc-200 hover:bg-white/5 hover:border-red-500/20")
      }
    >
      {label}
    </Link>
  );
}

function NavPill({
  to,
  label,
  active,
}: {
  to: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={
        "rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 " +
        (active
          ? "border border-red-500/40 bg-red-600/15 text-red-200"
          : "border border-red-500/20 bg-white/5 text-zinc-200 hover:bg-white/10")
      }
    >
      {label}
    </Link>
  );
}

export default AppShell;

