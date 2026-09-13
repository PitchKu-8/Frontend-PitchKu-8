"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BrandKitPage() {
  const router = useRouter();

  const [primaryColor, setPrimaryColor] = useState("#0F4C81");
  const [accentColor, setAccentColor] = useState("#F2A007");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [logo, setLogo] = useState<File | null>(null);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f7fc] text-[#17213a]">
      <div className="flex min-h-screen flex-col md:flex-row">

        {/* Sidebar */}
        <aside className="hidden w-full shrink-0 flex-col bg-[#f4f7fc] p-4 md:flex md:w-[260px] lg:w-[280px] lg:p-5">

          {/* Logo */}
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b4dff] to-[#287cff] text-2xl font-bold text-white">
              P
            </div>

            <span className="text-2xl font-bold">
              PitchKu
            </span>
          </div>

          {/* New Presentation Button */}
          <button
            type="button"
            onClick={() => router.push("/create/template")}
            className="mt-8 flex min-h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-4 py-4 text-center text-base font-semibold text-white shadow-md transition hover:opacity-90 lg:text-lg"
          >
            <span className="text-2xl font-light">+</span>
            <span>Buat Presentasi Baru</span>
          </button>

          {/* Navigation */}
          <nav className="mt-10 space-y-3">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left text-base font-medium text-[#647a9e] transition hover:bg-white lg:gap-4 lg:px-5 lg:text-lg"
            >
              <span className="text-2xl">▱</span>
              <span>Proyek Saya</span>
            </button>

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl bg-[#dce9ff] px-4 py-4 text-left text-base font-semibold text-[#2164ff] lg:gap-4 lg:px-5 lg:text-lg"
            >
              <span className="text-2xl">◉</span>
              <span>Brand Kit Usaha</span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/settings")}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left text-base font-medium text-[#647a9e] transition hover:bg-white lg:gap-4 lg:px-5 lg:text-lg"
            >
              <span className="text-2xl">⚙</span>
              <span>Pengaturan</span>
            </button>
          </nav>

          {/* User Profile */}
          <div className="mt-auto rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef3fa] text-lg font-medium text-[#46617f]">
                BS
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">
                  Budi Santoso
                </p>

                <p className="truncate text-sm text-[#7185a4]">
                  Kopi Nusantara
                </p>
              </div>

              <span className="text-2xl text-red-400">
                ↪
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="min-w-0 flex-1 overflow-hidden p-3 sm:p-4 lg:p-5">
          <div className="min-h-[calc(100vh-40px)] rounded-[28px] bg-gradient-to-br from-[#f1f4ff] to-[#fbf9ff] px-4 py-6 sm:px-6 sm:py-8 lg:rounded-[40px] lg:px-10 lg:py-8">

            {/* Mobile Header */}
            <div className="mb-6 flex items-center justify-between md:hidden">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b4dff] to-[#287cff] text-xl font-bold text-white">
                  P
                </div>

                <span className="text-xl font-bold">
                  PitchKu
                </span>
              </div>

              <button
                type="button"
                onClick={() => router.push("/")}
                className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-[#647a9e] shadow-sm"
              >
                Proyek Saya
              </button>
            </div>

            {/* Header */}
            <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold text-[#6d4aff] md:hidden">
                  BRAND KIT
                </p>

                <h1 className="text-3xl font-bold sm:text-4xl">
                  Atur Brand Kit
                </h1>

                <p className="mt-3 max-w-3xl text-base text-[#7185a4] sm:text-lg">
                  Sesuaikan tampilan presentasi dengan identitas bisnis Anda.
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push("/create/process")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-5 py-3 text-base font-semibold text-white shadow-md transition hover:opacity-90 sm:w-fit"
              >
                ✓ Simpan Perubahan
              </button>
            </div>

            {/* Content Grid */}
            <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">

              {/* Left Column */}
              <div className="min-w-0 space-y-6">

                {/* Logo */}
                <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-8">
                  <h2 className="text-xl font-bold sm:text-2xl">
                    Logo Usaha
                  </h2>

                  <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-44 w-full shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-[#cbd8eb] bg-[#f8fafc] sm:w-44">
                      <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-white text-2xl font-bold text-[#17213a] shadow-sm">
                        {logo ? "LOGO" : "KN"}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-base leading-7 text-[#7185a4]">
                        Upload logo resmi perusahaan Anda.
                        Format yang disarankan: PNG atau SVG
                        dengan background transparan.
                        Maksimal ukuran file 2MB.
                      </p>

                      <input
                        id="logo-upload"
                        type="file"
                        accept=".png,.jpg,.jpeg,.svg"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setLogo(file);
                        }}
                        className="mt-4 block w-full text-sm"
                      />

                      {logo && (
                        <p className="mt-2 break-all text-sm text-[#7185a4]">
                          File dipilih: {logo.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-8">
                  <h2 className="text-xl font-bold sm:text-2xl">
                    Palet Warna
                  </h2>

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">

                    {/* Primary Color */}
                    <div className="min-w-0">
                      <label className="mb-2 block font-semibold">
                        Warna Utama
                      </label>

                      <div className="flex min-w-0 gap-3">
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="h-12 w-14 shrink-0 cursor-pointer rounded-lg"
                        />

                        <input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="min-w-0 w-full rounded-xl border border-[#dce3ef] px-3 py-3 uppercase outline-none focus:border-[#6d4aff]"
                        />
                      </div>
                    </div>

                    {/* Accent Color */}
                    <div className="min-w-0">
                      <label className="mb-2 block font-semibold">
                        Warna Aksen
                      </label>

                      <div className="flex min-w-0 gap-3">
                        <input
                          type="color"
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                          className="h-12 w-14 shrink-0 cursor-pointer rounded-lg"
                        />

                        <input
                          type="text"
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                          className="min-w-0 w-full rounded-xl border border-[#dce3ef] px-3 py-3 uppercase outline-none focus:border-[#6d4aff]"
                        />
                      </div>
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
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="min-w-0 rounded-3xl bg-white p-5 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold sm:text-2xl">
                  Live Preview
                </h2>

                <p className="mt-2 text-sm text-[#7185a4]">
                  Contoh tampilan warna presentasi Anda.
                </p>

                <div
                  className="mt-6 overflow-hidden rounded-2xl border border-[#dce3ef]"
                  style={{ fontFamily }}
                >
                  <div
                    className="p-5 text-white sm:p-8"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <p className="text-xs opacity-80 sm:text-sm">
                      PITCHKU PRESENTATION
                    </p>

                    <h3 className="mt-3 text-xl font-bold sm:text-2xl">
                      Contoh Judul Presentasi
                    </h3>

                    <p className="mt-2 text-sm opacity-90 sm:text-base">
                      Preview tampilan berdasarkan brand Anda.
                    </p>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div
                      className="mb-4 h-3 w-24 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />

                    <p className="text-sm leading-6 text-[#7185a4]">
                      Warna utama dan aksen akan digunakan
                      dalam desain slide.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-xl border border-[#dce3ef] bg-white px-6 py-3 font-semibold text-[#647a9e] transition hover:bg-[#f5f7ff]"
              >
                ← Kembali
              </button>

              <button
                type="button"
                onClick={() => router.push("/create/process")}
                className="rounded-xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
              >
                Lanjut ke Proses AI →
              </button>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}