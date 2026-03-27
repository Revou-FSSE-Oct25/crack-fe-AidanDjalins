import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[#B21600]" />

      {/* Main content */}
      <div className="relative z-[4] flex flex-col items-center gap-8 text-center px-8 animate-[fadeUp_1.2s_cubic-bezier(0.16,1,0.3,1)_both]">

        <p className="font-[var(--font-montserrat)] font-light text-[0.75rem] tracking-[0.35em] uppercase text-[var(--color-cream-dark)] opacity-80">
          Est. 2018
        </p>

        {/* Logo */}
        <Image
          src="/logo.jpg"
          width={150}
          height={150}
          alt="Chinoss CoffeeSpace"
          className="rounded-full object-cover border border-[rgba(245,236,215,0.3)] transition-all duration-300 hover:scale-[1.02]"
        />

        {/* Subtext */}
        <p className="font-[Cormorant_Garamond] text-[clamp(1rem,2.5vw,1.4rem)] font-light text-[var(--color-cream-dark)] tracking-[0.05em] max-w-[480px] leading-relaxed opacity-85">
          Come stick around for a brew or for tunes in our little coffeespace.
        </p>

        {/* CTA buttons */}
        <div className="flex sm:flex-col items-center gap-4 mt-2">
          <button className="font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-9 py-[0.9rem] bg-[var(--color-cream)] text-[var(--color-red-deep)] border-none cursor-pointer font-medium transition-all duration-300 hover:bg-[var(--color-cream-dark)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
            Explore Menu
          </button>
          <button className="font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-9 py-[0.9rem] bg-transparent text-[var(--color-cream)] border border-[rgba(245,236,215,0.4)] cursor-pointer font-normal transition-all duration-300 hover:border-[var(--color-cream)] hover:-translate-y-0.5">
            Our Story
          </button>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2">
        <span className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-cream)] opacity-45">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[rgba(245,236,215,0.5)] to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
      </div>

    </section>
  );
}