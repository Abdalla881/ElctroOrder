import { Star, Plus } from "lucide-react";
import type { Product } from "@/types";
import { useTranslation } from "react-i18next";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import i18n from "@/i18n";

export function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation();
  const add = useCart((s) => s.add);
  const isAr = i18n.language === "ar";
  const name = isAr && product.nameAr ? product.nameAr : product.name;
  const desc = isAr && product.descriptionAr ? product.descriptionAr : product.description;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-border/60 transition hover:border-primary/50 hover:shadow-glow">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 start-3 flex items-center gap-1 rounded-full bg-background/80 backdrop-blur px-2 py-1 text-xs font-semibold">
          <Star className="h-3 w-3 fill-primary text-primary" />
          {product.rating}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold leading-tight">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-bold">
            {product.price} <span className="text-xs font-medium text-muted-foreground">{t("common.currency")}</span>
          </div>
          <button
            onClick={() => { add(product); toast.success(`${name} → ${t("menu.added")}`); }}
            className="inline-flex items-center gap-1.5 rounded-full gradient-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            {t("menu.add")}
          </button>
        </div>
      </div>
    </div>
  );
}
