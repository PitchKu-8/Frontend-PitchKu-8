// app/signup/page.tsx
//
// CATATAN PRODUK: backend TIDAK punya kolom fullName/companyName di
// endpoint signup — itu disimpan lewat POST /auth/sync-profile secara
// terpisah (lihat auth.service.ts: syncProfile). Jadi di sini signup
// dilakukan dulu (dapat accessToken), baru sync-profile dipanggil pakai
// token itu. Kalau Anda ingin fullName/companyName TIDAK wajib diisi saat
// signup (boleh dilengkapi belakangan di halaman "Pengaturan"), beri tahu
// saya — saat ini saya asumsikan diisi sekaligus karena belum ada halaman
// "Pengaturan" yang berfungsi di frontend.
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signup, syncProfile } from "@/lib/pitchku-api";
import { useAuthStore } from "@/store/useAuthStore";
import { ApiClientError } from "@/lib/api-client";

export default function SignupPage() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const setProfile = useAuthStore((state) => state.setProfile);

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const session = await signup(email, password);
      setSession(session);

      const profile = await syncProfile(fullName, companyName);
      setProfile({ fullName: profile.fullName, companyName: profile.companyName });

      router.push("/");
    } catch (error) {
      setErrorMessage(
        error instanceof ApiClientError
          ? error.message
          : "Gagal mendaftar. Coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7fc] p-8 text-[#17213a]">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b4dff] to-[#287cff] text-2xl font-bold text-white">
            P
          </div>
          <h1 className="mt-4 text-3xl font-bold">Buat Akun PitchKu</h1>
          <p className="mt-2 text-[#7185a4]">
            Mulai buat presentasi bisnis dengan bantuan AI.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-semibold">Nama Lengkap</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Budi Santoso"
              className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">Nama Usaha</label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Kopi Nusantara"
              className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@usaha.com"
              className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">Kata Sandi</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full rounded-xl border border-[#dce3ef] px-4 py-3 outline-none focus:border-[#6d4aff]"
            />
          </div>

          {errorMessage && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-8 py-4 font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
          >
            {isSubmitting ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#7185a4]">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold text-[#6d4aff]">
            Masuk
          </Link>
        </p>
      </div>
    </main>
  );
}