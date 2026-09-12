"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CreatePresentation() {
const router = useRouter();
    const searchParams = useSearchParams();
  const template = searchParams.get("template") || "company_profile";
 
  const [businessName, setBusinessName] = useState("");
const [description, setDescription] = useState("");
const [targetAudience, setTargetAudience] = useState("");
const [rawMaterial, setRawMaterial] = useState("");

const [price, setPrice] = useState("");
const [moq, setMoq] = useState("");
const [resellerMargin, setResellerMargin] = useState("");
const [partnershipGoal, setPartnershipGoal] = useState("");
const [period, setPeriod] = useState("");
const [keyPoints, setKeyPoints] = useState("");

const templateNames: Record<string, string> = {
  company_profile: "Company Profile",
  penawaran_produk: "Penawaran Produk",
  proposal_kerjasama: "Proposal Kerja Sama",
  laporan_ringkas: "Laporan Ringkas",
};

const templateName = templateNames[template] || "Company Profile";

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
        <div className="rounded-3xl bg-white p-8 shadow-sm">

          {/* Template */}
          <div className="mb-8 rounded-2xl bg-[#f5f7ff] p-5">
            <p className="text-sm text-[#7185a4]">
              Jenis Template
            </p>

            <p className="mt-1 text-lg font-semibold">
              {templateName}
            </p>
          </div>

          {/* Business Name */}
          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              Nama Bisnis
            </label>

            <input
              type="text"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan secara singkat tentang bisnis Anda..."
              rows={4}
              className="w-full resize-none rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
            />
          </div>

          {/* Audience */}
          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              Target Audiens
            </label>

            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Contoh: Calon investor dan mitra bisnis"
              className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
            />
          </div>

          {/* Raw Material */}
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

          <div>
            <label className="mb-2 block font-semibold">
              Tempel Catatan/Brosur Bebas
            </label>

            <textarea
              value={rawMaterial}
              onChange={(e) => setRawMaterial(e.target.value)}
              placeholder="Tempel informasi tambahan tentang bisnis Anda di sini..."
              rows={6}
              maxLength={2000}
              className="w-full resize-none rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
            />

            <p className="mt-2 text-right text-sm text-[#8a9ab5]">
              {rawMaterial.length}/2000
            </p>
          </div>

          {/* Additional fields for Product Offer */}
{template === "penawaran_produk" && (
  <div className="mb-6 space-y-6">

    {/* Price */}
    <div>
      <label className="mb-2 block font-semibold">
        Harga Produk
      </label>

      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Contoh: Rp50.000"
        className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
      />
    </div>

    {/* MOQ */}
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

    {/* Reseller Margin */}
    <div>
      <label className="mb-2 block font-semibold">
        Margin Reseller
      </label>

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
{template === "proposal_kerjasama" && (
  <div className="mb-6">
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
{template === "laporan_ringkas" && (
  <div className="mb-6">
    <label className="mb-2 block font-semibold">
      Periode Laporan
    </label>

    <input
      type="text"
      value={period}
      onChange={(e) => setPeriod(e.target.value)}
      placeholder="Contoh: Januari - Juni 2026"
      className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
    />
  </div>
)}

          {/* Button */}
          <div className="mt-8 flex justify-end">
            <button
  onClick={() => router.push("/create/brand-kit")}
  className="rounded-xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-8 py-4 font-semibold text-white shadow-md transition hover:opacity-90"
>
  Lanjut ke Brand Kit →
</button>
          </div>

        </div>
      </div>
    </main>
  );
}