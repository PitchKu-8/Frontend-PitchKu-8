"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Folder,
  Palette,
  Settings,
  Building2,
  UserRound,
  Mail,
  LockKeyhole,
  Save,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [businessName, setBusinessName] = useState("Kopi Nusantara");
  const [businessBio, setBusinessBio] = useState(
    "Kopi Nusantara adalah UMKM yang berfokus pada penyajian kopi dari biji kopi lokal pilihan yang bersumber langsung dari petani di seluruh pelosok Indonesia. Kami menghadirkan cita rasa otentik kopi nusantara ke setiap cangkir."
  );

  const [username, setUsername] = useState("Budi Santoso");
  const [email, setEmail] = useState("budi@kopinusantara.com");

  const handleSave = () => {
    console.log({
      businessName,
      businessBio,
      username,
      email,
    });

    alert("Perubahan berhasil disimpan!");
  };

  return (
    <main className="min-h-screen bg-[#eef3f9] text-[#17213b]">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden w-[370px] shrink-0 flex-col bg-[#f1f6fc] lg:flex">
          {/* Logo */}
          <div className="flex items-center gap-4 px-10 py-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8950ff] to-[#267dff] text-3xl font-bold text-white shadow-md">
              P
            </div>

            <span className="text-[30px] font-bold tracking-tight text-[#101a34]">
              PitchKu
            </span>
          </div>

          {/* Buat Presentasi */}
          <div className="px-5 pt-10">
            <button
              type="button"
              onClick={() => router.push("/create")}
              className="flex w-full items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-[#934bff] to-[#267dff] px-5 py-5 text-[21px] font-semibold text-white shadow-md transition hover:opacity-90"
            >
              <Plus size={29} strokeWidth={2.5} />
              Buat Presentasi Baru
            </button>
          </div>

          {/* Menu */}
          <nav className="mt-12 space-y-3 px-5">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex w-full items-center gap-5 rounded-2xl px-7 py-5 text-left text-[21px] font-medium text-[#5c789e] transition hover:bg-[#e3ecf8]"
            >
              <Folder size={29} />
              Proyek Saya
            </button>

            <button
              type="button"
              onClick={() => router.push("/create/brand-kit")}
              className="flex w-full items-center gap-5 rounded-2xl px-7 py-5 text-left text-[21px] font-medium text-[#5c789e] transition hover:bg-[#e3ecf8]"
            >
              <Palette size={29} />
              Brand Kit Usaha
            </button>

            {/* Menu aktif */}
            <button
              type="button"
              onClick={() => router.push("/settings")}
              className="relative flex w-full items-center gap-5 overflow-hidden rounded-2xl bg-[#dceaff] px-7 py-5 text-left text-[21px] font-semibold text-[#155bea] shadow-sm"
            >
              <span className="absolute left-0 top-0 h-full w-1.5 bg-[#1765ff]" />

              <Settings size={29} />
              Pengaturan
            </button>
          </nav>

          {/* User Card */}
          <div className="mt-auto p-4">
            <div className="flex items-center gap-4 rounded-2xl border border-[#e0e6ef] bg-white px-5 py-5 shadow-sm">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0f5fb] text-xl font-medium text-[#496785]">
                BS
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[21px] font-semibold text-[#101a34]">
                  Budi Santoso
                </p>
                <p className="truncate text-[18px] text-[#6883a7]">
                  Kopi Nusantara
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-[#ff5365] transition hover:scale-110"
                aria-label="Keluar"
              >
                <LogOut size={29} />
              </button>
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <section className="min-w-0 flex-1 overflow-y-auto bg-gradient-to-br from-[#f0f3ff] via-[#f8f8ff] to-[#f4f1ff]">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-5 py-5 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#8950ff] to-[#267dff] text-2xl font-bold text-white">
                P
              </div>

              <span className="text-2xl font-bold">PitchKu</span>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="rounded-lg bg-white p-3 shadow-sm"
              aria-label="Buka menu navigasi"
            >
              <Menu size={22} />
            </button>
          </div>

          {isMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="absolute inset-0 bg-[#17213b]/30"
                aria-label="Tutup menu navigasi"
              />

              <aside className="relative flex h-full w-[min(86vw,370px)] flex-col bg-[#f1f6fc] p-5 shadow-xl">
                <div className="flex items-center justify-between px-2 py-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#8950ff] to-[#267dff] text-2xl font-bold text-white">
                      P
                    </div>

                    <span className="text-2xl font-bold text-[#101a34]">
                      PitchKu
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg p-2 text-[#5c789e] hover:bg-white"
                    aria-label="Tutup menu navigasi"
                  >
                    <X size={24} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/create/template")}
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#934bff] to-[#267dff] px-4 py-4 text-base font-semibold text-white shadow-md"
                >
                  <Plus size={23} />
                  Buat Presentasi Baru
                </button>

                <nav className="mt-8 space-y-2">
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left font-medium text-[#5c789e] hover:bg-white"
                  >
                    <Folder size={23} />
                    Proyek Saya
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/create/brand-kit")}
                    className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left font-medium text-[#5c789e] hover:bg-white"
                  >
                    <Palette size={23} />
                    Brand Kit Usaha
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex w-full items-center gap-4 rounded-2xl bg-[#dceaff] px-5 py-4 text-left font-semibold text-[#155bea]"
                  >
                    <Settings size={23} />
                    Pengaturan
                  </button>
                </nav>

                <div className="mt-auto flex items-center gap-3 rounded-2xl border border-[#e0e6ef] bg-white px-4 py-4 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0f5fb] font-medium text-[#496785]">
                    BS
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-[#101a34]">
                      Budi Santoso
                    </p>
                    <p className="truncate text-sm text-[#6883a7]">
                      Kopi Nusantara
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="text-[#ff5365]"
                    aria-label="Keluar"
                  >
                    <LogOut size={23} />
                  </button>
                </div>
              </aside>
            </div>
          )}

          <div className="mx-auto max-w-[1400px] px-5 py-5 sm:px-8 lg:px-16 lg:py-10">
            {/* Page Header */}
            <header className="mb-10">
              <h1 className="text-4xl font-bold tracking-tight text-[#111a34] sm:text-5xl">
                Pengaturan Akun & Usaha
              </h1>

              <p className="mt-4 text-lg text-[#6b7f9f] sm:text-2xl">
                Kelola informasi profil usaha dan pengaturan keamanan akun Anda.
              </p>
            </header>

            {/* Profil Usaha */}
            <section className="mb-8 rounded-2xl border border-[#dce3ef] bg-white p-7 shadow-sm sm:p-9">
              <div className="mb-7 flex items-center gap-4">
                <Building2
                  size={32}
                  strokeWidth={2}
                  className="text-[#8a4cff]"
                />

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Profil Usaha
                </h2>
              </div>

              <div className="space-y-7">
                <div>
                  <label
                    htmlFor="businessName"
                    className="mb-3 block text-lg font-semibold text-[#3b4b67]"
                  >
                    Nama Usaha
                  </label>

                  <input
                    id="businessName"
                    type="text"
                    value={businessName}
                    onChange={(event) => setBusinessName(event.target.value)}
                    className="w-full rounded-xl border border-[#d9e2ef] bg-[#f8fafc] px-6 py-4 text-lg outline-none transition focus:border-[#6b5cff] focus:ring-2 focus:ring-[#6b5cff]/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="businessBio"
                    className="mb-3 block text-lg font-semibold text-[#3b4b67]"
                  >
                    Bio Singkat Usaha
                  </label>

                  <textarea
                    id="businessBio"
                    value={businessBio}
                    onChange={(event) => setBusinessBio(event.target.value)}
                    rows={4}
                    className="w-full resize-none rounded-xl border border-[#d9e2ef] bg-[#f8fafc] px-6 py-4 text-lg leading-relaxed outline-none transition focus:border-[#6b5cff] focus:ring-2 focus:ring-[#6b5cff]/20"
                  />

                  <p className="mt-4 text-base text-[#6b7f9f] sm:text-lg">
                    Bio ini dapat digunakan AI sebagai konteks tambahan saat
                    membuat draf presentasi yang lebih relevan.
                  </p>
                </div>
              </div>
            </section>

            {/* Informasi Pengguna */}
            <section className="mb-8 rounded-2xl border border-[#dce3ef] bg-white p-7 shadow-sm sm:p-9">
              <div className="mb-7 flex items-center gap-4">
                <UserRound
                  size={32}
                  strokeWidth={2}
                  className="text-[#8a4cff]"
                />

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Informasi Pengguna
                </h2>
              </div>

              <div className="grid gap-7 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="username"
                    className="mb-3 block text-lg font-semibold text-[#3b4b67]"
                  >
                    Username Lengkap
                  </label>

                  <div className="relative">
                    <UserRound
                      size={24}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8ca2c0]"
                    />

                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      className="w-full rounded-xl border border-[#d9e2ef] bg-[#f8fafc] py-4 pl-14 pr-5 text-lg outline-none transition focus:border-[#6b5cff] focus:ring-2 focus:ring-[#6b5cff]/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-3 block text-lg font-semibold text-[#3b4b67]"
                  >
                    Alamat Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={24}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8ca2c0]"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full rounded-xl border border-[#d9e2ef] bg-[#f8fafc] py-4 pl-14 pr-5 text-lg outline-none transition focus:border-[#6b5cff] focus:ring-2 focus:ring-[#6b5cff]/20"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Keamanan Akun */}
            <section className="mb-8 rounded-2xl border border-[#dce3ef] bg-white p-7 shadow-sm sm:p-9">
              <div className="mb-7 flex items-center gap-4">
                <LockKeyhole
                  size={32}
                  strokeWidth={2}
                  className="text-[#8a4cff]"
                />

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Keamanan Akun
                </h2>
              </div>

              <div className="flex flex-col gap-5 rounded-xl bg-[#f7f9fc] p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xl font-semibold">Kata Sandi (Password)</p>

                  <p className="mt-2 tracking-[4px] text-[#7186a5]">
                    ****************
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/change-password")}
                  className="rounded-xl border border-[#cbd7e7] bg-white px-7 py-4 text-lg font-semibold text-[#3c4b66] shadow-sm transition hover:bg-[#eef3f9]"
                >
                  Ganti Password
                </button>
              </div>
            </section>

            {/* Tombol Simpan */}
            <div className="flex justify-end pb-8">
              <button
                type="button"
                onClick={handleSave}
                className="flex w-full items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-[#934bff] to-[#267dff] px-8 py-5 text-xl font-bold text-white shadow-md transition hover:opacity-90 sm:w-auto"
              >
                <Save size={29} />
                Simpan Perubahan
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}