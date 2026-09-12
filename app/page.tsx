"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f4f7fc] text-[#17213a]">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="w-[280px] bg-[#f4f7fc] p-5 flex flex-col">

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
  onClick={() => router.push("/create/template")}
  className="mt-8 flex h-16 cursor-pointer items-center gap-4 rounded-2xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-6 text-lg font-semibold text-white shadow-md"
>
  <span className="text-3xl font-light">+</span>
  Buat Presentasi Baru
</button>

          {/* Navigation */}
          <nav className="mt-10 space-y-3">

            <button className="flex w-full items-center gap-4 rounded-2xl bg-[#dce9ff] px-6 py-5 text-lg font-semibold text-[#2164ff]">
              <span className="text-2xl">▱</span>
              Proyek Saya
            </button>

            <button className="flex w-full items-center gap-4 rounded-2xl px-6 py-4 text-lg font-medium text-[#647a9e] hover:bg-white">
              <span className="text-2xl">◉</span>
              Brand Kit Usaha
            </button>

            <button className="flex w-full items-center gap-4 rounded-2xl px-6 py-4 text-lg font-medium text-[#647a9e] hover:bg-white">
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
        <section className="flex-1 p-4">

          <div className="min-h-[calc(100vh-32px)] rounded-[40px] bg-gradient-to-br from-[#f1f4ff] to-[#fbf9ff] px-12 py-16">

            {/* Welcome */}
            <div className="text-center">

              <h1 className="text-5xl font-bold">
                <span className="bg-gradient-to-r from-[#8951ff] to-[#287cff] bg-clip-text text-transparent">
                  Welcome, Pak Budi
                </span>{" "}
                👋
              </h1>

              <p className="mt-4 text-xl text-[#667b9d]">
                Kelola presentasi bisnis Anda atau mulai kerangka baru dengan bantuan AI.
              </p>

            </div>

            {/* Template Cards */}
            <div className="mt-20 grid grid-cols-4 gap-8">

              <TemplateCard
                icon="▣"
                title="Company Profile"
                description="Buat profil perusahaan profesional untuk klien Anda."
              />

              <TemplateCard
                icon="▤"
                title="Penawaran Produk"
                description="Presentasi katalog dan detail produk yang memukau."
              />

              <TemplateCard
                icon="🤝"
                title="Proposal Kerjasama"
                description="Ajukan kerjasama bisnis dengan struktur meyakinkan."
              />

              <TemplateCard
                icon="▥"
                title="Laporan Ringkas"
                description="Sampaikan metrik dan progres dengan visual jelas."
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
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
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

      <button className="mt-10 text-lg font-semibold text-[#246bff]">
        Mulai →
      </button>

    </div>
  );
}