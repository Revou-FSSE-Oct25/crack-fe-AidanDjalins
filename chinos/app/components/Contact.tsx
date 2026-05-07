export default function Contact() {
  return (
    <section className="bg-[var(--color-cream)] py-24">
      <div className="container mx-auto px-8 flex flex-col items-center gap-8 text-center">

        {/* Eyebrow */}
        <p className="font-[var(--font-montserrat)] font-light text-[0.75rem] tracking-[0.35em] uppercase text-[var(--color-red)] opacity-70">
          Get In Touch
        </p>

        {/* Heading */}
        <h2 className="font-[var(--font-montserrat)] text-4xl xl:text-5xl font-bold text-[var(--color-red-deep)]">
          We&apos;d Love to <em className="italic font-normal text-[var(--color-red)]">Hear From You</em>
        </h2>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
          <span className="text-[var(--color-red)] opacity-60 text-lg">☕</span>
          <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
        </div>

        {/* Body */}
        <p className="font-[var(--font-montserrat)] font-light text-[0.95rem] leading-relaxed text-[var(--color-red-deep)] opacity-70 max-w-[520px]">
          Got a question, a complaint, or want Chinoss to host your next event? 
          We&apos;re always happy to hear from you. Reach out and we&apos;ll get back to you as soon as we can.
        </p>

        {/* CTA */}
        <a
          href="/contact"
          className="mt-2 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-9 py-[0.9rem] bg-[var(--color-red)] text-[var(--color-cream)] border border-[var(--color-red)] cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-[var(--color-red)] hover:-translate-y-0.5 inline-block"
        >
          Contact Us
        </a>

      </div>
    </section>
  );
}