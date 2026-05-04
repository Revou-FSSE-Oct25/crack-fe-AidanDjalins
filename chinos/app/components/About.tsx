import Image from "next/image";

export default function About() {
  return (
    <section className="bg-[var(--color-cream)] min-h-screen flex items-center">
      <div className="container mx-auto px-8 xl:px-16">
        <div className="flex flex-col xl:flex-row items-center gap-16 xl:gap-24">

          {/* Left side — text content */}
          <div className="flex-1 flex flex-col items-center xl:items-start text-center xl:text-left gap-6">

            {/* Logo */}
            <Image
              src="/images/logo.jpg"
              width={100}
              height={100}
              alt="Chinoss CoffeeSpace"
              className="rounded-full object-cover"
            />

            {/* Heading */}
            <h2 className="font-[var(--font-montserrat)] text-4xl xl:text-5xl font-bold text-[var(--color-red-deep)]">
              Our <em className="italic font-normal text-[var(--color-red)]">Story</em>
            </h2>

            {/* Decorative divider */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
              <span className="text-[var(--color-red)] opacity-60 text-lg">☕</span>
              <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
            </div>

            {/* Body text */}
            <p className="font-[var(--font-montserrat)] font-light text-[0.95rem] leading-relaxed text-[var(--color-red-deep)] opacity-70 max-w-[480px]">
              At Chinoss, we promise a coffeespace built on warmth and good vibes. 
              From the bean down to the brew, we ensure quality by maintaining care to make sure every visit 
              feels like a pause worth taking. Come for the coffee, stay for the atmosphere.
            </p>

            {/* CTA button */}
            <button className="mt-2 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-9 py-[0.9rem] bg-transparent text-[var(--color-red)] border border-[var(--color-red)] cursor-pointer transition-all duration-300 hover:bg-[var(--color-red)] hover:text-[var(--color-cream)] hover:-translate-y-0.5">
              Read More
            </button>

          </div>

          {/* Right side — image */}
          <div className="flex-1 w-full">
            <div className="relative w-full h-[400px] xl:h-[580px] overflow-hidden">
              <Image
                src="/images/about-photo.jpg"
                fill
                alt="Inside Chinoss CoffeeSpace"
                className="object-cover"
                quality={100}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}