"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BrandKitPage() {
  const [primaryColor, setPrimaryColor] = useState("#0F4C81");
  const [accentColor, setAccentColor] = useState("#F2A007");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [logo, setLogo] = useState<File | null>(null);
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f4f7fc] p-8 text-[#17213a]">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#6d4aff]">
            LANGKAH 3 DARI 7
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Atur Brand Kit
          </h1>

          <p className="mt-3 text-lg text-[#7185a4]">
            Sesuaikan tampilan presentasi dengan identitas bisnis Anda.
          </p>
        </div>

        {/* Form */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Colors */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">

            <h2 className="text-xl font-bold">
              Warna Brand
            </h2>

            <p className="mt-2 text-sm text-[#7185a4]">
              Tentukan warna yang akan digunakan dalam presentasi.
            </p>

            {/* Primary Color */}
            <div className="mt-6">
              <label className="mb-2 block font-semibold">
                Warna Utama
              </label>

              <div className="flex gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-12 w-16 cursor-pointer rounded-lg"
                />

                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 rounded-xl border border-[#dce3ef] px-4 py-3 uppercase outline-none focus:border-[#6d4aff]"
                />
              </div>
            </div>

            {/* Accent Color */}
            <div className="mt-6">
              <label className="mb-2 block font-semibold">
                Warna Aksen
              </label>

              <div className="flex gap-3">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="h-12 w-16 cursor-pointer rounded-lg"
                />

                <input
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="flex-1 rounded-xl border border-[#dce3ef] px-4 py-3 uppercase outline-none focus:border-[#6d4aff]"
                />
              </div>
            </div>

            {/* Font */}
            <div className="mt-6">
              <label className="mb-2 block font-semibold">
                Font
              </label>

              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
              >
                <option value="Inter">Inter</option>
                <option value="Poppins">Poppins</option>
                <option value="Roboto">Roboto</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>

            {/* Logo */}
            <div className="mt-6">
              <label className="mb-2 block font-semibold">
                Logo Bisnis
              </label>

              <input
                type="file"
                accept=".png,.jpg,.jpeg,.svg"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setLogo(file);
                }}
                className="w-full rounded-xl border border-[#dce3ef] p-3 text-sm"
              />

              {logo && (
                <p className="mt-2 text-sm text-[#7185a4]">
                  File dipilih: {logo.name}
                </p>
              )}
            </div>

          </div>

          {/* Preview */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">

            <h2 className="text-xl font-bold">
              Preview
            </h2>

            <p className="mt-2 text-sm text-[#7185a4]">
              Contoh tampilan warna presentasi Anda.
            </p>

            <div
              className="mt-6 overflow-hidden rounded-2xl border"
              style={{
                fontFamily: fontFamily,
              }}
            >
              <div
                className="p-8 text-white"
                style={{
                  backgroundColor: primaryColor,
                }}
              >
                <p className="text-sm opacity-80">
                  PITCHKU PRESENTATION
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  Contoh Judul Presentasi
                </h3>

                <p className="mt-2 opacity-90">
                  Preview tampilan berdasarkan brand Anda.
                </p>
              </div>

              <div className="p-6">
                <div
                  className="mb-4 h-3 w-24 rounded-full"
                  style={{
                    backgroundColor: accentColor,
                  }}
                />

                <p className="text-sm text-[#7185a4]">
                  Warna utama dan aksen akan digunakan dalam desain slide.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Button */}
        <div className="mt-8 flex justify-end">
          <button
  onClick={() => router.push("/create/process")}
  className="rounded-xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-8 py-4 font-semibold text-white shadow-md transition hover:opacity-90"
>
  Lanjut ke Proses AI →
</button>
        </div>

      </div>
    </main>
  );
}