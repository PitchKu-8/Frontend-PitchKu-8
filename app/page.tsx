"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = (path: string) => {
    setIsSidebarOpen(false);
    router.push(path);
  };

  return (
    <main className="min-h-screen bg-[#f4f7fc] text-[#17213a]">
      <div className="flex min-h-screen flex-col md:flex-row">

        {/* Mobile Header */}
        <header className="flex items-center justify-between bg-[#f4f7fc] p-4 md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b4dff] to-[#287cff] text-xl font-bold text-white">
              P
            </div>
            <span className="text-xl font-bold">PitchKu</span>
          </div>

          <button
            type="button"
            aria-label="Buka menu navigasi"
            aria-expanded={isSidebarOpen}
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-xl bg-white px-3 py-2 text-2xl leading-none text-[#46617f] shadow-sm"
          >
            ☰
          </button>
        </header>

        {isSidebarOpen && (
          <button
            type="button"
            aria-label="Tutup menu navigasi"
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-[#17213a]/30 md:hidden"
          />
        )}

        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 flex w-[min(86vw,320px)] flex-col bg-[#f4f7fc] p-5 shadow-xl transition-transform duration-200 md:static md:z-auto md:w-[280px] md:translate-x-0 md:shadow-none`}>

          <div className="mb-2 flex justify-end md:hidden">
            <button
              type="button"
              aria-label="Tutup menu navigasi"
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg px-2 text-2xl text-[#647a9e]"
            >
              ×
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b4dff] to-[#287cff] text-2xl font-bold text-white">
              P
            </div>

            <span className="text-2xl font-bold">
              PitchKu
            </span>
          </div>

          {/* Button */}
          <button
            onClick={() => navigate("/create/template")}
            className="mt-8 flex h-16 cursor-pointer items-center gap-4 rounded-2xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-6 text-lg font-semibold text-white shadow-md"
          >
            <span className="text-3xl font-light">+</span>
            Buat Presentasi Baru
          </button>

          {/* Navigation */}
          <nav className="mt-10 space-y-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex w-full items-center gap-4 rounded-2xl bg-[#dce9ff] px-6 py-5 text-lg font-semibold text-[#2164ff]"
            >
              <span className="text-2xl">▱</span>
              Proyek Saya
            </button>

            <button
              type="button"
              onClick={() => navigate("/create/brand-kit")}
              className="flex w-full items-center gap-4 rounded-2xl px-6 py-4 text-lg font-medium text-[#647a9e] hover:bg-white"
            >
              <span className="text-2xl">◉</span>
              Brand Kit Usaha
            </button>

            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="flex w-full items-center gap-4 rounded-2xl px-6 py-4 text-lg font-medium text-[#647a9e] hover:bg-white"
            >
              <span className="text-2xl">⚙</span>
              Pengaturan
            </button>
          </nav>

          {/* User */}
          <div className="mt-auto rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3fa] text-lg font-medium text-[#46617f]">
                BS
              </div>

              <div className="flex-1">
                <p className="font-semibold">
                  Budi Santoso
                </p>

                <p className="text-sm text-[#7185a4]">
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
        <section className="min-w-0 flex-1 p-3 sm:p-4">
          <div className="min-h-[calc(100vh-32px)] rounded-[28px] bg-gradient-to-br from-[#f1f4ff] to-[#fbf9ff] px-4 py-6 sm:px-8 sm:py-8 lg:rounded-[40px] lg:px-12 lg:py-10">

            {/* Back Button */}
            <button
              type="button"
              onClick={() => router.back()}
              className="mb-8 flex items-center gap-2 text-base font-medium text-[#647a9e] transition hover:text-[#246bff]"
            >
              <span className="text-xl">←</span>
              Kembali
            </button>

            {/* Welcome */}
            <div className="text-center">
              <h1 className="text-3xl font-bold sm:text-5xl">
                <span className="bg-gradient-to-r from-[#8951ff] to-[#287cff] bg-clip-text text-transparent">
                  Welcome, Pak Budi
                </span>{" "}
                👋
              </h1>

              <p className="mt-4 text-base text-[#667b9d] sm:text-xl">
                Kelola presentasi bisnis Anda atau mulai kerangka baru dengan bantuan AI.
              </p>
            </div>

            {/* Template Cards */}
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
              <TemplateCard
                templateId="company_profile"
                icon="▣"
                title="Company Profile"
                description="Buat profil perusahaan profesional untuk klien Anda."
              />

              <TemplateCard
                templateId="penawaran_produk"
                icon="▤"
                title="Penawaran Produk"
                description="Presentasi katalog dan detail produk yang memukau."
              />

              <TemplateCard
                templateId="proposal_kerjasama"
                icon="🤝"
                title="Proposal Kerja Sama"
                description="Ajukan kerja sama bisnis dengan struktur meyakinkan."
              />

              <TemplateCard
                templateId="laporan_ringkas"
                icon="▥"
                title="Laporan Ringkas"
                description="Sampaikan metrik dan progres dengan visual yang jelas."
              />
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}

/* Template Card */

function TemplateCard({
  templateId,
  icon,
  title,
  description,
}: {
  templateId: string;
  icon: string;
  title: string;
  description: string;
}) {
  const router = useRouter();

  return (
    <div className="min-h-[400px] rounded-[28px] bg-white p-10 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#dce9ff] text-3xl text-[#246bff]">
        {icon}
      </div>

      <h2 className="mt-8 text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-4 text-lg leading-9 text-[#687d9f]">
        {description}
      </p>

      <button
        type="button"
        onClick={() => router.push(`/create?template=${templateId}`)}
        className="mt-10 text-lg font-semibold text-[#246bff]"
      >
        Gunakan Template →
      </button>
    </div>
  );
}