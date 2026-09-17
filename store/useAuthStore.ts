// store/useAuthStore.ts
//
// Session auth (accessToken dari backend, BUKAN Supabase key langsung —
// backend PitchKu memproksi Supabase Auth dan mengeluarkan accessToken
// sendiri di /v1/auth/login & /v1/auth/signup).
//
// Dipersist ke localStorage supaya refresh halaman tidak memaksa user
// login ulang. CATATAN: accessToken Supabase defaultnya berumur ~1 jam
// (expiresIn) dan backend saat ini belum mengekspos endpoint refresh —
// kalau token kedaluwarsa, apiRequest akan menerima AUTH_UNAUTHORIZED dan
// otomatis clearSession(), lalu halaman perlu redirect ke /login.
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthUser = { id: string; email: string };
type AuthProfile = { fullName: string | null; companyName: string | null };

type AuthState = {
  user: AuthUser | null;
  profile: AuthProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  setSession: (session: {
    userId: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  }) => void;
  setProfile: (profile: AuthProfile) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      accessToken: null,
      refreshToken: null,
      setSession: (session) =>
        set({
          user: { id: session.userId, email: session.email },
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
        }),
      setProfile: (profile) => set({ profile }),
      clearSession: () =>
        set({ user: null, profile: null, accessToken: null, refreshToken: null }),
    }),
    { name: "pitchku-auth" },
  ),
);