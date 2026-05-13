"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),

});

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

function FieldWrapper({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-[var(--font-montserrat)] text-[0.8rem] tracking-[0.1em] uppercase text-[var(--color-red-deep)] opacity-80">
        {label}
      </label>
      {children}
      {error && (
        <p className="font-[var(--font-montserrat)] text-[0.72rem] text-[var(--color-red)]">
          {error}
        </p>
      )}
    </div>
  );
}

function LoginForm() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: LoginValues) {
    try {
      console.log(values);
      toast.success("Logged in successfully.");
    } catch {
      toast.error("Login failed. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FieldWrapper label="Email" error={form.formState.errors.email?.message}>
          <Input
            placeholder="Enter your email..."
            className="rounded-none border-[var(--color-red-deep)] border-opacity-20 focus:border-[var(--color-red)] font-[var(--font-montserrat)]"
            {...form.register("email")}
          />
        </FieldWrapper>

        <FieldWrapper label="Password" error={form.formState.errors.password?.message}>
          <Input
            type="password"
            placeholder="Enter your password..."
            className="rounded-none border-[var(--color-red-deep)] border-opacity-20 focus:border-[var(--color-red)] font-[var(--font-montserrat)]"
            {...form.register("password")}
          />
        </FieldWrapper>

        <div className="flex justify-end">
          <Link
            href="#"
            className="font-[var(--font-montserrat)] text-[0.75rem] text-[var(--color-red)] opacity-70 hover:opacity-100 transition-opacity"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="mt-2 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-9 py-[0.9rem] bg-[var(--color-red)] text-[var(--color-cream)] border border-[var(--color-red)] transition-all duration-300 hover:bg-transparent hover:text-[var(--color-red)] w-full rounded-none h-auto"
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
}

function RegisterForm() {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  function onSubmit(values: RegisterValues) {
    try {
      console.log(values);
      toast.success("Account created successfully.");
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FieldWrapper label="Name" error={form.formState.errors.name?.message}>
          <Input
            placeholder="Enter your name..."
            className="rounded-none border-[var(--color-red-deep)] border-opacity-20 focus:border-[var(--color-red)] font-[var(--font-montserrat)]"
            {...form.register("name")}
          />
        </FieldWrapper>

        <FieldWrapper label="Email" error={form.formState.errors.email?.message}>
          <Input
            placeholder="Enter your email..."
            className="rounded-none border-[var(--color-red-deep)] border-opacity-20 focus:border-[var(--color-red)] font-[var(--font-montserrat)]"
            {...form.register("email")}
          />
        </FieldWrapper>

        <FieldWrapper label="Password" error={form.formState.errors.password?.message}>
          <Input
            type="password"
            placeholder="Create a password..."
            className="rounded-none border-[var(--color-red-deep)] border-opacity-20 focus:border-[var(--color-red)] font-[var(--font-montserrat)]"
            {...form.register("password")}
          />
        </FieldWrapper>

        <FieldWrapper label="Confirm Password" error={form.formState.errors.confirmPassword?.message}>
          <Input
            type="password"
            placeholder="Confirm your password..."
            className="rounded-none border-[var(--color-red-deep)] border-opacity-20 focus:border-[var(--color-red)] font-[var(--font-montserrat)]"
            {...form.register("confirmPassword")}
          />
        </FieldWrapper>

        <Button
          type="submit"
          className="mt-2 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-9 py-[0.9rem] bg-[var(--color-red)] text-[var(--color-cream)] border border-[var(--color-red)] transition-all duration-300 hover:bg-transparent hover:text-[var(--color-red)] w-full rounded-none h-auto"
        >
          Create Account
        </Button>
      </form>
    </Form>
  );
}

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <main className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md flex flex-col gap-8">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/images/logo.jpg"
            width={72}
            height={72}
            alt="Chinoss CoffeeSpace"
            className="rounded-full object-cover"
          />
          <Link
            href="/"
            className="font-[var(--font-montserrat)] font-bold text-[1rem] tracking-[0.25em] uppercase text-[var(--color-red-deep)] no-underline"
          >
            CHINOSS
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/60 border border-[rgba(178,22,0,0.1)] px-8 py-10 flex flex-col gap-8">

          {/* Tab switcher */}
          <div className="flex border-b border-[rgba(178,22,0,0.15)]">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 pb-3 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer bg-transparent border-none ${
                  tab === t
                    ? "text-[var(--color-red)] border-b-2 border-[var(--color-red)] -mb-px font-medium"
                    : "text-[var(--color-red-deep)] opacity-40 hover:opacity-70"
                }`}
              >
                {t === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          {/* Form */}
          {tab === "login" ? <LoginForm /> : <RegisterForm />}

        </div>

        {/* Bottom note */}
        <p className="text-center font-[var(--font-montserrat)] text-[0.75rem] text-[var(--color-red-deep)] opacity-50">
          {tab === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setTab("register")}
                className="text-[var(--color-red)] opacity-100 underline cursor-pointer bg-transparent border-none font-[var(--font-montserrat)] text-[0.75rem]"
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setTab("login")}
                className="text-[var(--color-red)] opacity-100 underline cursor-pointer bg-transparent border-none font-[var(--font-montserrat)] text-[0.75rem]"
              >
                Sign in here
              </button>
            </>
          )}
        </p>

      </div>
    </main>
  );
}