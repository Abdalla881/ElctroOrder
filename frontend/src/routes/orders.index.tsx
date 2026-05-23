import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { ShoppingBag } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";
import { RequireAuth } from "@/components/RequireAuth";
import { getOrders } from "@/services/orderService";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders/")({
  component: () => (
    <RequireAuth>
      <OrdersPage />
    </RequireAuth>
  ),
});

const statusStyles: Record<string, string> = {
  preparing: "bg-amber-500/15 text-amber-400",
  onway: "bg-blue-500/15 text-blue-400",
  delivered: "bg-success/15 text-success",
};

function OrdersPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data, isLoading } = useQuery({ queryKey: ["orders"], queryFn: getOrders });
  const mine = (data ?? []).filter((o) => o.userId === user?.id);

  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-extrabold">{t("nav.orders")}</h1>

        {isLoading ? (
          <div className="mt-8 h-40 rounded-2xl bg-card border border-border/60 animate-pulse" />
        ) : mine.length === 0 ? (
          <div className="mt-12 text-center text-muted-foreground">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-surface mb-4">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <p>No orders yet.</p>
            <Link to="/menu" className="mt-4 inline-flex rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              {t("cart.browse")}
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-3">
            {mine.map((o) => (
              <li key={o.id}>
                <Link
                  to="/orders/$id"
                  params={{ id: o.id }}
                  className="block rounded-2xl bg-card border border-border/60 p-5 hover:border-primary/60 transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold">#{o.id.slice(-6)}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(o.createdAt).toLocaleString()} · {o.items.length} {t("admin.items")}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="font-bold">{o.total} {t("common.currency")}</div>
                      <span className={cn("inline-block mt-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", statusStyles[o.status])}>
                        {t(`order.${o.status}`)}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  );
}
