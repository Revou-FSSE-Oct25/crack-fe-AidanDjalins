"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/app/components/Map"), { ssr: false });

// Mirrors your Prisma Location model exactly.
// Replace this with a fetch to your backend when ready.
const locations = [
  {
    id: "1",
    name: "Chinoss Coffeespace Sukajadi",
    address: "Jl. Sukajadi No. 1, Pekanbaru, Riau",
    description: "Our original spot. Cozy corners, good brews, and a resident playlist that never gets old.",
    latitude: 0.514183198316319,
    longitude: 101.43609466724826,
  },
  {
    id: "2",
    name: "Chinoss Second Home",
    address: "Jl. Sukajadi No. 2, Pekanbaru, Riau",
    description: "Right next to the original. A slightly bigger space for when the crew needs more room.",
    latitude: 0.514183198316319,
    longitude: 101.43609466724826,
  },
  {
    id: "3",
    name: "Chinoss Panam",
    address: "Jl. HR Soebrantas, Panam, Pekanbaru, Riau",
    description: "Our campus-side branch. A favourite among students looking for a quiet place to work.",
    latitude: 0.47524296959808543,
    longitude: 101.37503313841236,
  },
  {
    id: "4",
    name: "Chinoss Jl Sudirman",
    address: "Jl. Jenderal Sudirman, Pekanbaru, Riau",
    description: "Right in the middle of the business district. Perfect for a quick break between meetings.",
    latitude: 0.5357884803313919,
    longitude: 101.4473692870436,
  },
  {
    id: "5",
    name: "Chinoss Duri",
    address: "Jl. Hang Tuah, Duri, Riau",
    description: "Our northernmost branch. A warm stop for those passing through Duri.",
    latitude: 1.2624089709124604,
    longitude: 101.187629211426,
  },
];

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-cream)]">

      {/* Map — full width, sits right below the navbar */}
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

          {/* Location cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="bg-white border border-[rgba(178,22,0,0.1)] p-8 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(178,22,0,0.1)]"
              >
                {/* Pin icon */}
                <span className="text-[var(--color-red)] opacity-60 text-xl">📍</span>

                {/* Name */}
                <h3 className="font-[Playfair_Display] font-bold text-xl text-[var(--color-red-deep)] leading-tight">
                  {loc.name}
                </h3>

                {/* Address */}
                <p className="font-[var(--font-montserrat)] font-light text-[0.8rem] tracking-[0.05em] text-[var(--color-red)] opacity-70">
                  {loc.address}
                </p>

                {/* Divider */}
                <div className="w-8 h-px bg-[var(--color-red)] opacity-20 my-1" />

                {/* Description */}
                <p className="font-[var(--font-montserrat)] font-light text-[0.85rem] leading-relaxed text-[var(--color-red-deep)] opacity-60">
                  {loc.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}