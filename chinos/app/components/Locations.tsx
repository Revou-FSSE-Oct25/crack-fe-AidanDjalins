"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/app/components/Map"), { ssr: false });

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Location = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
};

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch(`${BASE_URL}/locations`);
        if (!res.ok) throw new Error("Failed to fetch locations");
        const data = await res.json();
        setLocations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLocations();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-cream)]">

      {/* Map */}
      <div className="pt-20">
        <Map />
      </div>

      {/* Locations section */}
      <section className="py-24 px-8">
        <div className="container mx-auto flex flex-col gap-12">

          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="font-[var(--font-montserrat)] font-light text-[0.75rem] tracking-[0.35em] uppercase text-[var(--color-red)] opacity-70">
              Find Us
            </p>
            <h1 className="font-[Playfair_Display] text-4xl xl:text-5xl font-bold text-[var(--color-red-deep)]">
              Our <em className="italic font-normal text-[var(--color-red)]">Locations</em>
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
              <span className="text-[var(--color-red)] opacity-60 text-lg">☕</span>
              <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
            </div>
            <p className="font-[var(--font-montserrat)] font-light text-[0.95rem] leading-relaxed text-[var(--color-red-deep)] opacity-70 max-w-[480px]">
              We have multiple spots around the city and beyond. Drop by whichever is closest to you.
            </p>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center py-10">
              <p className="font-[var(--font-montserrat)] text-[0.85rem] tracking-[0.15em] uppercase text-[var(--color-red)] opacity-50 animate-pulse">
                Loading locations...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex justify-center py-10">
              <p className="font-[var(--font-montserrat)] text-[0.85rem] text-[var(--color-red)] opacity-70">
                {error}. Please try again later.
              </p>
            </div>
          )}

          {/* Location cards */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-white border border-[rgba(178,22,0,0.1)] p-8 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(178,22,0,0.1)]"
                >
                  <span className="text-[var(--color-red)] opacity-60 text-xl">📍</span>

                  <h3 className="font-[Playfair_Display] font-bold text-xl text-[var(--color-red-deep)] leading-tight">
                    {loc.name}
                  </h3>

                  <p className="font-[var(--font-montserrat)] font-light text-[0.8rem] tracking-[0.05em] text-[var(--color-red)] opacity-70">
                    {loc.address}
                  </p>

                  <div className="w-8 h-px bg-[var(--color-red)] opacity-20 my-1" />

                  <p className="font-[var(--font-montserrat)] font-light text-[0.85rem] leading-relaxed text-[var(--color-red-deep)] opacity-60">
                    {loc.description}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

    </main>
  );
}