"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff, Check, Loader2, KeyRound } from "lucide-react";
import GoogleButton from "./GoogleButton";

const schema = z
  .object({
    email: z.string().email("Nieprawidłowy adres email"),
    password: z
      .string()
      .min(8, "Hasło musi mieć co najmniej 8 znaków")
      .regex(/[A-Z]/, "Hasło musi zawierać wielką literę")
      .regex(/[0-9]/, "Hasło musi zawierać cyfrę"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Hasła nie pasują do siebie",
    path: ["confirmPassword"],
  });

const codeSchema = z.object({
  code: z.string().min(1, "Kod jest wymagany"),
});

type FormData = z.infer<typeof schema>;
type CodeData = z.infer<typeof codeSchema>;

function passwordStrength(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  return score;
}

export default function SignUpForm() {
  const router = useRouter();
  const { signUp } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const {
    register: registerCode,
    handleSubmit: handleCodeSubmit,
    formState: { errors: codeErrors, isSubmitting: isVerifying },
  } = useForm<CodeData>({ resolver: zodResolver(codeSchema) });

  const passwordValue = watch("password", "");
  const confirmValue = watch("confirmPassword", "");
  const strength = passwordStrength(passwordValue);
  const passwordsMatch = passwordValue.length > 0 && passwordValue === confirmValue;

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    const { error } = await signUp.password({
      emailAddress: data.email,
      password: data.password,
    });
    if (error) {
      setServerError(error.message ?? "Wystąpił błąd. Spróbuj ponownie.");
      return;
    }
    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      setServerError("Nie udało się wysłać kodu weryfikacyjnego.");
      return;
    }
    setPendingVerification(true);
  };

  const onVerify = async (data: CodeData) => {
    setServerError(null);
    const { error } = await signUp.verifications.verifyEmailCode({ code: data.code });
    if (error) {
      setServerError(error.message ?? "Nieprawidłowy kod. Spróbuj ponownie.");
      return;
    }
    if (signUp.status === "complete") {
      await signUp.finalize();
      router.push("/dashboard");
    }
  };

  if (pendingVerification) {
    return (
      <div className="space-y-5">
        <div className="rounded-xl border border-border bg-input p-4 text-sm text-muted-foreground">
          Wysłaliśmy kod weryfikacyjny na Twój adres email. Wpisz go poniżej.
        </div>

        <form onSubmit={handleCodeSubmit(onVerify)} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                {...registerCode("code")}
                type="text"
                placeholder="Kod weryfikacyjny"
                autoComplete="one-time-code"
                inputMode="numeric"
                className="w-full rounded-xl border border-border bg-input pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>
            {codeErrors.code && (
              <p className="text-xs text-destructive">{codeErrors.code.message}</p>
            )}
          </div>

          {serverError && <p className="text-xs text-destructive">{serverError}</p>}

          <button
            type="submit"
            disabled={isVerifying}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60 cursor-pointer"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            {isVerifying ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Potwierdź email"
            )}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <GoogleButton />

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">lub kontynuuj z emailem</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="w-full rounded-xl border border-border bg-input pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Hasło"
              autoComplete="new-password"
              className="w-full rounded-xl border border-border bg-input pl-10 pr-10 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {/* Strength meter */}
          {passwordValue.length > 0 && (
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-1.5 flex-1 rounded-full transition-all"
                  style={{
                    background: strength > i ? "var(--gradient-primary)" : "var(--muted)",
                  }}
                />
              ))}
            </div>
          )}
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              {...register("confirmPassword")}
              type={showConfirm ? "text" : "password"}
              placeholder="Potwierdź hasło"
              autoComplete="new-password"
              className="w-full rounded-xl border border-border bg-input pl-10 pr-10 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
            {passwordsMatch ? (
              <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
            ) : (
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                aria-label={showConfirm ? "Ukryj hasło" : "Pokaż hasło"}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        {serverError && <p className="text-xs text-destructive">{serverError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60 cursor-pointer"
          style={{
            background: "var(--gradient-primary)",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Zarejestruj się"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Masz już konto?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:underline">
          Zaloguj się
        </Link>
      </p>
    </div>
  );
}
