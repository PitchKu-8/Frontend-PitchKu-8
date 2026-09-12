"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialSlides = [
  {
    id: 1,
    title: "Cover",
    objective: "Memperkenalkan bisnis dan identitas usaha",
  },
  {
    id: 2,
    title: "Tentang Bisnis",
    objective: "Menjelaskan profil dan latar belakang bisnis",
  },
  {
    id: 3,
    title: "Produk atau Layanan",
    objective: "Menampilkan produk atau layanan utama",
  },
  {
    id: 4,
    title: "Keunggulan",
    objective: "Menjelaskan keunggulan dibandingkan kompetitor",
  },
  {
    id: 5,
    title: "Target Pasar",
    objective: "Menjelaskan target audiens dan peluang pasar",
  },
  {
    id: 6,
    title: "Penutup",
    objective: "Memberikan kesimpulan dan ajakan bertindak",
  },
];

export default function OutlinePage() {
  const router = useRouter();
  const [slides, setSlides] = useState(initialSlides);

  const updateTitle = (id: number, value: string) => {
    setSlides((current) =>
      current.map((slide) =>
        slide.id === id
          ? { ...slide, title: value }
          : slide
      )
    );
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
            AI telah menyusun struktur presentasi. Anda dapat
            mengubah judul slide sebelum melanjutkan.
          </p>
        </div>

        {/* Outline */}
        <div className="space-y-4">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-5">

                {/* Number */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0eaff] font-bold text-[#6d4aff]">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1">

                  <label className="mb-2 block text-sm font-semibold text-[#7185a4]">
                    Judul Slide
                  </label>

                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) =>
                      updateTitle(slide.id, e.target.value)
                    }
                    maxLength={60}
                    className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 font-semibold outline-none focus:border-[#6d4aff]"
                  />

                  <p className="mt-3 text-sm text-[#7185a4]">
                    <span className="font-semibold">
                      Tujuan:
                    </span>{" "}
                    {slide.objective}
                  </p>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-8 flex justify-between">

          <button
            onClick={() => router.back()}
            className="rounded-xl border border-[#dce3ef] bg-white px-6 py-3 font-semibold"
          >
            ← Kembali
          </button>

          <button
            onClick={() => router.push("/create/content")}
            className="rounded-xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-8 py-4 font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Lanjut ke Isi Slide →
          </button>

        </div>

      </div>
    </main>
  );
}