"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const templates = [
  {
    id: "company_profile",
    title: "Company Profile",
    description: "Buat profil perusahaan profesional untuk klien Anda.",
    icon: "▣",
  },
  {
    id: "penawaran_produk",
    title: "Penawaran Produk",
    description: "Presentasi katalog dan detail produk yang memukau.",
    icon: "▤",
  },
  {
    id: "proposal_kerjasama",
    title: "Proposal Kerja Sama",
    description: "Ajukan kerja sama bisnis dengan struktur meyakinkan.",
    icon: "🤝",
  },
  {
    id: "laporan_ringkas",
    title: "Laporan Ringkas",
    description: "Sampaikan metrik dan progres dengan visual yang jelas.",
    icon: "▥",
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
    <main className="min-h-screen bg-[#f4f7fc] px-8 py-12 text-[#17213a]">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold text-[#6d4aff]">
            LANGKAH 1 DARI 7
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Pilih Template Presentasi
          </h1>

          <p className="mt-3 text-lg text-[#7185a4]">
            Pilih template yang paling sesuai dengan kebutuhan bisnis Anda.
          </p>
        </div>

        {/* Template Cards */}
        <div className="mt-12 grid grid-cols-2 gap-6">

          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id;

            return (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`rounded-3xl border-2 bg-white p-8 text-left transition ${
                  isSelected
                    ? "border-[#6d4aff] shadow-lg"
                    : "border-transparent shadow-sm hover:border-[#d8ccff]"
                }`}
              >
                <div className="flex items-start gap-5">

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e6ddff] text-2xl text-[#6d4aff]">
                    {template.icon}
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      {template.title}
                    </h2>

                    <p className="mt-2 leading-7 text-[#7185a4]">
                      {template.description}
                    </p>
                  </div>

                </div>
              </button>
            );
          })}

        </div>

        {/* Continue Button */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className={`rounded-xl px-8 py-4 font-semibold text-white transition ${
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