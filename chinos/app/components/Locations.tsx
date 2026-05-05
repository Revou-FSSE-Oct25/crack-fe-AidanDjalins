"use client"

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Locations() {
  return (
    <section className="bg-[var(--color-red)] py-24">
      <div className="container mx-auto px-8 flex flex-col items-center gap-10">

        {/* Header text */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-[var(--font-montserrat)] font-light text-[0.75rem] tracking-[0.35em] uppercase text-[var(--color-cream)]">
            Find Us
          </p>

          <h2 className="font-[var(--font-montserrat)] text-4xl xl:text-5xl font-bold text-[var(--color-cream-deep)]">
            Our <em className="italic font-normal text-[var(--color-cream)]">Locations</em>
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-[var(--color-cream)] opacity-40" />
            <span className="text-[var(--color-cream)] opacity-60 text-lg">☕</span>
            <div className="w-12 h-px bg-[var(--color-cream)] opacity-40" />
          </div>

          <p className="font-[var(--font-montserrat)] font-light text-[0.95rem] leading-relaxed text-[var(--color-cream)] max-w-[480px]">
            We have multiple spots around the city. Drop by, grab a brew, and make yourself at home.
          </p>
        </div>

        {/* Map */}
        <div className="relative z-0 w-full">
          <Map />
        </div>

        {/* CTA button */}
        <a
          href="/locations"
          className="font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-9 py-[0.9rem] bg-transparent text-[var(--color-cream)] border border-[var(--color-cream)] cursor-pointer transition-all duration-300 hover:bg-[var(--color-cream)] hover:text-[var(--color-red)] hover:-translate-y-0.5 inline-block"
        >
          See All Locations
        </a>

      </div>
    </section>
  );
}