import Link from "next/link";

const companyLinks: Record<string, string> = {
  About: "/about",
  Locations: "/locations",
  Events: "/events",
  Contact: "/contact"
};

export default function Footer() {
  return (
    <footer className="bg-[var(--color-red)] text-[var(--color-cream)]">

      {/* Top divider */}
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="h-px bg-[rgba(245,240,235,0.15)]" />
      </div>

      {/* Main footer content */}
      <div className="max-w-[1400px] mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="font-[var(--font-montserrat)] font-bold text-[1.1rem] tracking-[0.25em] uppercase text-[var(--color-cream)] no-underline"
          >
            CHINOSS
          </Link>
          <p className="font-[var(--font-montserrat)] font-light text-[0.8rem] tracking-[0.05em] leading-relaxed text-[var(--color-cream)] opacity-60 max-w-[220px]">
            A coffeespace for brews and good tunes. Come stick around.
          </p>
          <p className="font-[var(--font-montserrat)] font-light text-[0.7rem] tracking-[0.15em] uppercase text-[var(--color-cream)] opacity-40 mt-2">
            Est. 2018
          </p>
        </div>

        {/* Company column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-[var(--font-montserrat)] font-semibold text-[0.7rem] tracking-[0.3em] uppercase text-[var(--color-cream)] opacity-50">
            Company
          </h4>
          <nav className="flex flex-col gap-3">
            {["About", "Locations", "Events", "Contact"].map((link) => (
              <a
                key={link}
                href={companyLinks[link]}
                className="font-[var(--font-montserrat)] font-normal text-[0.85rem] tracking-[0.1em] text-[var(--color-cream)] opacity-75 hover:opacity-100 transition-opacity no-underline w-fit"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Products column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-[var(--font-montserrat)] font-semibold text-[0.7rem] tracking-[0.3em] uppercase text-[var(--color-cream)] opacity-50">
            Products
          </h4>
          <nav className="flex flex-col gap-3">
            {["Menu"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-[var(--font-montserrat)] font-normal text-[0.85rem] tracking-[0.1em] text-[var(--color-cream)] opacity-75 hover:opacity-100 transition-opacity no-underline w-fit"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="h-px bg-[rgba(245,240,235,0.15)]" />
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-[var(--font-montserrat)] font-light text-[0.7rem] tracking-[0.15em] uppercase text-[var(--color-cream)] opacity-40">
            &copy; {new Date().getFullYear()} Chinoss CoffeeSpace. All rights reserved.
          </p>
          <p className="font-[var(--font-montserrat)] font-light text-[0.7rem] tracking-[0.15em] uppercase text-[var(--color-cream)] opacity-40">
            Privacy Policy &middot; Terms of Use
          </p>
        </div>
      </div>

    </footer>
  );
}