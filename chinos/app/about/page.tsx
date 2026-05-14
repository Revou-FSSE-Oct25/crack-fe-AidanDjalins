import Image from "next/image";
import Link from "next/link";

const values = [
  {
    title: "The Process",
    description:
      "We care about every step from bean to cup. Sourcing, roasting, brewing. None of it is an afterthought.",
  },
  {
    title: "The Space",
    description:
      "A coffeespace should feel like somewhere you want to stay. We designed ours to be warm, quiet, and easy to be in.",
  },
  {
    title: "The People",
    description:
      "Our team knows their craft. They'll remember your order, not because they have to, but because they actually care.",
  },
  {
    title: "The Community",
    description:
      "We host events, support local artists, and try to be a place that gives back to the neighborhood that built us.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-cream)]">

      {/* Hero */}
      <section className="bg-[#B21600] pt-40 pb-24 flex flex-col items-center text-center gap-6 px-8">
        <p className="font-[var(--font-montserrat)] font-light text-[0.75rem] tracking-[0.35em] uppercase text-[var(--color-cream)] opacity-70">
          Who We Are
        </p>
        <h1 className="font-[var(--font-montserrat)] text-4xl xl:text-6xl font-bold text-[var(--color-cream)] leading-tight">
          More Than Just <em className="italic font-normal text-[var(--color-cream-dark)]">Coffee</em>
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-[var(--color-cream)] opacity-30" />
          <span className="text-[var(--color-cream)] opacity-50 text-lg">☕</span>
          <div className="w-12 h-px bg-[var(--color-cream)] opacity-30" />
        </div>
        <p className="font-[var(--font-montserrat)] font-light text-[0.95rem] leading-relaxed text-[var(--color-cream)] opacity-75 max-w-[520px]">
          Chinoss CoffeeSpace started in 2018 as a single shop in Sukajadi, Pekanbaru.
          We wanted a place that felt like a second home. Turns out, a lot of people were looking for the same thing.
        </p>
      </section>

      {/* Story section */}
      <section className="py-24 px-8">
        <div className="container mx-auto flex flex-col xl:flex-row items-center gap-16 xl:gap-24">

          {/* Image */}
          <div className="flex-1 w-full">
            <div className="relative w-full h-[400px] xl:h-[500px] overflow-hidden">
              <Image
                src="/images/about-photo.jpg"
                fill
                alt="Inside Chinoss CoffeeSpace"
                className="object-cover"
                quality={100}
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 flex flex-col gap-6 text-center xl:text-left items-center xl:items-start">
            <p className="font-[var(--font-montserrat)] font-light text-[0.75rem] tracking-[0.35em] uppercase text-[var(--color-red)] opacity-70">
              Our Story
            </p>
            <h2 className="font-[var(--font-montserrat)] text-3xl xl:text-4xl font-bold text-[var(--color-red-deep)]">
              Built on <em className="italic font-normal text-[var(--color-red)]">Good Intentions</em>
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
              <span className="text-[var(--color-red)] opacity-60 text-lg">☕</span>
              <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
            </div>
            <p className="font-[var(--font-montserrat)] font-light text-[0.9rem] leading-relaxed text-[var(--color-red-deep)] opacity-70 max-w-[480px]">
              It started with one room, two baristas, and a playlist that was maybe a little too loud.
              We didn&apos;t open Chinoss to be the biggest coffee brand in the city. We opened it because
              we genuinely believed that a good cup of coffee, served in a space that feels right,
              changes the tone of your entire day.
            </p>
            <p className="font-[var(--font-montserrat)] font-light text-[0.9rem] leading-relaxed text-[var(--color-red-deep)] opacity-70 max-w-[480px]">
              Six years later, we have five locations across Riau. The playlist is still a little too loud.
              We&apos;re okay with that.
            </p>
          </div>

        </div>
      </section>

      {/* Values */}
      <section className="bg-[#B21600] py-24 px-8">
        <div className="container mx-auto flex flex-col items-center gap-12">

          <div className="flex flex-col items-center gap-4 text-center">
            <p className="font-[var(--font-montserrat)] font-light text-[0.75rem] tracking-[0.35em] uppercase text-[var(--color-cream)] opacity-70">
              What Drives Us
            </p>
            <h2 className="font-[var(--font-montserrat)] text-3xl xl:text-4xl font-bold text-[var(--color-cream)]">
              Things We <em className="italic font-normal text-[var(--color-cream-dark)]">Care About</em>
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-[var(--color-cream)] opacity-30" />
              <span className="text-[var(--color-cream)] opacity-50 text-lg">☕</span>
              <div className="w-12 h-px bg-[var(--color-cream)] opacity-30" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {values.map((value) => (
              <div
                key={value.title}
                className="border border-[rgba(245,240,235,0.2)] p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="font-[var(--font-montserrat)] font-bold text-lg text-[var(--color-cream)]">
                  {value.title}
                </h3>
                <div className="w-8 h-px bg-[var(--color-cream)] opacity-30" />
                <p className="font-[var(--font-montserrat)] font-light text-[0.85rem] leading-relaxed text-[var(--color-cream)] opacity-65">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-8">
        <div className="container mx-auto flex flex-col items-center gap-6 text-center">
          <h2 className="font-[var(--font-montserrat)] text-3xl xl:text-4xl font-bold text-[var(--color-red-deep)]">
            Come <em className="italic font-normal text-[var(--color-red)]">Say Hi</em>
          </h2>
          <p className="font-[var(--font-montserrat)] font-light text-[0.95rem] leading-relaxed text-[var(--color-red-deep)] opacity-70 max-w-[440px]">
            We&apos;re across five locations in Riau. Find the one closest to you and stop by.
            The coffee&apos;s always on.
          </p>
          <div className="flex gap-4 flex-wrap justify-center mt-2">
            <Link
              href="/locations"
              className="font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-9 py-[0.9rem] bg-[var(--color-red)] text-[var(--color-cream)] border border-[var(--color-red)] transition-all duration-300 hover:bg-transparent hover:text-[var(--color-red)] hover:-translate-y-0.5 inline-block"
            >
              Find a Location
            </Link>
            <Link
              href="/contact"
              className="font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-9 py-[0.9rem] bg-transparent text-[var(--color-red)] border border-[var(--color-red)] transition-all duration-300 hover:bg-[var(--color-red)] hover:text-[var(--color-cream)] hover:-translate-y-0.5 inline-block"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}