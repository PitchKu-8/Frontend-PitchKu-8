"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const templates = [
  {
    id: "company_profile",
    title: "Company Profile",
    description:
      "Perkenalkan profil usaha, visi misi, dan keunggulan kepada calon mitra atau investor.",
    icon: "▣",
    popular: true,
  },
  {
    id: "penawaran_produk",
    title: "Penawaran Produk & Jasa",
    description:
      "Tampilkan katalog produk, rincian harga grosir, MOQ, dan skema margin keuntungan reseller.",
    icon: "◇",
    popular: false,
  },
  {
    id: "proposal_kerjasama",
    title: "Proposal Kerja Sama",
    description:
      "Ajukan kolaborasi bisnis, pembagian bagi hasil, atau sewa tempat secara terstruktur.",
    icon: "🤝",
    popular: false,
  },
  {
    id: "laporan_ringkas",
    title: "Laporan Ringkas Usaha",
    description:
      "Sajikan evaluasi penjualan bulanan, performa operasional, dan rencana tindak lanjut.",
    icon: "▥",
    popular: false,
  },
  {
    id: "presentasi_kosong",
    title: "Presentasi Kosong",
    description:
      "Mulai presentasi Anda dari kanvas putih kosong tanpa kerangka struktur bawaan.",
    icon: "▤",
    popular: false,
  },
];

export default function TemplatePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleContinue = () => {
    if (!selectedTemplate) return;

    router.push(`/create?template=${selectedTemplate}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#eef1ff] via-[#f8f9ff] to-[#f8f1ff] px-5 py-10 text-[#17213a] sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#6d4aff]">
            Langkah 1 dari 7
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Pilih Template Presentasi
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#7185a4] sm:text-lg">
            Mulai dengan format yang sesuai dengan tujuan bisnis Anda hari ini.
          </p>
        </div>

        {/* Template Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id;

            return (
              <div
                key={template.id}
                className={`relative flex min-h-[330px] flex-col rounded-3xl border bg-white p-7 shadow-sm transition duration-200 sm:p-8 ${
                  isSelected
                    ? "border-[#6d4aff] shadow-lg ring-2 ring-[#e6ddff]"
                    : "border-[#e1e6f0] hover:-translate-y-1 hover:border-[#cfc2ff] hover:shadow-md"
                }`}
              >
                {/* Popular Badge */}
                {template.popular && (
                  <span className="absolute right-7 top-7 rounded-full bg-[#e8f0f8] px-4 py-2 text-sm font-semibold text-[#15558c]">
                    Paling Populer
                  </span>
                )}

                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#edf0f6] bg-[#f7f9fd] text-3xl text-[#07518e]">
                  {template.icon}
                </div>

                {/* Content */}
                <div className="mt-7">
                  <h2 className="text-xl font-bold text-[#17213a] sm:text-2xl">
                    {template.title}
                  </h2>

                  <p className="mt-3 max-w-xl text-base leading-7 text-[#7185a4]">
                    {template.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-auto pt-7">
                  <div className="mb-6 h-px bg-[#edf0f6]" />

                  <button
                    type="button"
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full rounded-xl px-6 py-3.5 text-base font-semibold text-white shadow-md transition ${
                      isSelected
                        ? "bg-gradient-to-r from-[#7d45ff] to-[#287cff]"
                        : "bg-gradient-to-r from-[#914cff] to-[#287cff] hover:opacity-90"
                    }`}
                  >
                    {isSelected ? "Template Dipilih ✓" : "Pilih"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="mt-10 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-[#dce3ef] bg-white px-6 py-3.5 font-semibold text-[#40516d] shadow-sm transition hover:bg-[#f8f9fc]"
          >
            ← Kembali
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className={`rounded-xl px-8 py-3.5 font-semibold text-white shadow-md transition ${
              selectedTemplate
                ? "bg-gradient-to-r from-[#8b4dff] to-[#287cff] hover:opacity-90"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            Lanjut ke Konteks Bisnis →
          </button>
        </div>
      </div>
    </main>
  );
}