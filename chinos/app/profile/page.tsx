"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { isLoggedIn, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading || !isLoggedIn) return null;

  return (
    <main className="min-h-screen bg-[var(--color-cream)] pt-32 pb-24">
      <div className="container mx-auto px-8">
        <h1 className="font-[Playfair_Display] text-4xl font-bold text-[var(--color-red-deep)]">
          Welcome, {user?.name}
        </h1>
        <p className="font-[var(--font-montserrat)] text-[var(--color-red-deep)] opacity-60 mt-4">
          Profile page coming soon.
        </p>
      </div>
    </main>
  );
}