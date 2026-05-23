import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Mail, Lock, ShoppingBag } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";
import { login } from "@/services/authService";
import { emitAuthChange } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = t("auth.invalidEmail");
    if (password.length < 6) errs.password = t("auth.shortPassword");
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      const res = await login(email, password);
      emitAuthChange();
      toast.success(`Welcome ${res.user.name}`);
      navigate({ to: res.user.role === "admin" ? "/admin" : "/" });
    } catch {
      toast.error(t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-md px-4 py-12 sm:py-20">
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl gradient-primary shadow-glow">
            <ShoppingBag className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="mt-5 text-3xl font-extrabold">{t("auth.loginTitle")}</h1>
          <p className="mt-2 text-muted-foreground">{t("auth.loginSubtitle")}</p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl bg-card border border-border/60 p-6">
          <Field icon={Mail} placeholder={t("auth.email")} value={email} onChange={setEmail} error={errors.email} type="email" />
          <Field icon={Lock} placeholder={t("auth.password")} value={password} onChange={setPassword} error={errors.password} type="password" />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
          >
            {loading ? t("common.loading") : t("auth.submit")}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            {t("auth.noAccount")}{" "}
            <Link to="/register" className="font-semibold text-primary">{t("auth.signUp")}</Link>
          </p>
          <p className="text-center text-xs text-muted-foreground">
            Tip: use an email containing "admin" to log in as admin.
          </p>
        </form>
      </div>
    </MainLayout>
  );
}

function Field({
  icon: Icon, placeholder, value, onChange, error, type = "text",
}: {
  icon: typeof Mail; placeholder: string; value: string; onChange: (v: string) => void; error?: string; type?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 rounded-xl bg-surface border border-border/60 px-4 py-3 focus-within:border-primary">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
