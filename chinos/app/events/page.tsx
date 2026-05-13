import Link from "next/link";

const eventTypes = [
  {
    icon: "🎵",
    title: "Live Music Nights",
    description:
      "Host an intimate live music session in our coffeespace. We have the ambiance, the acoustics, and the brews to make it a night to remember.",
  },
  {
    icon: "💼",
    title: "Corporate Meetups",
    description:
      "A relaxed setting for team off-sites, brainstorming sessions, or client meetings. Good coffee makes for better conversations.",
  },
  {
    icon: "🎂",
    title: "Private Celebrations",
    description:
      "Birthdays, anniversaries, graduations. Reserve the space for your crew and let us take care of the rest.",
  },
  {
    icon: "📸",
    title: "Creative Shoots",
    description:
      "Our space has been used for photo and video shoots. The warm tones and minimal design make for a great backdrop.",
  },
];

const faqs = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend at least 2 weeks in advance for small gatherings and 4 weeks for larger events. Peak weekends book fast.",
  },
  {
    question: "What is the maximum capacity?",
    answer:
      "Our space comfortably seats up to 40 guests for a seated event, or up to 60 for a standing mixer format.",
  },
  {
    question: "Do you provide catering?",
    answer:
      "Yes. We offer coffee and light bites packages. Custom menus can be arranged for larger events with prior notice.",
  },
  {
    question: "How do I confirm a booking?",
    answer:
      "Fill out the inquiry form and our team will get back to you within 2 business days to confirm availability and details.",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-cream)]">

      {/* Hero */}
      <section className="bg-[#B21600] pt-40 pb-24 flex flex-col items-center text-center gap-6 px-8">
        <p className="font-[var(--font-montserrat)] font-light text-[0.75rem] tracking-[0.35em] uppercase text-[var(--color-cream)] opacity-70">
          Host With Us
        </p>
        <h1 className="font-[var(--font-montserrat)] text-4xl xl:text-6xl font-bold text-[var(--color-cream)] leading-tight">
          Make It a <em className="italic font-normal text-[var(--color-cream-dark)]">Moment</em>
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-[var(--color-cream)] opacity-30" />
          <span className="text-[var(--color-cream)] opacity-50 text-lg">☕</span>
          <div className="w-12 h-px bg-[var(--color-cream)] opacity-30" />
        </div>
        <p className="font-[var(--font-montserrat)] font-light text-[0.95rem] leading-relaxed text-[var(--color-cream)] opacity-75 max-w-[520px]">
          Chinoss CoffeeSpace is available for private events, corporate gatherings,
          live sessions, and more. Bring your people, we&apos;ll handle the rest.
        </p>
        <Link
          href="/contact?type=event"
          className="mt-2 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-9 py-[0.9rem] bg-[var(--color-cream)] text-[var(--color-red)] border border-[var(--color-cream)] transition-all duration-300 hover:bg-transparent hover:text-[var(--color-cream)] hover:-translate-y-0.5 inline-block"
        >
          Book an Event
        </Link>
      </section>

      {/* Event types */}
      <section className="py-24 px-8">
        <div className="container mx-auto flex flex-col items-center gap-12">

          <div className="flex flex-col items-center gap-4 text-center">
            <p className="font-[var(--font-montserrat)] font-light text-[0.75rem] tracking-[0.35em] uppercase text-[var(--color-red)] opacity-70">
              What We Host
            </p>
            <h2 className="font-[var(--font-montserrat)] text-3xl xl:text-4xl font-bold text-[var(--color-red-deep)]">
              Types of <em className="italic font-normal text-[var(--color-red)]">Events</em>
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
              <span className="text-[var(--color-red)] opacity-60 text-lg">☕</span>
              <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {eventTypes.map((event) => (
              <div
                key={event.title}
                className="bg-white border border-[rgba(178,22,0,0.1)] p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(178,22,0,0.1)]"
              >
                <span className="text-4xl">{event.icon}</span>
                <h3 className="font-[var(--font-montserrat)] font-bold text-lg text-[var(--color-red-deep)]">
                  {event.title}
                </h3>
                <p className="font-[var(--font-montserrat)] font-light text-[0.85rem] leading-relaxed text-[var(--color-red-deep)] opacity-60">
                  {event.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#B21600] py-24 px-8">
        <div className="container mx-auto flex flex-col items-center gap-12">

          <div className="flex flex-col items-center gap-4 text-center">
            <p className="font-[var(--font-montserrat)] font-light text-[0.75rem] tracking-[0.35em] uppercase text-[var(--color-cream)] opacity-70">
              Good to Know
            </p>
            <h2 className="font-[var(--font-montserrat)] text-3xl xl:text-4xl font-bold text-[var(--color-cream)]">
              Frequently Asked <em className="italic font-normal text-[var(--color-cream-dark)]">Questions</em>
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-[var(--color-cream)] opacity-30" />
              <span className="text-[var(--color-cream)] opacity-50 text-lg">☕</span>
              <div className="w-12 h-px bg-[var(--color-cream)] opacity-30" />
            </div>
          </div>

          <div className="w-full max-w-2xl flex flex-col gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="border border-[rgba(245,240,235,0.2)] p-6 flex flex-col gap-2"
              >
                <h4 className="font-[var(--font-montserrat)] font-medium text-[0.9rem] tracking-[0.05em] text-[var(--color-cream)]">
                  {faq.question}
                </h4>
                <p className="font-[var(--font-montserrat)] font-light text-[0.85rem] leading-relaxed text-[var(--color-cream)] opacity-65">
                  {faq.answer}
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
            Ready to <em className="italic font-normal text-[var(--color-red)]">Book?</em>
          </h2>
          <p className="font-[var(--font-montserrat)] font-light text-[0.95rem] leading-relaxed text-[var(--color-red-deep)] opacity-70 max-w-[440px]">
            Send us an inquiry and our team will get back to you within 2 business days.
          </p>
          <Link
            href="/contact"
            className="mt-2 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-9 py-[0.9rem] bg-[var(--color-red)] text-[var(--color-cream)] border border-[var(--color-red)] transition-all duration-300 hover:bg-transparent hover:text-[var(--color-red)] hover:-translate-y-0.5 inline-block"
          >
            Send an Inquiry
          </Link>
        </div>
      </section>

    </main>
  );
}