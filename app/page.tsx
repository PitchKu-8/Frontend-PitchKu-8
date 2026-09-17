// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/lib/useRequireAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { useWizardStore } from "@/store/useWizardStore";
import { Sidebar } from "@/components/Sidebar";
import type { TemplateType } from "@/lib/types";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useRequireAuth();
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const resetWizard = useWizardStore((state) => state.reset);

  if (!isAuthenticated) return null;

  const displayName = profile?.fullName || user?.email || "Pengguna";

  const handleUseTemplate = (templateId: TemplateType) => {
    resetWizard();
    useWizardStore.getState().setTemplateType(templateId);
    router.push(`/create?template=${templateId}`);
  };

  return (
    <main className="min-h-screen bg-[#f4f7fc] text-[#17213a]">
      <div className="flex min-h-screen">
        <Sidebar activeNav="projects" />

        {/* Main Content */}
        <section className="flex-1 p-4">
          <div className="min-h-[calc(100vh-32px)] rounded-[40px] bg-gradient-to-br from-[#f1f4ff] to-[#fbf9ff] px-12 py-16">
            {/* Welcome */}
            <div className="text-center">
              <h1 className="text-5xl font-bold">
                <span className="bg-gradient-to-r from-[#8951ff] to-[#287cff] bg-clip-text text-transparent">
                  Welcome, {displayName}
                </span>{" "}
                👋
              </h1>

              <p className="mt-4 text-xl text-[#667b9d]">
                Kelola presentasi bisnis Anda atau mulai kerangka baru dengan
                bantuan AI.
              </p>
            </div>

            {/* Template Cards */}
            <div className="mt-20 grid grid-cols-4 gap-8">
              <TemplateCard
                templateId="company_profile"
                icon="▣"
                title="Company Profile"
                description="Buat profil perusahaan profesional untuk klien Anda."
                onUse={handleUseTemplate}
              />
              <TemplateCard
                templateId="penawaran_produk"
                icon="▤"
                title="Penawaran Produk"
                description="Presentasi katalog dan detail produk yang memukau."
                onUse={handleUseTemplate}
              />
              <TemplateCard
                templateId="proposal_kerjasama"
                icon="🤝"
                title="Proposal Kerja Sama"
                description="Ajukan kerja sama bisnis dengan struktur meyakinkan."
                onUse={handleUseTemplate}
              />
              <TemplateCard
                templateId="laporan_ringkas"
                icon="▥"
                title="Laporan Ringkas"
                description="Sampaikan metrik dan progres dengan visual yang jelas."
                onUse={handleUseTemplate}
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
  onUse,
}: {
  templateId: TemplateType;
  icon: string;
  title: string;
  description: string;
  onUse: (templateId: TemplateType) => void;
}) {
  return (
    <div className="min-h-[400px] rounded-[28px] bg-white p-10 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#dce9ff] text-3xl text-[#246bff]">
        {icon}
      </div>

      <h2 className="mt-8 text-2xl font-bold">{title}</h2>

      <p className="mt-4 text-lg leading-9 text-[#687d9f]">{description}</p>

      <button
        type="button"
        onClick={() => onUse(templateId)}
        className="mt-10 text-lg font-semibold text-[#246bff]"
      >
        Gunakan Template →
      </button>
    </div>
  );
}