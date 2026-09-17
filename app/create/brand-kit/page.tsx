// app/create/brand-kit/page.tsx
//
// PERBAIKAN vs versi lama:
// - Logo sekarang benar-benar diupload ke backend (POST /brand-kits/logo-upload)
//   saat file dipilih, bukan cuma disimpan sebagai objek File di state.
// - Tombol "Lanjut" dinonaktifkan sampai logo berhasil diupload, karena
//   generateContent (Stage 2, tahap AI) akan ditolak backend (409
//   RESOURCE_STATE_CONFLICT) kalau brand kit belum punya logoUrl.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/lib/useRequireAuth";
import { useWizardStore } from "@/store/useWizardStore";
import { uploadLogo, upsertBrandKit } from "@/lib/pitchku-api";
import { ApiClientError } from "@/lib/api-client";

const FONT_OPTIONS = ["Inter", "Poppins", "Roboto", "Montserrat"];

export default function BrandKitPage() {
  const router = useRouter();
  const { isAuthenticated } = useRequireAuth();
  const projectId = useWizardStore((state) => state.projectId);
  const setBrandKit = useWizardStore((state) => state.setBrandKit);

  const [primaryColor, setPrimaryColor] = useState("#0F4C81");
  const [accentColor, setAccentColor] = useState("#F2A007");
  const [fontFamily, setFontFamily] = useState("Inter");

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isAuthenticated) return null;

  if (!projectId) {
    // Wizard state kosong — kemungkinan user langsung buka URL ini tanpa
    // melalui langkah 2. Arahkan balik daripada memanggil API dengan
    // projectId yang tidak ada.
    router.replace("/create/template");
    return null;
  }

  const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setLogoFile(file);
    setLogoUrl(null);
    setUploadError(null);
    if (!file) return;

    setIsUploadingLogo(true);
    try {
      const result = await uploadLogo(file);
      setLogoUrl(result.logoUrl);
    } catch (error) {
      setUploadError(
        error instanceof ApiClientError
          ? error.message
          : "Gagal mengunggah logo. Coba lagi.",
      );
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleContinue = async () => {
    if (!logoUrl) return;
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const brandKit = await upsertBrandKit({
        logoUrl,
        primaryColor,
        accentColor,
        fontFamily,
      });
      setBrandKit({
        logoUrl: brandKit.logoUrl ?? logoUrl,
        primaryColor: brandKit.primaryColor,
        accentColor: brandKit.accentColor,
        fontFamily: brandKit.fontFamily,
      });
      router.push("/create/process");
    } catch (error) {
      setSubmitError(
        error instanceof ApiClientError
          ? error.message
          : "Gagal menyimpan brand kit. Coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7fc] p-8 text-[#17213a]">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#6d4aff]">
            LANGKAH 3 DARI 7
          </p>

          <h1 className="mt-2 text-4xl font-bold">Atur Brand Kit</h1>

          <p className="mt-3 text-lg text-[#7185a4]">
            Sesuaikan tampilan presentasi dengan identitas bisnis Anda.
          </p>
        </div>

        {/* Form */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Colors */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold">Warna Brand</h2>
            <p className="mt-2 text-sm text-[#7185a4]">
              Tentukan warna yang akan digunakan dalam presentasi.
            </p>

            {/* Primary Color */}
            <div className="mt-6">
              <label className="mb-2 block font-semibold">Warna Utama</label>
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
              <label className="mb-2 block font-semibold">Warna Aksen</label>
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
              <label className="mb-2 block font-semibold">Font</label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            {/* Logo */}
            <div className="mt-6">
              <label className="mb-2 block font-semibold">Logo Bisnis</label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.svg"
                onChange={handleLogoChange}
                className="w-full rounded-xl border border-[#dce3ef] p-3 text-sm"
              />

              {logoFile && isUploadingLogo && (
                <p className="mt-2 text-sm text-[#7185a4]">Mengunggah logo...</p>
              )}
              {logoFile && !isUploadingLogo && logoUrl && (
                <p className="mt-2 text-sm text-green-600">
                  Logo berhasil diunggah: {logoFile.name}
                </p>
              )}
              {uploadError && (
                <p className="mt-2 text-sm text-red-600">{uploadError}</p>
              )}
              {!logoUrl && !isUploadingLogo && (
                <p className="mt-2 text-sm text-[#8a9ab5]">
                  Logo wajib diunggah — dipakai AI di setiap slide presentasi.
                </p>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold">Preview</h2>
            <p className="mt-2 text-sm text-[#7185a4]">
              Contoh tampilan warna presentasi Anda.
            </p>

            <div
              className="mt-6 overflow-hidden rounded-2xl border"
              style={{ fontFamily }}
            >
              <div className="p-8 text-white" style={{ backgroundColor: primaryColor }}>
                <p className="text-sm opacity-80">PITCHKU PRESENTATION</p>
                <h3 className="mt-3 text-2xl font-bold">Contoh Judul Presentasi</h3>
                <p className="mt-2 opacity-90">
                  Preview tampilan berdasarkan brand Anda.
                </p>
              </div>

              <div className="p-6">
                <div
                  className="mb-4 h-3 w-24 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <p className="text-sm text-[#7185a4]">
                  Warna utama dan aksen akan digunakan dalam desain slide.
                </p>
              </div>
            </div>
          </div>
        </div>

        {submitError && (
          <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {submitError}
          </p>
        )}

        {/* Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!logoUrl || isSubmitting}
            className="rounded-xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-8 py-4 font-semibold text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Menyimpan..." : "Lanjut ke Proses AI →"}
          </button>
        </div>
      </div>
    </main>
  );
}