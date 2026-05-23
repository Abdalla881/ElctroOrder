import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getOrders, updateOrderStatus } from "@/services/orderService";
import type { OrderStatus } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

const statuses: OrderStatus[] = ["preparing", "onway", "delivered"];

const statusStyles: Record<OrderStatus, string> = {
  preparing: "bg-amber-500/15 text-amber-400",
  onway: "bg-blue-500/15 text-blue-400",
  delivered: "bg-success/15 text-success",
};

function AdminOrders() {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { data: orders = [] } = useQuery({ queryKey: ["orders"], queryFn: getOrders });

  const mut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) => updateOrderStatus(id, status),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["orders"] }); toast.success("Status updated"); },
  });

  return (
    <div>
      <h1 className="text-2xl font-extrabold">{t("admin.orders")}</h1>

      <div className="mt-6 space-y-3">
        {orders.length === 0 && (
          <div className="rounded-2xl bg-card border border-border/60 p-10 text-center text-muted-foreground">
            No orders yet
          </div>
        )}
        {orders.map((o) => (
          <div key={o.id} className="rounded-2xl bg-card border border-border/60 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-semibold">#{o.id.slice(-6)} · {o.customerName}</div>
                <div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString()} · {o.address} · {o.phone}</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {o.items.map((i) => `${i.quantity}× ${i.product.name}`).join(" · ")}
                </div>
              </div>
              <div className="text-end">
                <div className="text-lg font-bold">{o.total} {t("common.currency")}</div>
                <span className={cn("inline-block mt-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", statusStyles[o.status])}>
                  {t(`order.${o.status}`)}
                </span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => mut.mutate({ id: o.id, status: s })}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold border transition",
                    o.status === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/60 text-muted-foreground hover:text-foreground hover:bg-surface"
                  )}
                >
                  {t(`order.${s}`)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
