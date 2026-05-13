"use client";

import { useState } from "react";
import Image from "next/image";
import { menuItems, categories, MenuItem } from "../types/menu";

const ITEMS_PER_PAGE = 6;

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filtered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setCurrentPage(1);
  }

  function formatPrice(price: number) {
    return `Rp ${price.toLocaleString("id-ID")}`;
  }

  return (
    <main className="min-h-screen bg-[var(--color-cream)] pt-32 pb-24">
      <div className="container mx-auto px-8 flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-[var(--font-montserrat)] font-light text-[0.75rem] tracking-[0.35em] uppercase text-[var(--color-red)] opacity-70">
            What We Serve
          </p>
          <h1 className="font-[var(--font-montserrat)] text-4xl xl:text-5xl font-bold text-[var(--color-red-deep)]">
            Our <em className="italic font-normal text-[var(--color-red)]">Menu</em>
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
            <span className="text-[var(--color-red)] opacity-60 text-lg">☕</span>
            <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-6 py-2.5 border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[var(--color-red)] text-[var(--color-cream)] border-[var(--color-red)]"
                  : "bg-transparent text-[var(--color-red)] border-[var(--color-red)] hover:bg-[var(--color-red)] hover:text-[var(--color-cream)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group text-left bg-white border border-[rgba(178,22,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(178,22,0,0.12)] cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-52 overflow-hidden bg-[var(--color-cream-dark)]">
                <Image
                  src={item.image}
                  fill
                  alt={item.name}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Fallback (no image) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl opacity-20">☕</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-[var(--font-montserrat)] font-bold text-lg text-[var(--color-red-deep)] leading-tight">
                    {item.name}
                  </h3>
                  <span className="font-[var(--font-montserrat)] font-medium text-[0.8rem] text-[var(--color-red)] whitespace-nowrap">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="font-[var(--font-montserrat)] font-light text-[0.85rem] text-[var(--color-red-deep)] opacity-60 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <span className="mt-1 font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-red)] opacity-50">
                  {item.category}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.15em] uppercase px-5 py-2.5 border border-[var(--color-red)] text-[var(--color-red)] transition-all duration-200 hover:bg-[var(--color-red)] hover:text-[var(--color-cream)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[var(--color-red)]"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`font-[var(--font-montserrat)] text-[0.75rem] w-9 h-9 border transition-all duration-200 ${
                  currentPage === page
                    ? "bg-[var(--color-red)] text-[var(--color-cream)] border-[var(--color-red)]"
                    : "bg-transparent text-[var(--color-red)] border-[var(--color-red)] hover:bg-[var(--color-red)] hover:text-[var(--color-cream)]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.15em] uppercase px-5 py-2.5 border border-[var(--color-red)] text-[var(--color-red)] transition-all duration-200 hover:bg-[var(--color-red)] hover:text-[var(--color-cream)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[var(--color-red)]"
            >
              Next
            </button>
          </div>
        )}

      </div>

      {/* Product modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[300] bg-black/60 flex items-center justify-center px-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-[var(--color-cream)] w-full max-w-2xl flex flex-col sm:flex-row overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 text-[var(--color-red-deep)] opacity-50 hover:opacity-100 transition-opacity text-xl font-light cursor-pointer bg-transparent border-none"
            >
              ✕
            </button>

            {/* Image */}
            <div className="relative w-full sm:w-[280px] h-64 sm:h-auto flex-shrink-0 bg-[var(--color-cream-dark)]">
              <Image
                src={selectedItem.image}
                fill
                alt={selectedItem.name}
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl opacity-20">☕</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center gap-4 p-8">
              <span className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-red)] opacity-50">
                {selectedItem.category}
              </span>
              <h2 className="font-[var(--font-montserrat)] text-3xl font-bold text-[var(--color-red-deep)]">
                {selectedItem.name}
              </h2>
              <p className="font-[var(--font-montserrat)] font-semibold text-[1.1rem] text-[var(--color-red)]">
                {formatPrice(selectedItem.price)}
              </p>
              <p className="font-[var(--font-montserrat)] font-light text-[0.9rem] leading-relaxed text-[var(--color-red-deep)] opacity-70">
                {selectedItem.description}
              </p>
              <button
                onClick={() => setSelectedItem(null)}
                className="mt-2 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-8 py-3 bg-[var(--color-red)] text-[var(--color-cream)] border border-[var(--color-red)] transition-all duration-300 hover:bg-transparent hover:text-[var(--color-red)] w-fit cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}