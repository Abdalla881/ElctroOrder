import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";
import { useCart } from "@/hooks/useCart";
import i18n from "@/i18n";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { t } = useTranslation();
  const isAr = i18n.language === "ar";
  const { items, setQty, remove, subtotal } = useCart();

  const sub = subtotal();
  const delivery = sub === 0 || sub >= 150 ? 0 : 25;
  const total = sub + delivery;

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-surface mb-6">
            <ShoppingBag className="h-9 w-9 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">{t("cart.empty")}</h1>
          <p className="mt-2 text-muted-foreground">{t("cart.emptyHint")}</p>
          <Link to="/menu" className="mt-6 inline-flex rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
            {t("cart.browse")}
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-extrabold">{t("cart.title")}</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {items.map(({ product, quantity }) => {
              const name = isAr && product.nameAr ? product.nameAr : product.name;
              return (
                <div key={product.id} className="flex gap-4 rounded-2xl bg-card border border-border/60 p-3">
                  <img src={product.image} alt={name} className="h-24 w-24 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold">{name}</h3>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {product.price} {t("common.currency")}
                        </div>
                      </div>
                      <button onClick={() => remove(product.id)} className="rounded-lg p-2 text-muted-foreground hover:text-destructive hover:bg-surface">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border/60 bg-surface">
                        <button onClick={() => setQty(product.id, quantity - 1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-accent">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 text-sm font-semibold tabular-nums">{quantity}</span>
                        <button onClick={() => setQty(product.id, quantity + 1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-accent">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="font-bold">
                        {(product.price * quantity).toFixed(0)} {t("common.currency")}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="h-fit rounded-2xl bg-card border border-border/60 p-5 sticky top-20">
            <h2 className="font-semibold mb-4">Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{t("cart.subtotal")}</span><span>{sub.toFixed(0)} {t("common.currency")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{t("cart.delivery")}</span><span>{delivery === 0 ? t("cart.free") : `${delivery} ${t("common.currency")}`}</span></div>
              <div className="border-t border-border/60 mt-3 pt-3 flex justify-between text-base font-bold">
                <span>{t("cart.total")}</span>
                <span>{total.toFixed(0)} {t("common.currency")}</span>
              </div>
            </div>
            <Link to="/checkout" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
              {t("cart.checkout")} <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
