import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Package, ShoppingBag, DollarSign, Clock } from "lucide-react";
import { getOrders } from "@/services/orderService";
import { getProducts } from "@/services/productService";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function AdminHome() {
  const { t } = useTranslation();
  const { data: orders = [] } = useQuery({ queryKey: ["orders"], queryFn: getOrders });
  const { data: products = [] } = useQuery({ queryKey: ["products"], queryFn: getProducts });

  const revenue = orders.reduce((a, o) => a + o.total, 0);
  const pending = orders.filter((o) => o.status !== "delivered").length;

  const stats = [
    { label: t("admin.orders"), value: orders.length, Icon: ShoppingBag },
    { label: t("admin.products"), value: products.length, Icon: Package },
    { label: "Revenue", value: `${revenue} ${t("common.currency")}`, Icon: DollarSign },
    { label: "Pending", value: pending, Icon: Clock },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold">{t("admin.title")}</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, Icon }) => (
          <div key={label} className="rounded-2xl bg-card border border-border/60 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{label}</div>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary">
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-card border border-border/60 p-6">
        <h2 className="font-semibold">Recent orders</h2>
        <ul className="mt-4 divide-y divide-border/60">
          {orders.slice(0, 5).map((o) => (
            <li key={o.id} className="py-3 flex items-center justify-between gap-3">
              <div>
                <div className="font-medium">#{o.id.slice(-6)}</div>
                <div className="text-xs text-muted-foreground">{o.customerName} · {new Date(o.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-end">
                <div className="font-bold">{o.total}</div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground">{o.status}</div>
              </div>
            </li>
          ))}
          {orders.length === 0 && <li className="py-6 text-center text-sm text-muted-foreground">No orders yet</li>}
        </ul>
      </div>
    </div>
  );
}
