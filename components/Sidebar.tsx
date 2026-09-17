// components/Sidebar.tsx
//
// Diekstrak dari app/page.tsx supaya tidak duplikat markup sidebar di setiap
// halaman baru (mis. /projects). Desain visual sama persis dengan sebelumnya.
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useWizardStore } from "@/store/useWizardStore";
import { logout as logoutRequest } from "@/lib/pitchku-api";

type SidebarProps = {
  activeNav: "projects" | "brand-kit" | "settings";
};

export function Sidebar({ activeNav }: SidebarProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const clearSession = useAuthStore((state) => state.clearSession);
  const resetWizard = useWizardStore((state) => state.reset);

  const displayName = profile?.fullName || user?.email || "Pengguna";
  const displayCompany = profile?.companyName || "";

  const handleStartNewPresentation = () => {
    resetWizard();
    router.push("/create/template");
  };

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch {
      // Tetap bersihkan session lokal walau request logout ke server gagal
      // (mis. token sudah kedaluwarsa).
    } finally {
      clearSession();
      router.push("/login");
    }
  };

  const navItemClass = (isActive: boolean) =>
    `flex w-full items-center gap-4 rounded-2xl px-6 py-5 text-lg font-semibold transition ${
      isActive
        ? "bg-[#dce9ff] text-[#2164ff]"
        : "font-medium text-[#647a9e] hover:bg-white"
    }`;

  return (
    <aside className="w-[280px] bg-[#f4f7fc] p-5 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b4dff] to-[#287cff] text-2xl font-bold text-white">
          P
        </div>
        <span className="text-2xl font-bold">PitchKu</span>
      </div>

      {/* Button */}
      <button
        onClick={handleStartNewPresentation}
        className="mt-8 flex h-16 cursor-pointer items-center gap-4 rounded-2xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-6 text-lg font-semibold text-white shadow-md"
      >
        <span className="text-3xl font-light">+</span>
        Buat Presentasi Baru
      </button>

      {/* Navigation */}
      <nav className="mt-10 space-y-3">
        <Link href="/projects" className={navItemClass(activeNav === "projects")}>
          <span className="text-2xl">▱</span>
          Proyek Saya
        </Link>

        {/* NOTE: "Brand Kit Usaha" dan "Pengaturan" belum diarahkan ke halaman
            manapun — backend sudah punya endpoint brand-kit (GET/POST
            /v1/brand-kits), tapi belum ada halaman untuk mengelolanya di luar
            wizard. Beri tahu saya kalau ini perlu dibuat. */}
        <button className={navItemClass(activeNav === "brand-kit")} disabled>
          <span className="text-2xl">◉</span>
          Brand Kit Usaha
        </button>

        <button className={navItemClass(activeNav === "settings")} disabled>
          <span className="text-2xl">⚙</span>
          Pengaturan
        </button>
      </nav>

      {/* User */}
      <div className="mt-auto rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3fa] text-lg font-medium text-[#46617f]">
            {displayName.slice(0, 2).toUpperCase()}
          </div>

          <div className="flex-1">
            <p className="font-semibold">{displayName}</p>
            <p className="text-sm text-[#7185a4]">
              {displayCompany || "Lengkapi profil usaha Anda"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            aria-label="Keluar"
            className="text-2xl text-red-400 transition hover:text-red-500"
          >
            ↪
          </button>
        </div>
      </div>
    </aside>
  );
}