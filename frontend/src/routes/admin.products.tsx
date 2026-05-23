import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { createProduct, deleteProduct, getCategories, getProducts, updateProduct } from "@/services/productService";
import type { Product } from "@/types";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

const empty: Omit<Product, "id"> = {
  name: "", description: "", price: 0,
  image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
  category: "burgers", rating: 4.5,
};

function AdminProducts() {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { data: products = [] } = useQuery({ queryKey: ["products"], queryFn: getProducts });
  const { data: cats = [] } = useQuery({ queryKey: ["categories"], queryFn: getCategories });
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState<Omit<Product, "id"> | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["products"] });

  const createMut = useMutation({
    mutationFn: createProduct,
    onSuccess: () => { invalidate(); setCreating(null); toast.success("Created"); },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<Product> }) => updateProduct(id, patch),
    onSuccess: () => { invalidate(); setEditing(null); toast.success("Updated"); },
  });
  const deleteMut = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => { invalidate(); toast.success("Deleted"); },
  });

  const modal = editing ? { mode: "edit" as const, data: editing } : creating ? { mode: "create" as const, data: creating } : null;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">{t("admin.products")}</h1>
        <button onClick={() => setCreating(empty)} className="inline-flex items-center gap-1.5 rounded-full gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow">
          <Plus className="h-4 w-4" /> {t("admin.addProduct")}
        </button>
      </div>

      <div className="mt-6 rounded-2xl bg-card border border-border/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface text-muted-foreground text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-start">{t("admin.name")}</th>
                <th className="px-4 py-3 text-start">{t("admin.category")}</th>
                <th className="px-4 py-3 text-end">{t("admin.price")}</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-border/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{p.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground capitalize">{p.category}</td>
                  <td className="px-4 py-3 text-end font-semibold">{p.price}</td>
                  <td className="px-4 py-3 text-end">
                    <div className="inline-flex gap-1">
                      <button onClick={() => setEditing(p)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-surface"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => deleteMut.mutate(p.id)} className="grid h-8 w-8 place-items-center rounded-lg text-destructive hover:bg-surface"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <ProductModal
          categories={cats.map((c) => c.id)}
          initial={modal.data}
          isEdit={modal.mode === "edit"}
          onClose={() => { setEditing(null); setCreating(null); }}
          onSave={(values) => {
            if (modal.mode === "edit") updateMut.mutate({ id: editing!.id, patch: values });
            else createMut.mutate(values);
          }}
        />
      )}
    </div>
  );
}

function ProductModal({
  initial, categories, isEdit, onClose, onSave,
}: {
  initial: Omit<Product, "id">;
  categories: string[];
  isEdit: boolean;
  onClose: () => void;
  onSave: (v: Omit<Product, "id">) => void;
}) {
  const { t } = useTranslation();
  const [v, setV] = useState(initial);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/70 p-4 animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border/60 p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">{isEdit ? t("admin.editProduct") : t("admin.addProduct")}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-surface"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-3">
          <Input label={t("admin.name")} value={v.name} onChange={(x) => setV({ ...v, name: x })} />
          <Input label={t("admin.description")} value={v.description} onChange={(x) => setV({ ...v, description: x })} />
          <div className="grid grid-cols-2 gap-3">
            <Input type="number" label={t("admin.price")} value={String(v.price)} onChange={(x) => setV({ ...v, price: Number(x) || 0 })} />
            <div>
              <label className="text-xs font-medium text-muted-foreground">{t("admin.category")}</label>
              <select
                value={v.category}
                onChange={(e) => setV({ ...v, category: e.target.value })}
                className="mt-1 w-full rounded-xl bg-surface border border-border/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <Input label={t("admin.image")} value={v.image} onChange={(x) => setV({ ...v, image: x })} />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-full px-4 py-2 text-sm font-medium hover:bg-surface">{t("admin.cancel")}</button>
          <button onClick={() => onSave(v)} className="rounded-full gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground">{t("admin.save")}</button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl bg-surface border border-border/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
