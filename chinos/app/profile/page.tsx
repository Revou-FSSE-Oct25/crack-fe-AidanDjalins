"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "QUESTION" | "COMPLAINT" | "EVENT";
  message: string;
  eventDate?: string;
  createdAt: string;
};

const typeLabel: Record<string, string> = {
  QUESTION: "General Inquiry",
  COMPLAINT: "Complaint",
  EVENT: "Event Booking",
};

const typeBadge: Record<string, string> = {
  QUESTION: "text-[var(--color-red)] bg-[rgba(178,22,0,0.08)]",
  COMPLAINT: "text-[var(--color-red-deep)] bg-[rgba(180,6,27,0.08)]",
  EVENT: "text-[var(--color-red)] bg-[rgba(178,22,0,0.12)]",
};

export default function ProfilePage() {
  const { user, isLoggedIn, isLoading, logout } = useAuth();
  const router = useRouter();

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [fetchingInquiries, setFetchingInquiries] = useState(true);

  // Selected inquiry for view/edit/delete modal
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [editMessage, setEditMessage] = useState("");
  const [editEventDate, setEditEventDate] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Update profile modal
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  useEffect(() => {
    if (!isLoggedIn) return;

    async function fetchInquiries() {
      try {
        const token = Cookies.get("accessToken");
        const res = await fetch(`${BASE_URL}/inquiries/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch inquiries");
        const data = await res.json();
        setInquiries(data);
      } catch {
        toast.error("Could not load your inquiries.");
      } finally {
        setFetchingInquiries(false);
      }
    }

    fetchInquiries();
  }, [isLoggedIn]);

  function openView(inquiry: Inquiry) {
    setSelectedInquiry(inquiry);
    setModalMode("view");
  }

  function openEdit(inquiry: Inquiry) {
    setSelectedInquiry(inquiry);
    setEditMessage(inquiry.message);
    setEditEventDate(inquiry.eventDate ?? "");
    setModalMode("edit");
  }

  function closeModal() {
    setSelectedInquiry(null);
    setModalMode("view");
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    setIsDeleting(true);
    try {
      const token = Cookies.get("accessToken");
      const res = await fetch(`${BASE_URL}/inquiries/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      closeModal();
      toast.success("Inquiry deleted.");
    } catch {
      toast.error("Failed to delete inquiry.");
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleSaveEdit() {
    if (!selectedInquiry) return;
    setIsSaving(true);
    try {
      const token = Cookies.get("accessToken");
      const res = await fetch(`${BASE_URL}/inquiries/${selectedInquiry.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: editMessage,
          ...(editEventDate ? { eventDate: editEventDate } : {}),
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setInquiries((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      closeModal();
      toast.success("Inquiry updated.");
    } catch {
      toast.error("Failed to update inquiry.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpdateProfile() {
    if (!updateName.trim()) return;
    setIsUpdatingProfile(true);
    try {
      const token = Cookies.get("accessToken");
      const res = await fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: updateName }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      // Update cookie with new name
      const storedUser = Cookies.get("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        Cookies.set("user", JSON.stringify({ ...parsed, name: updated.name }), { expires: 7, sameSite: "strict" });
      }
      setShowUpdateProfile(false);
      toast.success("Profile updated. Refresh to see changes in the navbar.");
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setIsUpdatingProfile(false);
    }
  }

  function handleLogout() {
    logout();
    router.push("/");
    toast.success("Logged out successfully.");
  }

  if (isLoading || !isLoggedIn) return null;

  return (
    <main className="min-h-screen bg-[var(--color-cream)] pt-32 pb-24">
      <div className="container mx-auto px-8 flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-[var(--font-montserrat)] font-light text-[0.75rem] tracking-[0.35em] uppercase text-[var(--color-red)] opacity-70">
              Your Account
            </p>
            <h1 className="font-[Playfair_Display] text-4xl xl:text-5xl font-bold text-[var(--color-red-deep)]">
              Welcome, <em className="italic font-normal text-[var(--color-red)]">{user?.name}</em>
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
              <span className="text-[var(--color-red)] opacity-60 text-lg">☕</span>
              <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => { setUpdateName(user?.name ?? ""); setShowUpdateProfile(true); }}
              className="font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-6 py-3 bg-transparent text-[var(--color-red)] border border-[var(--color-red)] transition-all duration-300 hover:bg-[var(--color-red)] hover:text-[var(--color-cream)] cursor-pointer"
            >
              Update Profile
            </button>
            <button
              onClick={handleLogout}
              className="font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-6 py-3 bg-[var(--color-red)] text-[var(--color-cream)] border border-[var(--color-red)] transition-all duration-300 hover:bg-transparent hover:text-[var(--color-red)] cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* User info card */}
        <div className="bg-white border border-[rgba(178,22,0,0.1)] p-8 flex flex-col sm:flex-row gap-6 sm:gap-12">
          <div className="flex flex-col gap-1">
            <p className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-red)] opacity-50">Email</p>
            <p className="font-[var(--font-montserrat)] text-[0.9rem] text-[var(--color-red-deep)]">{user?.email}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-red)] opacity-50">Name</p>
            <p className="font-[var(--font-montserrat)] text-[0.9rem] text-[var(--color-red-deep)]">{user?.name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-red)] opacity-50">Role</p>
            <p className="font-[var(--font-montserrat)] text-[0.9rem] text-[var(--color-red-deep)] capitalize">{user?.role?.toLowerCase()}</p>
          </div>
        </div>

        {/* Inquiries section */}
        <div className="flex flex-col gap-6">
          <h2 className="font-[Playfair_Display] text-2xl font-bold text-[var(--color-red-deep)]">
            Your <em className="italic font-normal text-[var(--color-red)]">Inquiries</em>
          </h2>

          {fetchingInquiries ? (
            <p className="font-[var(--font-montserrat)] text-[0.85rem] tracking-[0.15em] uppercase text-[var(--color-red)] opacity-50 animate-pulse">
              Loading inquiries...
            </p>
          ) : inquiries.length === 0 ? (
            <div className="bg-white border border-[rgba(178,22,0,0.1)] p-12 text-center">
              <p className="font-[var(--font-montserrat)] text-[0.85rem] text-[var(--color-red-deep)] opacity-50">
                You haven't made any inquiries yet.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-[rgba(178,22,0,0.1)] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(178,22,0,0.1)]">
                    <th className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-red)] opacity-50 text-left px-6 py-4">Type</th>
                    <th className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-red)] opacity-50 text-left px-6 py-4 hidden sm:table-cell">Message</th>
                    <th className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-red)] opacity-50 text-left px-6 py-4 hidden md:table-cell">Date</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry, i) => (
                    <tr
                      key={inquiry.id}
                      className={`border-b border-[rgba(178,22,0,0.06)] hover:bg-[rgba(178,22,0,0.02)] transition-colors cursor-pointer ${i === inquiries.length - 1 ? "border-b-0" : ""}`}
                      onClick={() => openView(inquiry)}
                    >
                      <td className="px-6 py-4">
                        <span className={`font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.1em] uppercase px-2.5 py-1 ${typeBadge[inquiry.type]}`}>
                          {typeLabel[inquiry.type]}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <p className="font-[var(--font-montserrat)] text-[0.85rem] text-[var(--color-red-deep)] opacity-70 truncate max-w-[300px]">
                          {inquiry.message}
                        </p>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="font-[var(--font-montserrat)] text-[0.8rem] text-[var(--color-red-deep)] opacity-50">
                          {new Date(inquiry.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-[var(--font-montserrat)] text-[0.7rem] tracking-[0.1em] uppercase text-[var(--color-red)] opacity-50 hover:opacity-100 transition-opacity">
                          View →
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* Inquiry modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-[300] bg-black/60 flex items-center justify-center px-4"
          onClick={closeModal}
        >
          <div
            className="bg-[var(--color-cream)] w-full max-w-lg flex flex-col gap-6 p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-[var(--color-red-deep)] opacity-40 hover:opacity-100 transition-opacity text-xl bg-transparent border-none cursor-pointer"
            >
              ✕
            </button>

            {/* Badge */}
            <span className={`font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.15em] uppercase px-2.5 py-1 w-fit ${typeBadge[selectedInquiry.type]}`}>
              {typeLabel[selectedInquiry.type]}
            </span>

            {modalMode === "view" ? (
              <>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-red)] opacity-50">Message</p>
                    <p className="font-[var(--font-montserrat)] text-[0.9rem] text-[var(--color-red-deep)] leading-relaxed">{selectedInquiry.message}</p>
                  </div>
                  {selectedInquiry.eventDate && (
                    <div className="flex flex-col gap-1">
                      <p className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-red)] opacity-50">Preferred Date</p>
                      <p className="font-[var(--font-montserrat)] text-[0.9rem] text-[var(--color-red-deep)]">{selectedInquiry.eventDate}</p>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <p className="font-[var(--font-montserrat)] text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-red)] opacity-50">Submitted</p>
                    <p className="font-[var(--font-montserrat)] text-[0.9rem] text-[var(--color-red-deep)]">
                      {new Date(selectedInquiry.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => openEdit(selectedInquiry)}
                    className="flex-1 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-6 py-3 bg-transparent text-[var(--color-red)] border border-[var(--color-red)] transition-all duration-300 hover:bg-[var(--color-red)] hover:text-[var(--color-cream)] cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(selectedInquiry.id)}
                    disabled={isDeleting}
                    className="flex-1 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-6 py-3 bg-[var(--color-red)] text-[var(--color-cream)] border border-[var(--color-red)] transition-all duration-300 hover:bg-transparent hover:text-[var(--color-red)] cursor-pointer disabled:opacity-50"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[var(--font-montserrat)] text-[0.8rem] tracking-[0.1em] uppercase text-[var(--color-red-deep)] opacity-80">
                      Message
                    </label>
                    <textarea
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      className="font-[var(--font-montserrat)] text-[0.9rem] text-[var(--color-red-deep)] border border-[rgba(178,22,0,0.2)] p-3 min-h-[120px] bg-white resize-none focus:outline-none focus:border-[var(--color-red)]"
                    />
                  </div>

                  {selectedInquiry.type === "EVENT" && (
                    <div className="flex flex-col gap-1.5">
                      <label className="font-[var(--font-montserrat)] text-[0.8rem] tracking-[0.1em] uppercase text-[var(--color-red-deep)] opacity-80">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={editEventDate}
                        onChange={(e) => setEditEventDate(e.target.value)}
                        className="font-[var(--font-montserrat)] text-[0.9rem] text-[var(--color-red-deep)] border border-[rgba(178,22,0,0.2)] p-3 bg-white focus:outline-none focus:border-[var(--color-red)]"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setModalMode("view")}
                    className="flex-1 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-6 py-3 bg-transparent text-[var(--color-red)] border border-[var(--color-red)] transition-all duration-300 hover:bg-[var(--color-red)] hover:text-[var(--color-cream)] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    disabled={isSaving}
                    className="flex-1 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-6 py-3 bg-[var(--color-red)] text-[var(--color-cream)] border border-[var(--color-red)] transition-all duration-300 hover:bg-transparent hover:text-[var(--color-red)] cursor-pointer disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Update profile modal */}
      {showUpdateProfile && (
        <div
          className="fixed inset-0 z-[300] bg-black/60 flex items-center justify-center px-4"
          onClick={() => setShowUpdateProfile(false)}
        >
          <div
            className="bg-[var(--color-cream)] w-full max-w-md flex flex-col gap-6 p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowUpdateProfile(false)}
              className="absolute top-4 right-4 text-[var(--color-red-deep)] opacity-40 hover:opacity-100 transition-opacity text-xl bg-transparent border-none cursor-pointer"
            >
              ✕
            </button>

            <h3 className="font-[Playfair_Display] text-2xl font-bold text-[var(--color-red-deep)]">
              Update <em className="italic font-normal text-[var(--color-red)]">Profile</em>
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="font-[var(--font-montserrat)] text-[0.8rem] tracking-[0.1em] uppercase text-[var(--color-red-deep)] opacity-80">
                Name
              </label>
              <input
                type="text"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                className="font-[var(--font-montserrat)] text-[0.9rem] text-[var(--color-red-deep)] border border-[rgba(178,22,0,0.2)] p-3 bg-white focus:outline-none focus:border-[var(--color-red)]"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowUpdateProfile(false)}
                className="flex-1 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-6 py-3 bg-transparent text-[var(--color-red)] border border-[var(--color-red)] transition-all duration-300 hover:bg-[var(--color-red)] hover:text-[var(--color-cream)] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                disabled={isUpdatingProfile}
                className="flex-1 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-6 py-3 bg-[var(--color-red)] text-[var(--color-cream)] border border-[var(--color-red)] transition-all duration-300 hover:bg-transparent hover:text-[var(--color-red)] cursor-pointer disabled:opacity-50"
              >
                {isUpdatingProfile ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}