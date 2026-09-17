// app/create/editor/page.tsx
//
// CATATAN DESAIN: canvas single-textarea di versi lama diasumsikan untuk 1
// bentuk slide (judul + 1 blok teks). Backend punya 6 layout dengan field
// berbeda (bullets, cards, subtitle) yang sudah bisa diedit LENGKAP di
// halaman sebelumnya (/create/content, Langkah 6). Supaya tidak membangun
// editor generik yang menebak-nebak bentuk edit yang Anda mau untuk tiap
// layout, saya jadikan canvas di sini sebagai PREVIEW akhir (judul masih
// bisa diedit cepat di sini) + tempat export — struktur/isi detail (bullets,
// cards) diedit di Langkah 6. Kalau Anda mau editor penuh (drag-drop,
// reorder slide, dst), itu scope terpisah yang perlu didiskusikan.
"use client";

import { useState } from "react";
import { useRequireAuth } from "@/lib/useRequireAuth";
import { useWizardStore } from "@/store/useWizardStore";
import { exportPdf, exportPptx, saveSlides } from "@/lib/pitchku-api";
import { ApiClientError } from "@/lib/api-client";
import type { Slide } from "@/lib/types";

function slideBodyPreview(slide: Slide): string {
  switch (slide.layout) {
    case "title_slide":
    case "contact_closing":
      return slide.subtitle ?? "";
    case "title_bullets":
    case "two_column":
      return slide.bullets.map((bullet) => `• ${bullet}`).join("\n");
    case "metrics_grid":
    case "card_grid":
      return slide.cards
        .map((card) => `${card.header} — ${card.description}`)
        .join("\n");
  }
}

export default function EditorPage() {
  const { isAuthenticated } = useRequireAuth();
  const projectId = useWizardStore((state) => state.projectId);
  const businessContext = useWizardStore((state) => state.businessContext);
  const brandKit = useWizardStore((state) => state.brandKit);
  const slides = useWizardStore((state) => state.slides);
  const setSlides = useWizardStore((state) => state.setSlides);

  const [selectedSlideNumber, setSelectedSlideNumber] = useState(
    slides[0]?.slideNumber ?? 1,
  );
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [downloadInfo, setDownloadInfo] = useState<{
    url: string;
    fileName: string;
  } | null>(null);

  if (!isAuthenticated) return null;
  if (!projectId || slides.length === 0) return null;

  const currentSlide = slides.find((s) => s.slideNumber === selectedSlideNumber);
  const primaryColor = brandKit?.primaryColor ?? "#0F4C81";
  const accentColor = brandKit?.accentColor ?? "#F2A007";
  const fontFamily = brandKit?.fontFamily ?? "Inter";
  const currentIndex = slides.findIndex((s) => s.slideNumber === selectedSlideNumber);

  const updateTitle = (value: string) => {
    setSlides(
      slides.map((slide) =>
        slide.slideNumber === selectedSlideNumber
          ? ({ ...slide, title: value } as Slide)
          : slide,
      ),
    );
  };

  const handleExport = async (format: "pptx" | "pdf") => {
    setIsExportMenuOpen(false);
    setExportError(null);
    setDownloadInfo(null);
    setIsExporting(true);
    try {
      // Simpan dulu perubahan judul yang mungkin diedit di canvas ini,
      // supaya file yang di-export mencerminkan versi terakhir yang dilihat
      // user, bukan hasil generate AI yang sudah ditinggalkan.
      await saveSlides(projectId, slides);
      const result = await (format === "pptx"
        ? exportPptx(projectId)
        : exportPdf(projectId));
      setDownloadInfo({ url: result.downloadUrl, fileName: result.fileName });
    } catch (error) {
      setExportError(
        error instanceof ApiClientError
          ? error.message
          : "Gagal mengekspor presentasi. Coba lagi.",
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#eef2f8] text-[#17213a]">
      {/* Top Bar */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div>
          <h1 className="font-bold">Editor Presentasi</h1>
          <p className="text-xs text-[#7185a4]">
            {businessContext?.businessName ?? "Presentasi Anda"}
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsExportMenuOpen((open) => !open)}
            disabled={isExporting}
            className="rounded-xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isExporting ? "Mengekspor..." : "Export Presentasi"}
          </button>

          {isExportMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#e1e6ef] bg-white p-2 shadow-lg">
              <button
                onClick={() => handleExport("pptx")}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#f3f5f9]"
              >
                Sebagai PowerPoint (.pptx)
              </button>
              <button
                onClick={() => handleExport("pdf")}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#f3f5f9]"
              >
                Sebagai PDF
              </button>
            </div>
          )}
        </div>
      </header>

      {(exportError || downloadInfo) && (
        <div className="px-6 pt-4">
          {exportError && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {exportError}
            </p>
          )}
          {downloadInfo && (
            <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              Berhasil dibuat:{" "}
              <a
                href={downloadInfo.url}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline"
              >
                Unduh {downloadInfo.fileName}
              </a>
            </p>
          )}
        </div>
      )}

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-white p-4">
          <p className="mb-4 text-sm font-semibold text-[#7185a4]">SLIDE</p>

          <div className="space-y-3">
            {slides.map((slide, index) => (
              <button
                key={slide.slideNumber}
                onClick={() => setSelectedSlideNumber(slide.slideNumber)}
                className={`w-full rounded-xl border p-2 text-left transition ${
                  selectedSlideNumber === slide.slideNumber
                    ? "border-[#6d4aff] bg-[#f3efff]"
                    : "border-[#e1e6ef] hover:bg-[#f7f9fc]"
                }`}
              >
                <div
                  className="flex aspect-video items-center justify-center rounded-lg p-3 text-center"
                  style={{ backgroundColor: index === 0 ? primaryColor : "#ffffff" }}
                >
                  <span
                    className={`text-xs font-semibold ${
                      index === 0 ? "text-white" : "text-[#17213a]"
                    }`}
                  >
                    {slide.title}
                  </span>
                </div>

                <p className="mt-2 text-xs font-semibold">
                  {index + 1}. {slide.title}
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* Canvas Area */}
        <section className="flex flex-1 flex-col items-center p-8">
          {/* Toolbar */}
          <div className="mb-6 flex gap-2 rounded-xl bg-white p-2 shadow-sm">
            <button className="rounded-lg px-4 py-2 text-sm hover:bg-[#f3f5f9]">
              Undo
            </button>
            <button className="rounded-lg px-4 py-2 text-sm hover:bg-[#f3f5f9]">
              Redo
            </button>
          </div>

          {/* 16:9 Canvas */}
          <div className="w-full max-w-4xl">
            <div
              className="relative aspect-video overflow-hidden rounded-2xl bg-white shadow-xl"
              style={{ borderTop: `12px solid ${primaryColor}` }}
            >
              <div
                className="flex h-full flex-col justify-center px-16"
                style={{ fontFamily }}
              >
                <input
                  value={currentSlide?.title ?? ""}
                  onChange={(e) => updateTitle(e.target.value)}
                  className="mb-6 bg-transparent text-4xl font-bold outline-none"
                />

                <p className="whitespace-pre-line text-xl leading-relaxed text-[#53627a]">
                  {currentSlide ? slideBodyPreview(currentSlide) : ""}
                </p>

                <div
                  className="mt-8 h-2 w-24 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              </div>

              <div className="absolute bottom-5 right-6 text-xs text-[#9aa8bd]">
                {currentIndex + 1} / {slides.length}
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-[#7185a4]">
            Untuk mengubah poin/kartu secara detail, kembali ke langkah{" "}
            <span className="font-semibold">Isi Slide</span>. Di sini Anda
            bisa menyesuaikan judul dan langsung mengekspor presentasi.
          </p>
        </section>
      </div>
    </main>
  );
}