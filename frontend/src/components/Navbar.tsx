import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ShoppingBag, Menu as MenuIcon, X, User as UserIcon, Globe, LogOut, Shield } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import i18n from "@/i18n";

export function Navbar() {
  const { t } = useTranslation();
  const count = useCart((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });

  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/menu", label: t("nav.menu") },
    ...(isAuthenticated ? [{ to: "/orders", label: t("nav.orders") }] : []),
    ...(isAdmin ? [{ to: "/admin", label: t("nav.admin") }] : []),
  ];

  const toggleLang = () => {
    const next = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(next);
  };

  return (
    <header className="sticky top-0 z-40 glass border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-glow">
              <ShoppingBag className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Elctr<span className="text-gradient">Order</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => {
              const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface transition"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
              {i18n.language === "ar" ? "EN" : "ع"}
            </button>

            <Link
              to="/cart"
              className="relative rounded-lg p-2 hover:bg-surface transition"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg bg-surface px-3 py-1.5">
                  {isAdmin ? <Shield className="h-4 w-4 text-primary" /> : <UserIcon className="h-4 w-4" />}
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <button onClick={logout} className="rounded-lg p-2 hover:bg-surface" aria-label="Sign out">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
              >
                {t("nav.login")}
              </Link>
            )}

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden rounded-lg p-2 hover:bg-surface"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden py-3 border-t border-border/60 animate-slide-up">
            <div className="flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface"
                >
                  {n.label}
                </Link>
              ))}
              <button
                onClick={toggleLang}
                className="text-start rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface"
              >
                <Globe className="inline h-4 w-4 me-2" />
                {i18n.language === "ar" ? "English" : "العربية"}
              </button>
              {isAuthenticated ? (
                <button onClick={() => { logout(); setOpen(false); }} className="text-start rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface">
                  <LogOut className="inline h-4 w-4 me-2" />
                  {t("nav.logout")}
                </button>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg gradient-primary px-3 py-2 text-sm font-semibold text-primary-foreground text-center">
                  {t("nav.login")}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
