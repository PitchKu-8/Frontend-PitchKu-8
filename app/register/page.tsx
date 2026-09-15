"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  UserRound,
  Building2,
  Mail,
  LockKeyhole,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { apiFetch } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("Nama lengkap wajib diisi.");
      return;
    }

    if (!companyName.trim()) {
      alert("Nama usaha wajib diisi.");
      return;
    }

    if (!email.trim()) {
      alert("Email wajib diisi.");
      return;
    }

    if (password.length < 6) {
      alert("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);

    try {
      // 1. Daftar akun melalui Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
            company_name: companyName.trim(),
          },
        },
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("User gagal dibuat.");
      }

      // 2. Jika verifikasi email aktif,
      // user belum memiliki session/JWT
      if (!data.session) {
        alert(
          "Pendaftaran berhasil! Silakan cek email untuk verifikasi akun, lalu masuk ke halaman login."
        );

        router.push("/login");
        return;
      }

      // 3. Sinkronisasi profil ke backend PitchKu
      await apiFetch("/auth/sync-profile", {
        method: "POST",
        body: JSON.stringify({
          fullName: name.trim(),
          companyName: companyName.trim(),
        }),
      });

      alert("Pendaftaran berhasil!");
      router.push("/login");
    } catch (error) {
      console.error("Register error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Pendaftaran gagal. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#eef3f9] px-4 py-8 text-[#17213b] sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[720px] items-center justify-center">
        <section className="w-full rounded-[32px] bg-white px-7 py-10 shadow-sm sm:px-14 sm:py-12">
          {/* Logo */}
          <div className="mb-12 flex items-center justify-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#914cff] to-[#267dff] text-4xl font-bold text-white shadow-md">
              P
            </div>

            <span className="text-4xl font-bold tracking-tight text-[#101a34]">
              PitchKu
            </span>
          </div>

          {/* Heading */}
          <div className="mb-14 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#111a34] sm:text-5xl">
              Buat Akun Baru
            </h1>

            <p className="mt-5 text-lg text-[#6b7f9f] sm:text-2xl">
              Mulai perjalanan presentasi memukau Anda hari ini.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-8">
            {/* Nama Lengkap */}
            <div>
              <label
                htmlFor="name"
                className="mb-3 block text-xl font-semibold text-[#3b4b67]"
              >
                Nama Lengkap
              </label>

              <div className="relative">
                <UserRound
                  size={30}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#91a6c3]"
                />

                <input
                  id="name"
                  type="text"
                  placeholder="Budi Santoso"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  disabled={loading}
                  className="w-full rounded-2xl border border-[#dce4ef] bg-[#f8fafc] py-5 pl-16 pr-5 text-xl text-[#17213b] outline-none transition placeholder:text-[#91a6c3] focus:border-[#6b5cff] focus:ring-2 focus:ring-[#6b5cff]/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Nama Usaha */}
            <div>
              <label
                htmlFor="companyName"
                className="mb-3 block text-xl font-semibold text-[#3b4b67]"
              >
                Nama Usaha
              </label>

              <div className="relative">
                <Building2
                  size={30}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#91a6c3]"
                />

                <input
                  id="companyName"
                  type="text"
                  placeholder="Kopi Nusantara"
                  value={companyName}
                  onChange={(event) =>
                    setCompanyName(event.target.value)
                  }
                  required
                  disabled={loading}
                  className="w-full rounded-2xl border border-[#dce4ef] bg-[#f8fafc] py-5 pl-16 pr-5 text-xl text-[#17213b] outline-none transition placeholder:text-[#91a6c3] focus:border-[#6b5cff] focus:ring-2 focus:ring-[#6b5cff]/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-3 block text-xl font-semibold text-[#3b4b67]"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={30}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#91a6c3]"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  disabled={loading}
                  className="w-full rounded-2xl border border-[#dce4ef] bg-[#f8fafc] py-5 pl-16 pr-5 text-xl text-[#17213b] outline-none transition placeholder:text-[#91a6c3] focus:border-[#6b5cff] focus:ring-2 focus:ring-[#6b5cff]/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-3 block text-xl font-semibold text-[#3b4b67]"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={30}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#91a6c3]"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                  disabled={loading}
                  className="w-full rounded-2xl border border-[#dce4ef] bg-[#f8fafc] py-5 pl-16 pr-16 text-xl text-[#17213b] outline-none transition placeholder:text-[#91a6c3] focus:border-[#6b5cff] focus:ring-2 focus:ring-[#6b5cff]/20 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Sembunyikan password"
                      : "Tampilkan password"
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#91a6c3] transition hover:text-[#6b5cff] disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff size={27} />
                  ) : (
                    <Eye size={27} />
                  )}
                </button>
              </div>

              <p className="mt-2 text-sm text-[#7186a5]">
                Password minimal 6 karakter.
              </p>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-5 rounded-2xl bg-gradient-to-r from-[#934bff] to-[#267dff] px-6 py-5 text-2xl font-bold text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Daftar Sekarang"}

              {!loading && <ArrowRight size={32} />}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-12 text-center text-lg text-[#6b7f9f] sm:text-2xl">
            Sudah punya akun?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              disabled={loading}
              className="font-bold text-[#15558e] hover:text-[#704bff] disabled:opacity-50"
            >
              Masuk
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}