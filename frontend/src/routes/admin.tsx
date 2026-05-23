import { createFileRoute, Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Package, ShoppingBag, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/Navbar";
import { RequireAuth } from "@/components/RequireAuth";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: () => (
    <RequireAuth adminOnly>
      <AdminLayout />
    </RequireAuth>
  ),
});

function AdminLayout() {
  const { t } = useTranslation();
  const path = useRouterState({ select: (r) => r.location.pathname });
  const navigate = useNavigate();
  const { logout } = useAuth();

  const items = [
    { to: "/admin", label: t("admin.title"), icon: LayoutDashboard, exact: true },
    { to: "/admin/products", label: t("admin.products"), icon: Package },
    { to: "/admin/orders", label: t("admin.orders"), icon: ShoppingBag },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 grid gap-6 md:grid-cols-[220px_1fr]">
        <aside className="md:sticky md:top-20 h-fit rounded-2xl bg-card border border-border/60 p-3">
          <nav className="flex md:flex-col gap-1 overflow-x-auto scrollbar-hide">
            {items.map((it) => {
              const active = it.exact ? path === it.to : path.startsWith(it.to);
              const Icon = it.icon;
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium whitespace-nowrap transition",
                    active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-surface hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {it.label}
                </Link>
              );
            })}
            <button
              onClick={() => { logout(); navigate({ to: "/" }); }}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              <LogOut className="h-4 w-4" /> {t("nav.logout")}
            </button>
          </nav>
        </aside>
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
