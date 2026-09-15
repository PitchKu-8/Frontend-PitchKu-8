"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Mail,
  LockKeyhole,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);

    try {
      // Login melalui Supabase Auth
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      // Jika login berhasil, masuk ke halaman proyek
      router.push("/projects");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login gagal. Silakan coba lagi.");
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
              Selamat Datang Kembali
            </h1>

            <p className="mt-5 text-lg text-[#6b7f9f] sm:text-2xl">
              Masuk untuk melanjutkan ke dasbor PitchKu Anda.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-8">
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
              <div className="mb-3 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="text-xl font-semibold text-[#3b4b67]"
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  disabled={loading}
                  className="text-lg font-semibold text-[#15558e] transition hover:text-[#704bff] disabled:opacity-50"
                >
                  Lupa Password?
                </button>
              </div>

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
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-5 rounded-2xl bg-gradient-to-r from-[#934bff] to-[#267dff] px-6 py-5 text-2xl font-bold text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Masuk Sekarang"}

              {!loading && <ArrowRight size={32} />}
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-12 text-center text-lg text-[#6b7f9f] sm:text-2xl">
            Belum punya akun?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              disabled={loading}
              className="font-bold text-[#15558e] hover:text-[#704bff] disabled:opacity-50"
            >
              Daftar Gratis
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}