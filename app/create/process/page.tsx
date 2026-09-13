"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProcessPage() {
  const router = useRouter();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        router.push("/create/outline");
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [progress, router]);

  return (
    <main className="min-h-screen bg-[#f4f7fc] p-8 text-[#17213a]">
      <div className="mx-auto max-w-5xl">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-base font-medium text-[#647a9e] transition hover:text-[#6d4aff]"
        >
          <span className="text-xl">←</span>
          Kembali
        </button>

        {/* Process Card */}
        <div className="flex min-h-[75vh] items-center justify-center">
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
              AI sedang menganalisis bisnis, audiens, dan template
              untuk menyusun struktur presentasi Anda.
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
                <span>
                  {progress === 100 ? "Selesai" : "Memproses..."}
                </span>

                <span>{progress}%</span>
              </div>
            </div>

            {/* Status */}
            <div className="mt-8 rounded-2xl bg-[#f5f7ff] p-5 text-left">
              <p className="font-semibold">
                {progress < 40
                  ? "Menganalisis informasi bisnis..."
                  : progress < 70
                  ? "Menyusun struktur slide..."
                  : progress < 100
                  ? "Menyiapkan outline presentasi..."
                  : "Outline berhasil dibuat!"}
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}