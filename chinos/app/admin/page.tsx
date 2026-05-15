"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
  isAvailable: boolean;
};

type ProductForm = {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
  isAvailable: boolean;
};

const emptyForm: ProductForm = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  category: "",
  isAvailable: true,
};

function formatPrice(price: string) {
  return `Rp ${parseFloat(price).toLocaleString("id-ID")}`;
}

export default function AdminPage() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [fetchingProducts, setFetchingProducts] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn || user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [isLoggedIn, isLoading, user, router]);

  useEffect(() => {
    if (!isLoggedIn || user?.role !== "ADMIN") return;

    async function fetchProducts() {
      try {
        const res = await fetch(`${BASE_URL}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch {
        toast.error("Could not load products.");
      } finally {
        setFetchingProducts(false);
      }
    }

    fetchProducts();
  }, [isLoggedIn, user]);

  function openCreate() {
    setEditingProduct(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(product: Product) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      isAvailable: product.isAvailable,
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingProduct(null);
    setForm(emptyForm);
  }

  async function handleSave() {
    if (!form.name || !form.price || !form.category) {
      toast.error("Name, price, and category are required.");
      return;
    }

    setIsSaving(true);
    try {
      const token = Cookies.get("accessToken");
      const body = {
        ...form,
        price: parseFloat(form.price),
      };

      if (editingProduct) {
        const res = await fetch(`${BASE_URL}/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        toast.success("Product updated.");
      } else {
        const res = await fetch(`${BASE_URL}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Create failed");
        const created = await res.json();
        setProducts((prev) => [created, ...prev]);
        toast.success("Product created.");
      }

      closeForm();
    } catch {
      toast.error("Failed to save product.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeletingId(id);
    try {
      const token = Cookies.get("accessToken");
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted.");
    } catch {
      toast.error("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  }

  if (isLoading || !isLoggedIn || user?.role !== "ADMIN") return null;

  return (
    <main className="min-h-screen bg-[var(--color-cream)] pt-32 pb-24">
      <div className="container mx-auto px-8 flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-[var(--font-montserrat)] font-light text-[0.75rem] tracking-[0.35em] uppercase text-[var(--color-red)] opacity-70">
              Admin
            </p>
            <h1 className="font-[Playfair_Display] text-4xl xl:text-5xl font-bold text-[var(--color-red-deep)]">
              Product <em className="italic font-normal text-[var(--color-red)]">Management</em>
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
              <span className="text-[var(--color-red)] opacity-60 text-lg">☕</span>
              <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
            </div>
          </div>

          <button
            onClick={openCreate}
            className="font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-6 py-3 bg-[var(--color-red)] text-[var(--color-cream)] border border-[var(--color-red)] transition-all duration-300 hover:bg-transparent hover:text-[var(--color-red)] cursor-pointer w-fit"
          >
            + Add Product
          </button>
        </div>

        {/* Product table */}
        {fetchingProducts ? (
          <p className="font-[var(--font-montserrat)] text-[0.85rem] tracking-[0.15em] uppercase text-[var(--color-red)] opacity-50 animate-pulse">
            Loading products...
          </p>
        ) : (
          <div className="bg-white border border-[rgba(178,22,0,0.1)] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(178,22,0,0.1)]">
                  <th className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-red)] opacity-50 text-left px-6 py-4">Name</th>
                  <th className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-red)] opacity-50 text-left px-6 py-4 hidden sm:table-cell">Category</th>
                  <th className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-red)] opacity-50 text-left px-6 py-4 hidden md:table-cell">Price</th>
                  <th className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-red)] opacity-50 text-left px-6 py-4 hidden lg:table-cell">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr
                    key={product.id}
                    className={`border-b border-[rgba(178,22,0,0.06)] ${i === products.length - 1 ? "border-b-0" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-[Playfair_Display] font-bold text-[var(--color-red-deep)]">{product.name}</p>
                      <p className="font-[var(--font-montserrat)] text-[0.75rem] text-[var(--color-red-deep)] opacity-50 truncate max-w-[200px]">{product.description}</p>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-red)] opacity-70">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="font-[var(--font-montserrat)] text-[0.85rem] text-[var(--color-red-deep)]">
                        {formatPrice(product.price)}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className={`font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.1em] uppercase ${product.isAvailable ? "text-[var(--color-red)]" : "text-[var(--color-red-deep)] opacity-40"}`}>
                        {product.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3 justify-end">
                        <button
                          onClick={() => openEdit(product)}
                          className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-red)] opacity-60 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-red-deep)] opacity-40 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none disabled:cursor-not-allowed"
                        >
                          {deletingId === product.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Create/Edit modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-[300] bg-black/60 flex items-center justify-center px-4"
          onClick={closeForm}
        >
          <div
            className="bg-[var(--color-cream)] w-full max-w-lg flex flex-col gap-6 p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 text-[var(--color-red-deep)] opacity-40 hover:opacity-100 transition-opacity text-xl bg-transparent border-none cursor-pointer"
            >
              ✕
            </button>

            <h3 className="font-[Playfair_Display] text-2xl font-bold text-[var(--color-red-deep)]">
              {editingProduct ? (
                <>Edit <em className="italic font-normal text-[var(--color-red)]">Product</em></>
              ) : (
                <>Add <em className="italic font-normal text-[var(--color-red)]">Product</em></>
              )}
            </h3>

            <div className="flex flex-col gap-5">

              {[
                { label: "Name", key: "name", placeholder: "e.g. Iced Americano" },
                { label: "Description", key: "description", placeholder: "Short description..." },
                { label: "Price (IDR)", key: "price", placeholder: "e.g. 28000" },
                { label: "Category", key: "category", placeholder: "e.g. Coffee" },
                { label: "Image URL", key: "imageUrl", placeholder: "https://..." },
              ].map(({ label, key, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="font-[var(--font-montserrat)] text-[0.8rem] tracking-[0.1em] uppercase text-[var(--color-red-deep)] opacity-80">
                    {label}
                  </label>
                  <input
                    type={key === "price" ? "number" : "text"}
                    placeholder={placeholder}
                    value={form[key as keyof ProductForm] as string}
                    onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="font-[var(--font-montserrat)] text-[0.9rem] text-[var(--color-red-deep)] border border-[rgba(178,22,0,0.2)] p-3 bg-white focus:outline-none focus:border-[var(--color-red)]"
                  />
                </div>
              ))}

              {/* isAvailable toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={form.isAvailable}
                  onChange={(e) => setForm((prev) => ({ ...prev, isAvailable: e.target.checked }))}
                  className="cursor-pointer accent-[var(--color-red)]"
                />
                <label htmlFor="isAvailable" className="font-[var(--font-montserrat)] text-[0.8rem] tracking-[0.1em] uppercase text-[var(--color-red-deep)] opacity-80 cursor-pointer">
                  Available
                </label>
              </div>

            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={closeForm}
                className="flex-1 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-6 py-3 bg-transparent text-[var(--color-red)] border border-[var(--color-red)] transition-all duration-300 hover:bg-[var(--color-red)] hover:text-[var(--color-cream)] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-6 py-3 bg-[var(--color-red)] text-[var(--color-cream)] border border-[var(--color-red)] transition-all duration-300 hover:bg-transparent hover:text-[var(--color-red)] cursor-pointer disabled:opacity-50"
              >
                {isSaving ? "Saving..." : editingProduct ? "Save Changes" : "Create Product"}
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}