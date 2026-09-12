"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialSlides = [
  {
    id: 1,
    title: "Cover",
    content: "Kopi Nusantara\nKopi Lokal dengan Cita Rasa Berkualitas",
  },
  {
    id: 2,
    title: "Tentang Bisnis",
    content:
      "Kopi Nusantara merupakan bisnis kopi lokal yang menghadirkan produk berkualitas dengan cita rasa khas Indonesia.",
  },
  {
    id: 3,
    title: "Produk atau Layanan",
    content:
      "Berbagai pilihan kopi lokal dengan bahan berkualitas dan proses produksi yang terjaga.",
  },
  {
    id: 4,
    title: "Keunggulan",
    content:
      "• Bahan kopi pilihan\n• Cita rasa khas Indonesia\n• Harga kompetitif\n• Kualitas terjaga",
  },
  {
    id: 5,
    title: "Target Pasar",
    content:
      "Produk ditujukan untuk pecinta kopi, mahasiswa, pekerja, serta konsumen yang mencari kopi lokal berkualitas.",
  },
  {
    id: 6,
    title: "Penutup",
    content:
      "Mari tumbuh bersama dan mengenalkan kopi lokal Indonesia kepada lebih banyak konsumen.",
  },
];

export default function ContentPage() {
  const router = useRouter();
  const [slides, setSlides] = useState(initialSlides);

  const updateContent = (id: number, value: string) => {
    setSlides((current) =>
      current.map((slide) =>
        slide.id === id
          ? { ...slide, content: value }
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
            LANGKAH 6 DARI 7
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Isi Slide
          </h1>

          <p className="mt-3 text-lg text-[#7185a4]">
            AI telah membuat isi berdasarkan outline yang Anda pilih.
            Anda masih dapat melakukan perubahan sebelum masuk ke editor.
          </p>
        </div>

        {/* Slides */}
        <div className="space-y-6">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="rounded-3xl bg-white p-7 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0eaff] font-bold text-[#6d4aff]">
                  {index + 1}
                </div>

                <div>
                  <p className="text-sm text-[#7185a4]">
                    Slide {index + 1}
                  </p>

                  <h2 className="font-bold">
                    {slide.title}
                  </h2>
                </div>

              </div>

              <label className="mb-2 block text-sm font-semibold">
                Isi Slide
              </label>

              <textarea
                value={slide.content}
                onChange={(e) =>
                  updateContent(slide.id, e.target.value)
                }
                rows={6}
                className="w-full resize-none rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-between">

          <button
            onClick={() => router.back()}
            className="rounded-xl border border-[#dce3ef] bg-white px-6 py-3 font-semibold"
          >
            ← Kembali
          </button>

          <button
            onClick={() => router.push("/create/editor")}
            className="rounded-xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-8 py-4 font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Buka Editor Slide →
          </button>

        </div>

      </div>
    </main>
  );
}