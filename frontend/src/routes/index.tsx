import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Search, ArrowRight, Clock, Truck, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { ProductCard } from "@/components/ProductCard";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { getCategories, getProducts } from "@/services/productService";
import { offers } from "@/mock/data";
import i18n from "@/i18n";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const isAr = i18n.language === "ar";

  const { data: products, isLoading } = useQuery({ queryKey: ["products"], queryFn: getProducts });
  const { data: cats } = useQuery({ queryKey: ["categories"], queryFn: getCategories });

  const popular = (products ?? []).filter((p) => p.popular).slice(0, 4);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/menu", search: { q } as never });
  };

  return (
    <MainLayout>
      {/* Hero */}
      <section className="gradient-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="animate-slide-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 text-primary px-3 py-1 text-xs font-semibold">
                <Clock className="h-3.5 w-3.5" /> {t("home.heroTag")}
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
                {t("home.heroTitle").split(".").map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}.<br className="hidden sm:block" />
                    </span>
                  ) : (
                    <span key={i} className="text-gradient">{part}</span>
                  )
                )}
              </h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-xl">{t("home.heroSubtitle")}</p>

              <form onSubmit={onSearch} className="mt-7 flex items-center gap-2 rounded-2xl bg-surface border border-border/60 p-2 max-w-xl shadow-glow">
                <div className="flex items-center gap-2 flex-1 px-3">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={t("home.search")}
                    className="bg-transparent outline-none w-full text-sm py-2"
                  />
                </div>
                <button type="submit" className="rounded-xl gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                  {t("home.heroCta")}
                </button>
              </form>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Free delivery over 150</div>
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Secure checkout</div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-10 gradient-primary opacity-20 blur-3xl rounded-full" />
              <img
                src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80"
                alt="Featured dish"
                className="relative rounded-3xl shadow-glow object-cover aspect-square w-full"
              />
              <div className="absolute -bottom-4 -start-4 rounded-2xl bg-card border border-border/60 p-4 backdrop-blur shadow-xl">
                <div className="text-xs text-muted-foreground">Avg delivery</div>
                <div className="text-2xl font-bold">28 min</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t("home.categories")}</h2>
          <Link to="/menu" className="text-sm font-medium text-primary inline-flex items-center gap-1">
            {t("home.seeAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
          {(cats ?? []).map((c) => (
            <Link
              key={c.id}
              to="/menu"
              search={{ category: c.id } as never}
              className="flex-shrink-0 w-32 rounded-2xl bg-card border border-border/60 p-4 text-center hover:border-primary/60 hover:bg-surface transition"
            >
              <div className="text-3xl">{c.emoji}</div>
              <div className="mt-2 text-sm font-semibold">{isAr ? c.nameAr : c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Offers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">{t("home.offers")}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {offers.map((o) => (
            <div key={o.id} className="relative overflow-hidden rounded-2xl border border-border/60 bg-card group">
              <img src={o.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:opacity-50 transition" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
              <div className="relative p-6 min-h-48 flex flex-col justify-end">
                <span className="self-start rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase text-primary-foreground">
                  {isAr ? o.badgeAr : o.badge}
                </span>
                <h3 className="mt-3 text-xl font-bold">{isAr ? o.titleAr : o.title}</h3>
                <p className="text-sm text-muted-foreground">{isAr ? o.subtitleAr : o.subtitle}</p>
                <Link to="/menu" className="mt-4 self-start text-sm font-semibold text-primary inline-flex items-center gap-1">
                  {t("home.offerCta")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t("home.popular")}</h2>
          <Link to="/menu" className="text-sm font-medium text-primary inline-flex items-center gap-1">
            {t("home.seeAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
            : popular.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </MainLayout>
  );
}
