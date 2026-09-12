"use client";

import { useState } from "react";

const initialSlides = [
  {
    id: 1,
    title: "Cover",
    content: "Kopi Nusantara",
  },
  {
    id: 2,
    title: "Tentang Bisnis",
    content: "Profil dan cerita bisnis Kopi Nusantara",
  },
  {
    id: 3,
    title: "Produk atau Layanan",
    content: "Produk kopi lokal berkualitas",
  },
  {
    id: 4,
    title: "Keunggulan",
    content: "Bahan pilihan • Cita rasa khas • Harga kompetitif",
  },
  {
    id: 5,
    title: "Target Pasar",
    content: "Pecinta kopi, mahasiswa, dan pekerja",
  },
  {
    id: 6,
    title: "Penutup",
    content: "Mari tumbuh bersama Kopi Nusantara",
  },
];

export default function EditorPage() {
  const [slides, setSlides] = useState(initialSlides);
  const [selectedSlide, setSelectedSlide] = useState(1);

  const currentSlide = slides.find(
    (slide) => slide.id === selectedSlide
  );

  const updateTitle = (value: string) => {
    setSlides((current) =>
      current.map((slide) =>
        slide.id === selectedSlide
          ? { ...slide, title: value }
          : slide
      )
    );
  };

  const updateContent = (value: string) => {
    setSlides((current) =>
      current.map((slide) =>
        slide.id === selectedSlide
          ? { ...slide, content: value }
          : slide
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#eef2f8] text-[#17213a]">

      {/* Top Bar */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-6">

        <div>
          <h1 className="font-bold">
            Editor Presentasi
          </h1>

          <p className="text-xs text-[#7185a4]">
            Kopi Nusantara
          </p>
        </div>

        <button className="rounded-xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-6 py-3 text-sm font-semibold text-white">
          Export Presentasi
        </button>

      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">

        {/* Sidebar */}
        <aside className="w-64 border-r bg-white p-4">

          <p className="mb-4 text-sm font-semibold text-[#7185a4]">
            SLIDE
          </p>

          <div className="space-y-3">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setSelectedSlide(slide.id)}
                className={`w-full rounded-xl border p-2 text-left transition ${
                  selectedSlide === slide.id
                    ? "border-[#6d4aff] bg-[#f3efff]"
                    : "border-[#e1e6ef] hover:bg-[#f7f9fc]"
                }`}
              >

                {/* Thumbnail */}
                <div
                  className="flex aspect-video items-center justify-center rounded-lg p-3 text-center"
                  style={{
                    backgroundColor:
                      index === 0 ? "#0F4C81" : "#ffffff",
                  }}
                >
                  <span
                    className={`text-xs font-semibold ${
                      index === 0
                        ? "text-white"
                        : "text-[#17213a]"
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

            <button className="rounded-lg px-4 py-2 text-sm hover:bg-[#f3f5f9]">
              + Tambah Slide
            </button>
          </div>

          {/* 16:9 Canvas */}
          <div className="w-full max-w-4xl">

            <div
              className="relative aspect-video overflow-hidden rounded-2xl bg-white shadow-xl"
              style={{
                borderTop: "12px solid #0F4C81",
              }}
            >

              <div className="flex h-full flex-col justify-center px-16">

                <input
                  value={currentSlide?.title || ""}
                  onChange={(e) =>
                    updateTitle(e.target.value)
                  }
                  className="mb-6 bg-transparent text-4xl font-bold outline-none"
                />

                <textarea
                  value={currentSlide?.content || ""}
                  onChange={(e) =>
                    updateContent(e.target.value)
                  }
                  rows={5}
                  className="w-full resize-none bg-transparent text-xl leading-relaxed text-[#53627a] outline-none"
                />

                <div className="mt-8 h-2 w-24 rounded-full bg-[#F2A007]" />

              </div>

              <div className="absolute bottom-5 right-6 text-xs text-[#9aa8bd]">
                {selectedSlide} / {slides.length}
              </div>

            </div>

          </div>

          <p className="mt-4 text-sm text-[#7185a4]">
            Klik teks pada canvas untuk mengedit isi slide.
          </p>

        </section>

      </div>

    </main>
  );
}