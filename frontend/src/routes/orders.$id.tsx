import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { ChefHat, Bike, PackageCheck, MapPin, Phone } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";
import { RequireAuth } from "@/components/RequireAuth";
import { getOrder } from "@/services/orderService";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";

export const Route = createFileRoute("/orders/$id")({
  component: () => (
    <RequireAuth>
      <OrderTrackingPage />
    </RequireAuth>
  ),
});

const steps: { id: OrderStatus; icon: typeof ChefHat }[] = [
  { id: "preparing", icon: ChefHat },
  { id: "onway", icon: Bike },
  { id: "delivered", icon: PackageCheck },
];

function OrderTrackingPage() {
  const { t } = useTranslation();
  const { id } = Route.useParams();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
    refetchInterval: 5000,
  });

  if (isLoading) {
    return <MainLayout><div className="mx-auto max-w-3xl px-4 py-12 h-60 rounded-2xl bg-card border border-border/60 animate-pulse" /></MainLayout>;
  }
  if (!order) {
    return <MainLayout><div className="mx-auto max-w-md px-4 py-24 text-center text-muted-foreground">Order not found.</div></MainLayout>;
  }

  // Simulated live progression based on elapsed time (purely client-side mock)
  const elapsed = (Date.now() - new Date(order.createdAt).getTime()) / 1000;
  const simulatedIdx = elapsed > 60 ? 2 : elapsed > 30 ? 1 : 0;
  const liveStatus: OrderStatus = order.status === "delivered"
    ? "delivered"
    : steps[Math.max(simulatedIdx, steps.findIndex((s) => s.id === order.status))].id;

  const activeIdx = steps.findIndex((s) => s.id === liveStatus);

  return (
    <MainLayout>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold">{t("order.title")}</h1>
            <p className="text-sm text-muted-foreground">#{order.id.slice(-6)} · {new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div className="text-end">
            <div className="text-xs text-muted-foreground">{t("order.eta")}</div>
            <div className="text-2xl font-bold">28 min</div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-card border border-border/60 p-6">
          <div className="relative">
            <div className="absolute top-6 start-6 end-6 h-1 bg-surface rounded-full" />
            <div
              className="absolute top-6 start-6 h-1 gradient-primary rounded-full transition-all duration-700"
              style={{ width: `calc(${(activeIdx / (steps.length - 1)) * 100}% - 0px)` }}
            />
            <div className="relative grid grid-cols-3 gap-2">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const active = i <= activeIdx;
                const current = i === activeIdx && liveStatus !== "delivered";
                return (
                  <div key={s.id} className="flex flex-col items-center text-center">
                    <div className={cn(
                      "grid h-12 w-12 place-items-center rounded-full border-2 transition",
                      active ? "gradient-primary border-primary text-primary-foreground" : "bg-surface border-border text-muted-foreground",
                      current && "shadow-glow animate-pulse"
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className={cn("mt-3 text-sm font-semibold", active ? "text-foreground" : "text-muted-foreground")}>
                      {t(`order.${s.id}`)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-card border border-border/60 p-5">
            <h3 className="font-semibold mb-3">{t("checkout.address")}</h3>
            <div className="flex items-start gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 mt-0.5 text-primary" />{order.address}</div>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4 text-primary" />{order.phone}</div>
          </div>
          <div className="rounded-2xl bg-card border border-border/60 p-5">
            <h3 className="font-semibold mb-3">{t("order.items")}</h3>
            <ul className="space-y-1.5 text-sm">
              {order.items.map((i) => (
                <li key={i.product.id} className="flex justify-between">
                  <span className="text-muted-foreground">{i.quantity}× {i.product.name}</span>
                  <span>{i.product.price * i.quantity}</span>
                </li>
              ))}
              <li className="border-t border-border/60 mt-2 pt-2 flex justify-between font-bold">
                <span>{t("cart.total")}</span><span>{order.total} {t("common.currency")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">{t("order.backHome")}</Link>
        </div>
      </div>
    </MainLayout>
  );
}
