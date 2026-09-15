"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Metadata UI-only yang tidak dikirim backend (icon, badge populer)
type Template = {
  id: string;
  label: string;
  description: string;
  icon?: string;
  popular?: boolean;
};

type TemplatesResponse = {
  success: boolean;
  data?: Template[];
  error?: { message?: string };
};

const templateMeta: Record<string, { icon: string; popular: boolean }> = {
  company_profile: { icon: "▣", popular: true },
  penawaran_produk: { icon: "◇", popular: false },
  proposal_kerjasama: { icon: "🤝", popular: false },
  laporan_ringkas: { icon: "▥", popular: false },
};

export default function TemplatePage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/templates`
        );
        const json: TemplatesResponse = await res.json();

        if (!json.success || !json.data) {
          throw new Error(json.error?.message || "Gagal memuat template");
        }

        const merged = json.data.map((tpl) => ({
          ...tpl,
          icon: templateMeta[tpl.id]?.icon ?? "▤",
          popular: templateMeta[tpl.id]?.popular ?? false,
        }));

        setTemplates(merged);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat memuat template"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleContinue = () => {
    if (!selectedTemplate) return;

    const selected = templates.find((t) => t.id === selectedTemplate);

    if (!selected) return;

    // Simpan requiredFields untuk dipakai render form dinamis di halaman /create
    sessionStorage.setItem(
      "pitchku_selected_template",
      JSON.stringify(selected)
    );

    router.push(`/create?template=${selectedTemplate}`);
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#eef1ff] via-[#f8f9ff] to-[#f8f1ff]">
        <p className="text-base font-medium text-[#7185a4]">
          Memuat template...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#eef1ff] via-[#f8f9ff] to-[#f8f1ff]">
        <div className="text-center">
          <p className="text-base font-medium text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-xl border border-[#dce3ef] bg-white px-6 py-3 font-semibold text-[#40516d] shadow-sm hover:bg-[#f8f9fc]"
          >
            Coba Lagi
          </button>
        </div>
      </main>
    );
  }

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
                    {template.label}
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