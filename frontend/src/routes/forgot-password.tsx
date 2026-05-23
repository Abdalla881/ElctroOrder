import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, KeyRound, Lock, ShoppingBag, ArrowLeft } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";
import {
  forgetPassword,
  verifyResetCode,
  resetPassword,
} from "@/services/authService";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

type Step = "request" | "verify" | "reset";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* ── Step 1: request reset code ─────────────────────────────────── */
  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await forgetPassword(email);
      toast.success(res.message);
      setStep("verify");
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Step 2: verify code ─────────────────────────────────────────── */
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length < 4) {
      toast.error("Please enter the reset code sent to your email.");
      return;
    }
    setLoading(true);
    try {
      const res = await verifyResetCode(email, code.trim());
      toast.success(res.message);
      setStep("reset");
    } catch (err: any) {
      toast.error(err.message ?? "Invalid or expired reset code.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Step 3: set new password ────────────────────────────────────── */
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await resetPassword(email, newPassword);
      toast.success(res.message);
      navigate({ to: "/login" });
    } catch (err: any) {
      toast.error(err.message ?? "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Step meta ───────────────────────────────────────────────────── */
  const stepMeta: Record<Step, { title: string; subtitle: string }> = {
    request: {
      title: "Forgot Password?",
      subtitle: "Enter your email and we'll send you a reset code.",
    },
    verify: {
      title: "Enter Reset Code",
      subtitle: `We sent a 6-character code to ${email}`,
    },
    reset: {
      title: "Set New Password",
      subtitle: "Choose a strong password for your account.",
    },
  };

  const { title, subtitle } = stepMeta[step];

  return (
    <MainLayout>
      <div className="mx-auto max-w-md px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl gradient-primary shadow-glow">
            <ShoppingBag className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="mt-5 text-3xl font-extrabold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>

        {/* Step indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {(["request", "verify", "reset"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full transition-all ${
                  step === s
                    ? "w-6 bg-primary"
                    : ["request", "verify", "reset"].indexOf(step) > i
                    ? "bg-primary/40"
                    : "bg-border"
                }`}
              />
            </div>
          ))}
        </div>

        {/* ── Step 1 ── */}
        {step === "request" && (
          <form
            onSubmit={handleRequest}
            className="mt-8 space-y-4 rounded-2xl bg-card border border-border/60 p-6"
          >
            <Field
              icon={Mail}
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={setEmail}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send Reset Code"}
            </button>
            <BackToLogin />
          </form>
        )}

        {/* ── Step 2 ── */}
        {step === "verify" && (
          <form
            onSubmit={handleVerify}
            className="mt-8 space-y-4 rounded-2xl bg-card border border-border/60 p-6"
          >
            <Field
              icon={KeyRound}
              type="text"
              placeholder="Paste your reset code"
              value={code}
              onChange={setCode}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Verify Code"}
            </button>
            <button
              type="button"
              onClick={() => setStep("request")}
              className="flex w-full items-center justify-center gap-1 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          </form>
        )}

        {/* ── Step 3 ── */}
        {step === "reset" && (
          <form
            onSubmit={handleReset}
            className="mt-8 space-y-4 rounded-2xl bg-card border border-border/60 p-6"
          >
            <Field
              icon={Lock}
              type="password"
              placeholder="New password (min 6 chars)"
              value={newPassword}
              onChange={setNewPassword}
            />
            <Field
              icon={Lock}
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
            >
              {loading ? "Saving…" : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </MainLayout>
  );
}

/* ── Shared field component ─────────────────────────────────────────── */
function Field({
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  icon: typeof Mail;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-surface border border-border/60 px-4 py-3 focus-within:border-primary">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none w-full text-sm"
      />
    </div>
  );
}

function BackToLogin() {
  return (
    <p className="text-center text-sm text-muted-foreground">
      Remember your password?{" "}
      <Link to="/login" className="font-semibold text-primary">
        Sign in
      </Link>
    </p>
  );
}
