import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Banknote, CreditCard, CheckCircle2, ArrowRight } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";
import { RequireAuth } from "@/components/RequireAuth";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { createOrder } from "@/services/orderService";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  component: () => (
    <RequireAuth>
      <CheckoutPage />
    </RequireAuth>
  ),
});

function CheckoutPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, subtotal, clear } = useCart();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState<"cash" | "card">("cash");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const sub = subtotal();
  const delivery = sub === 0 || sub >= 150 ? 0 : 25;
  const total = sub + delivery;

  if (success) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-md px-4 py-24 text-center animate-scale-in">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/15 text-success mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-extrabold">{t("checkout.success")}</h1>
          <p className="mt-2 text-muted-foreground">{t("checkout.successHint")}</p>
          <Link
            to="/orders/$id"
            params={{ id: success }}
            className="mt-6 inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            {t("checkout.track")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </MainLayout>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !phone) { toast.error("Address and phone required"); return; }
    if (items.length === 0) { toast.error("Cart is empty"); return; }
    setLoading(true);
    try {
      const order = await createOrder({
        userId: user!.id,
        customerName: user!.name,
        items,
        total,
        address,
        phone,
        notes,
        paymentMethod: payment,
      });
      clear();
      setSuccess(order.id);
    } catch {
      toast.error(t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-md px-4 py-24 text-center">
          <p className="text-muted-foreground">{t("cart.empty")}</p>
          <button onClick={() => navigate({ to: "/menu" })} className="mt-4 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            {t("cart.browse")}
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-extrabold">{t("checkout.title")}</h1>

        <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="rounded-2xl bg-card border border-border/60 p-5 space-y-4">
              <h2 className="font-semibold">{t("checkout.address")}</h2>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t("checkout.addressPlaceholder")}
                className="w-full rounded-xl bg-surface border border-border/60 px-4 py-3 text-sm outline-none focus:border-primary"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("checkout.phone")}
                className="w-full rounded-xl bg-surface border border-border/60 px-4 py-3 text-sm outline-none focus:border-primary"
              />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t("checkout.notes")}
                rows={3}
                className="w-full rounded-xl bg-surface border border-border/60 px-4 py-3 text-sm outline-none focus:border-primary resize-none"
              />
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-5">
              <h2 className="font-semibold mb-4">{t("checkout.payment")}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { id: "cash" as const, label: t("checkout.cash"), Icon: Banknote },
                  { id: "card" as const, label: t("checkout.card"), Icon: CreditCard },
                ].map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPayment(id)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-4 text-start transition",
                      payment === id
                        ? "border-primary bg-primary/10"
                        : "border-border/60 bg-surface hover:border-border"
                    )}
                  >
                    <Icon className={cn("h-5 w-5", payment === id ? "text-primary" : "text-muted-foreground")} />
                    <span className="font-medium text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-2xl bg-card border border-border/60 p-5 sticky top-20">
            <h2 className="font-semibold mb-4">Summary</h2>
            <div className="space-y-2 text-sm">
              {items.map((i) => (
                <div key={i.product.id} className="flex justify-between text-muted-foreground">
                  <span>{i.quantity}× {i.product.name}</span>
                  <span>{(i.product.price * i.quantity).toFixed(0)}</span>
                </div>
              ))}
              <div className="border-t border-border/60 pt-3 flex justify-between"><span>{t("cart.subtotal")}</span><span>{sub.toFixed(0)}</span></div>
              <div className="flex justify-between"><span>{t("cart.delivery")}</span><span>{delivery === 0 ? t("cart.free") : delivery}</span></div>
              <div className="border-t border-border/60 mt-2 pt-3 flex justify-between text-base font-bold">
                <span>{t("cart.total")}</span><span>{total.toFixed(0)} {t("common.currency")}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
            >
              {loading ? t("common.loading") : t("checkout.place")}
            </button>
          </aside>
        </form>
      </div>
    </MainLayout>
  );
}
