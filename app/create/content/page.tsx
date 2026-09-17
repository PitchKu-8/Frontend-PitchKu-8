// app/create/content/page.tsx
//
// PERBAIKAN vs versi lama: versi lama punya 1 bentuk slide (title + 1 blok
// teks) yang tidak cocok dengan output backend, yang punya 6 layout berbeda
// (lihat deck.schema.ts: title_slide, title_bullets, two_column,
// metrics_grid, card_grid, contact_closing) — masing-masing field-nya beda
// (bullets[], cards[], subtitle, dst). Halaman ini sekarang merender &
// mengedit tiap layout sesuai bentuk datanya, tapi tetap memakai bahasa
// visual yang sama (card putih rounded-3xl, nomor slide, dst).
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/lib/useRequireAuth";
import { useWizardStore } from "@/store/useWizardStore";
import { saveSlides } from "@/lib/pitchku-api";
import { ApiClientError } from "@/lib/api-client";
import type { Slide, SlideCard } from "@/lib/types";

const LAYOUT_LABELS: Record<Slide["layout"], string> = {
  title_slide: "Sampul",
  title_bullets: "Judul + Poin",
  two_column: "Dua Kolom",
  metrics_grid: "Grid Metrik",
  card_grid: "Grid Kartu",
  contact_closing: "Penutup",
};

export default function ContentPage() {
  const router = useRouter();
  const { isAuthenticated } = useRequireAuth();
  const projectId = useWizardStore((state) => state.projectId);
  const slides = useWizardStore((state) => state.slides);
  const setSlides = useWizardStore((state) => state.setSlides);

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthenticated) return null;

  if (slides.length === 0) {
    router.replace("/create/template");
    return null;
  }

  const handleOpenEditor = async () => {
    if (!projectId) return;
    setErrorMessage(null);
    setIsSaving(true);
    try {
      await saveSlides(projectId, slides);
      router.push("/create/editor");
    } catch (error) {
      setErrorMessage(
        error instanceof ApiClientError
          ? error.message
          : "Gagal menyimpan perubahan. Coba lagi.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const updateSlide = (slideNumber: number, patch: Partial<Slide>) => {
    setSlides(
      slides.map((slide) =>
        slide.slideNumber === slideNumber
          ? ({ ...slide, ...patch } as Slide)
          : slide,
      ),
    );
  };

  const updateCard = (
    slideNumber: number,
    cardIndex: number,
    patch: Partial<SlideCard>,
  ) => {
    const slide = slides.find((s) => s.slideNumber === slideNumber);
    if (!slide || !("cards" in slide)) return;
    const nextCards = slide.cards.map((card, index) =>
      index === cardIndex ? { ...card, ...patch } : card,
    );
    updateSlide(slideNumber, { cards: nextCards } as Partial<Slide>);
  };

  return (
    <main className="min-h-screen bg-[#f4f7fc] p-8 text-[#17213a]">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#6d4aff]">
            LANGKAH 6 DARI 7
          </p>

          <h1 className="mt-2 text-4xl font-bold">Isi Slide</h1>

          <p className="mt-3 text-lg text-[#7185a4]">
            AI telah membuat isi berdasarkan outline yang Anda pilih. Anda
            masih dapat melakukan perubahan sebelum masuk ke editor.
          </p>
        </div>

        {/* Slides */}
        <div className="space-y-6">
          {slides.map((slide, index) => (
            <div key={slide.slideNumber} className="rounded-3xl bg-white p-7 shadow-sm">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0eaff] font-bold text-[#6d4aff]">
                  {index + 1}
                </div>

                <div>
                  <p className="text-sm text-[#7185a4]">
                    Slide {index + 1} · {LAYOUT_LABELS[slide.layout]}
                  </p>
                  <h2 className="font-bold">{slide.title}</h2>
                </div>
              </div>

              <label className="mb-2 block text-sm font-semibold">Judul Slide</label>
              <input
                type="text"
                value={slide.title}
                maxLength={60}
                onChange={(e) =>
                  updateSlide(slide.slideNumber, { title: e.target.value } as Partial<Slide>)
                }
                className="mb-5 w-full rounded-xl border border-[#dce3ef] px-4 py-3 font-semibold outline-none focus:border-[#6d4aff]"
              />

              {(slide.layout === "title_slide" ||
                slide.layout === "contact_closing") && (
                <>
                  <label className="mb-2 block text-sm font-semibold">
                    Subjudul
                  </label>
                  <textarea
                    value={slide.subtitle ?? ""}
                    maxLength={120}
                    rows={2}
                    onChange={(e) =>
                      updateSlide(slide.slideNumber, {
                        subtitle: e.target.value,
                      } as Partial<Slide>)
                    }
                    className="w-full resize-none rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
                  />
                </>
              )}

              {(slide.layout === "title_bullets" ||
                slide.layout === "two_column") && (
                <>
                  <label className="mb-2 block text-sm font-semibold">
                    Poin-poin (satu baris = satu poin, maks 5)
                  </label>
                  <textarea
                    value={slide.bullets.join("\n")}
                    rows={5}
                    onChange={(e) =>
                      updateSlide(slide.slideNumber, {
                        bullets: e.target.value
                          .split("\n")
                          .slice(0, 5),
                      } as Partial<Slide>)
                    }
                    className="w-full resize-none rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
                  />
                </>
              )}

              {(slide.layout === "metrics_grid" ||
                slide.layout === "card_grid") && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {slide.cards.map((card, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="rounded-xl border border-[#dce3ef] p-4"
                    >
                      <label className="mb-1 block text-xs font-semibold text-[#7185a4]">
                        Header (maks 30 karakter)
                      </label>
                      <input
                        type="text"
                        value={card.header}
                        maxLength={30}
                        onChange={(e) =>
                          updateCard(slide.slideNumber, cardIndex, {
                            header: e.target.value,
                          })
                        }
                        className="mb-3 w-full rounded-lg border border-[#dce3ef] px-3 py-2 font-semibold outline-none focus:border-[#6d4aff]"
                      />

                      <label className="mb-1 block text-xs font-semibold text-[#7185a4]">
                        Deskripsi (maks 80 karakter)
                      </label>
                      <textarea
                        value={card.description}
                        maxLength={80}
                        rows={2}
                        onChange={(e) =>
                          updateCard(slide.slideNumber, cardIndex, {
                            description: e.target.value,
                          })
                        }
                        className="w-full resize-none rounded-lg border border-[#dce3ef] px-3 py-2 text-sm outline-none focus:border-[#6d4aff]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {errorMessage && (
          <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        {/* Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => router.back()}
            disabled={isSaving}
            className="rounded-xl border border-[#dce3ef] bg-white px-6 py-3 font-semibold disabled:opacity-50"
          >
            ← Kembali
          </button>

          <button
            onClick={handleOpenEditor}
            disabled={isSaving}
            className="rounded-xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-8 py-4 font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
          >
            {isSaving ? "Menyimpan..." : "Buka Editor Slide →"}
          </button>
        </div>
      </div>
    </main>
  );
}