// app/create/outline/page.tsx
//
// PERBAIKAN vs versi lama: outline sekarang berasal dari
// generateOutline() di halaman /create/process (disimpan di wizard store),
// bukan array hardcoded. Tombol "Lanjut ke Isi Slide" sekarang:
//   1. PATCH outline (confirm, menyimpan hasil edit user)
//   2. POST generate content (Stage 2 — ini yang berat, bisa beberapa detik
//      karena AI generate seluruh isi slide + cari gambar per slide)
// baru kemudian pindah ke halaman /create/content dengan slides asli.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/lib/useRequireAuth";
import { useWizardStore } from "@/store/useWizardStore";
import { confirmOutline, generateContent } from "@/lib/pitchku-api";
import { ApiClientError } from "@/lib/api-client";

export default function OutlinePage() {
  const router = useRouter();
  const { isAuthenticated } = useRequireAuth();
  const projectId = useWizardStore((state) => state.projectId);
  const outline = useWizardStore((state) => state.outline);
  const setOutline = useWizardStore((state) => state.setOutline);
  const setSlides = useWizardStore((state) => state.setSlides);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthenticated) return null;

  if (!projectId || outline.length === 0) {
    router.replace("/create/template");
    return null;
  }

  const updateTitle = (slideNumber: number, value: string) => {
    setOutline(
      outline.map((slide) =>
        slide.slideNumber === slideNumber ? { ...slide, title: value } : slide,
      ),
    );
  };

  const handleContinue = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const confirmed = await confirmOutline(projectId, outline);
      setOutline(confirmed);

      const deck = await generateContent(projectId);
      setSlides(deck.slides);

      router.push("/create/content");
    } catch (error) {
      setErrorMessage(
        error instanceof ApiClientError
          ? error.message
          : "Gagal memproses outline. Coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7fc] p-8 text-[#17213a]">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#6d4aff]">
            LANGKAH 5 DARI 7
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Periksa Outline Presentasi
          </h1>

          <p className="mt-3 text-lg text-[#7185a4]">
            AI telah menyusun struktur presentasi. Anda dapat mengubah judul
            slide sebelum melanjutkan.
          </p>
        </div>

        {/* Outline */}
        <div className="space-y-4">
          {outline.map((slide, index) => (
            <div key={slide.slideNumber} className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-start gap-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0eaff] font-bold text-[#6d4aff]">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <label className="mb-2 block text-sm font-semibold text-[#7185a4]">
                    Judul Slide
                  </label>

                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => updateTitle(slide.slideNumber, e.target.value)}
                    maxLength={60}
                    className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 font-semibold outline-none focus:border-[#6d4aff]"
                  />

                  <p className="mt-3 text-sm text-[#7185a4]">
                    <span className="font-semibold">Tujuan:</span>{" "}
                    {slide.objective}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {errorMessage && (
          <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        {isSubmitting && (
          <p className="mt-6 rounded-xl bg-[#f5f7ff] px-4 py-3 text-sm text-[#6d4aff]">
            AI sedang menyusun seluruh isi slide berdasarkan outline ini —
            proses ini bisa memakan waktu beberapa saat...
          </p>
        )}

        {/* Bottom */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="rounded-xl border border-[#dce3ef] bg-white px-6 py-3 font-semibold disabled:opacity-50"
          >
            ← Kembali
          </button>

          <button
            onClick={handleContinue}
            disabled={isSubmitting}
            className="rounded-xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-8 py-4 font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
          >
            {isSubmitting ? "Memproses..." : "Lanjut ke Isi Slide →"}
          </button>
        </div>
      </div>
    </main>
  );
}