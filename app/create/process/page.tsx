// app/create/process/page.tsx
//
// PERBAIKAN vs versi lama: progress bar dulu murni animasi setInterval yang
// tidak terhubung ke apa pun. Sekarang animasi tetap dipakai untuk UX (kita
// tidak punya progress real dari satu panggilan POST), TAPI perpindahan ke
// halaman berikutnya menunggu response asli dari generateOutline(), dan
// hasilnya disimpan ke wizard store. Kalau gagal, ditampilkan tombol coba lagi
// alih-alih diam-diam redirect.
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/lib/useRequireAuth";
import { useWizardStore } from "@/store/useWizardStore";
import { generateOutline } from "@/lib/pitchku-api";
import { ApiClientError } from "@/lib/api-client";

export default function ProcessPage() {
  const router = useRouter();
  const { isAuthenticated } = useRequireAuth();
  const projectId = useWizardStore((state) => state.projectId);
  const setOutline = useWizardStore((state) => state.setOutline);

  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Animasi progress bar — murni kosmetik, tidak mencerminkan progres asli
  // dari backend (backend hanya membalas sekali di akhir, bukan streaming).
  useEffect(() => {
    if (status !== "loading") return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
    }, 400);
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (!projectId) {
      router.replace("/create/template");
      return;
    }

    let isCancelled = false;

    async function runGenerateOutline() {
      try {
        const outline = await generateOutline(projectId as string);
        if (isCancelled) return;
        setOutline(outline);
        setProgress(100);
        setStatus("success");
        setTimeout(() => router.push("/create/outline"), 500);
      } catch (error) {
        if (isCancelled) return;
        setStatus("error");
        setErrorMessage(
          error instanceof ApiClientError
            ? error.message
            : "Gagal membuat outline. Coba lagi.",
        );
      }
    }

    runGenerateOutline();
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  if (!isAuthenticated) return null;

  const handleRetry = () => {
    setStatus("loading");
    setProgress(0);
    setErrorMessage(null);
    // Trigger ulang lewat perubahan status; efek generate dipicu oleh
    // projectId yang sama, jadi kita panggil ulang secara manual di sini.
    if (projectId) {
      generateOutline(projectId)
        .then((outline) => {
          setOutline(outline);
          setProgress(100);
          setStatus("success");
          setTimeout(() => router.push("/create/outline"), 500);
        })
        .catch((error) => {
          setStatus("error");
          setErrorMessage(
            error instanceof ApiClientError
              ? error.message
              : "Gagal membuat outline. Coba lagi.",
          );
        });
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7fc] p-8 text-[#17213a]">
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="w-full max-w-2xl rounded-3xl bg-white p-10 text-center shadow-sm">
          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f0eaff] text-3xl">
            ✨
          </div>

          <p className="mt-6 text-sm font-semibold text-[#6d4aff]">
            LANGKAH 4 DARI 7
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            AI sedang menyiapkan presentasi
          </h1>

          <p className="mt-4 text-[#7185a4]">
            AI sedang menganalisis bisnis, audiens, dan template untuk
            menyusun struktur presentasi Anda.
          </p>

          {/* Progress */}
          <div className="mt-8">
            <div className="h-3 overflow-hidden rounded-full bg-[#e8edf5]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8b4dff] to-[#287cff] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 flex justify-between text-sm text-[#7185a4]">
              <span>{status === "error" ? "Gagal" : "Memproses..."}</span>
              <span>{progress}%</span>
            </div>
          </div>

          {/* Status */}
          <div className="mt-8 rounded-2xl bg-[#f5f7ff] p-5 text-left">
            <p className="font-semibold">
              {status === "error"
                ? errorMessage
                : progress < 100
                  ? "Menyusun struktur slide..."
                  : "Outline berhasil dibuat!"}
            </p>
          </div>

          {status === "error" && (
            <button
              onClick={handleRetry}
              className="mt-6 rounded-xl bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-8 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Coba Lagi
            </button>
          )}
        </div>
      </div>
    </main>
  );
}