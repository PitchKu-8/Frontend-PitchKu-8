// app/create/page.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRequireAuth } from "@/lib/useRequireAuth";
import { useWizardStore } from "@/store/useWizardStore";
import { createProject } from "@/lib/pitchku-api";
import { ApiClientError } from "@/lib/api-client";
import type { BusinessContext, TemplateType } from "@/lib/types";

const TEMPLATE_NAMES: Record<TemplateType, string> = {
  company_profile: "Company Profile",
  penawaran_produk: "Penawaran Produk",
  proposal_kerjasama: "Proposal Kerja Sama",
  laporan_ringkas: "Laporan Ringkas",
};

// Backend mewajibkan rawMaterialText minimal 50 karakter (BusinessContextSchema).
const RAW_MATERIAL_MIN_LENGTH = 50;
const RAW_MATERIAL_MAX_LENGTH = 2000;

export default function CreatePresentation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useRequireAuth();

  const storeTemplateType = useWizardStore((state) => state.templateType);
  const setTemplateType = useWizardStore((state) => state.setTemplateType);
  const setProjectId = useWizardStore((state) => state.setProjectId);
  const setBusinessContext = useWizardStore((state) => state.setBusinessContext);

  // Fallback ke query string kalau store kosong (mis. user buka link langsung
  // dari dashboard atau me-refresh halaman ini).
  const templateType: TemplateType =
    storeTemplateType ??
    (searchParams.get("template") as TemplateType | null) ??
    "company_profile";

  const [businessName, setBusinessName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [rawMaterialText, setRawMaterialText] = useState("");

  const [price, setPrice] = useState("");
  const [moq, setMoq] = useState("");
  const [resellerMargin, setResellerMargin] = useState("");
  const [partnershipGoal, setPartnershipGoal] = useState("");
  const [period, setPeriod] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthenticated) return null;

  const templateName = TEMPLATE_NAMES[templateType];
  const isRawMaterialTooShort =
    rawMaterialText.length > 0 && rawMaterialText.length < RAW_MATERIAL_MIN_LENGTH;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (rawMaterialText.trim().length < RAW_MATERIAL_MIN_LENGTH) {
      setErrorMessage(
        `Catatan/brosur bebas minimal ${RAW_MATERIAL_MIN_LENGTH} karakter, supaya AI punya cukup konteks untuk membuat presentasi yang relevan.`,
      );
      return;
    }

    const businessContext: BusinessContext = {
      businessName,
      shortDescription,
      rawMaterialText,
      ...(targetAudience ? { targetAudience } : {}),
      ...(keyPoints ? { keyPoints } : {}),
      ...(templateType === "penawaran_produk"
        ? { price, moq, resellerMargin }
        : {}),
      ...(templateType === "proposal_kerjasama" ? { partnershipGoal } : {}),
      ...(templateType === "laporan_ringkas" ? { period } : {}),
    };

    // NOTE PRODUK: form ini tidak punya field "judul presentasi" terpisah,
    // jadi title project dibuat otomatis dari nama bisnis + template. Kalau
    // Anda ingin user bisa mengisi judul sendiri, tinggal tambah satu field
    // dan pakai nilainya di sini.
    const title = `${businessName} - ${templateName}`;

    setIsSubmitting(true);
    try {
      setTemplateType(templateType);
      const project = await createProject({ title, templateType, businessContext });
      setProjectId(project.id);
      setBusinessContext(businessContext);
      router.push("/create/brand-kit");
    } catch (error) {
      setErrorMessage(
        error instanceof ApiClientError
          ? error.message
          : "Gagal menyimpan konteks bisnis. Coba lagi.",
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
            LANGKAH 2 DARI 7
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Ceritakan tentang bisnis Anda
          </h1>

          <p className="mt-3 text-lg text-[#7185a4]">
            Informasi ini akan membantu AI membuat presentasi yang sesuai
            dengan bisnis dan audiens Anda.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-sm">
          {/* Template */}
          <div className="mb-8 rounded-2xl bg-[#f5f7ff] p-5">
            <p className="text-sm text-[#7185a4]">Jenis Template</p>
            <p className="mt-1 text-lg font-semibold">{templateName}</p>
          </div>

          {/* Business Name */}
          <div className="mb-6">
            <label className="mb-2 block font-semibold">Nama Bisnis</label>
            <input
              type="text"
              required
              maxLength={150}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Contoh: Kopi Nusantara"
              className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              Deskripsi Singkat Usaha
            </label>
            <textarea
              required
              maxLength={500}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Ceritakan secara singkat tentang bisnis Anda..."
              rows={4}
              className="w-full resize-none rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
            />
          </div>

          {/* Audience */}
          <div className="mb-6">
            <label className="mb-2 block font-semibold">Target Audiens</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Contoh: Calon investor dan mitra bisnis"
              className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
            />
          </div>

          {/* Key Points */}
          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              Poin Penting Presentasi
            </label>
            <textarea
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              placeholder="Contoh: Keunggulan produk, harga kompetitif, pengalaman bisnis, dan target pengembangan..."
              rows={4}
              className="w-full resize-none rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
            />
          </div>

          {/* Raw Material */}
          <div>
            <label className="mb-2 block font-semibold">
              Tempel Catatan/Brosur Bebas
            </label>
            <textarea
              required
              value={rawMaterialText}
              onChange={(e) => setRawMaterialText(e.target.value)}
              placeholder="Tempel informasi tambahan tentang bisnis Anda di sini (minimal 50 karakter)..."
              rows={6}
              maxLength={RAW_MATERIAL_MAX_LENGTH}
              className={`w-full resize-none rounded-xl border px-4 py-3 outline-none focus:border-[#6d4aff] ${
                isRawMaterialTooShort ? "border-red-300" : "border-[#dce3ef]"
              }`}
            />
            <p
              className={`mt-2 text-right text-sm ${
                isRawMaterialTooShort ? "text-red-500" : "text-[#8a9ab5]"
              }`}
            >
              {rawMaterialText.length}/{RAW_MATERIAL_MAX_LENGTH}
              {isRawMaterialTooShort
                ? ` — minimal ${RAW_MATERIAL_MIN_LENGTH} karakter`
                : ""}
            </p>
          </div>

          {/* Additional fields for Product Offer */}
          {templateType === "penawaran_produk" && (
            <div className="mb-6 mt-6 space-y-6">
              <div>
                <label className="mb-2 block font-semibold">Harga Produk</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Contoh: Rp50.000"
                  className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Minimum Order (MOQ)
                </label>
                <input
                  type="text"
                  value={moq}
                  onChange={(e) => setMoq(e.target.value)}
                  placeholder="Contoh: Minimal 10 pcs"
                  className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">Margin Reseller</label>
                <input
                  type="text"
                  value={resellerMargin}
                  onChange={(e) => setResellerMargin(e.target.value)}
                  placeholder="Contoh: 20%"
                  className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
                />
              </div>
            </div>
          )}

          {/* Additional fields for Partnership Proposal */}
          {templateType === "proposal_kerjasama" && (
            <div className="mb-6 mt-6">
              <label className="mb-2 block font-semibold">
                Tujuan Kerja Sama
              </label>
              <textarea
                value={partnershipGoal}
                onChange={(e) => setPartnershipGoal(e.target.value)}
                placeholder="Contoh: Mencari mitra distribusi untuk memperluas pasar..."
                rows={4}
                className="w-full resize-none rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
              />
            </div>
          )}

          {/* Additional fields for Summary Report */}
          {templateType === "laporan_ringkas" && (
            <div className="mb-6 mt-6">
              <label className="mb-2 block font-semibold">Periode Laporan</label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="Contoh: Januari - Juni 2026"
                className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
              />
            </div>
          )}

          {errorMessage && (
            <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          {/* Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-8 py-4 font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
            >
              {isSubmitting ? "Menyimpan..." : "Lanjut ke Brand Kit →"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}