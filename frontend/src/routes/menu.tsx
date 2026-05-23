import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { ProductCard } from "@/components/ProductCard";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { getCategories, getProducts } from "@/services/productService";
import i18n from "@/i18n";
import { cn } from "@/lib/utils";

interface Search { q?: string; category?: string }

export const Route = createFileRoute("/menu")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  component: MenuPage,
});

function MenuPage() {
  const { t } = useTranslation();
  const sp = Route.useSearch();
  const isAr = i18n.language === "ar";
  const [q, setQ] = useState(sp.q ?? "");
  const [cat, setCat] = useState(sp.category ?? "all");

  useEffect(() => { if (sp.q !== undefined) setQ(sp.q); }, [sp.q]);
  useEffect(() => { if (sp.category) setCat(sp.category); }, [sp.category]);

  const { data: products, isLoading } = useQuery({ queryKey: ["products"], queryFn: getProducts });
  const { data: cats } = useQuery({ queryKey: ["categories"], queryFn: getCategories });

  const filtered = useMemo(() => {
    return (products ?? []).filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (q) {
        const hay = `${p.name} ${p.nameAr ?? ""} ${p.description}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [products, cat, q]);

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight">{t("menu.title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("menu.subtitle")}</p>
        </div>

        <div className="mt-8 flex items-center gap-2 rounded-2xl bg-surface border border-border/60 p-2 max-w-xl mx-auto">
          <Search className="h-5 w-5 text-muted-foreground ms-2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("home.search")}
            className="bg-transparent outline-none w-full text-sm py-2"
          />
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto scrollbar-hide pb-2 justify-start sm:justify-center">
          {[{ id: "all", name: t("menu.all"), nameAr: t("menu.all"), emoji: "✨" }, ...(cats ?? [])].map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={cn(
                "flex-shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
                cat === c.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-surface border-border/60 text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="me-1">{c.emoji}</span>
              {isAr ? c.nameAr : c.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            : filtered.length === 0
            ? <div className="col-span-full text-center py-16 text-muted-foreground">{t("menu.empty")}</div>
            : filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </MainLayout>
  );
}
