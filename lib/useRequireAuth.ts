// lib/useRequireAuth.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * Panggil di halaman manapun yang butuh user sudah login.
 * Kalau belum ada accessToken (belum login, atau token sudah dibersihkan
 * karena AUTH_UNAUTHORIZED dari backend), redirect ke /login.
 */
export function useRequireAuth() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, router]);

  return { isAuthenticated: Boolean(accessToken) };
}