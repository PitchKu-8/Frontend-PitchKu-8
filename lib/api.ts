import { supabase } from "./supabase";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  meta?: unknown;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL belum diatur.");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers = new Headers(options.headers);

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const result: ApiResponse<T> = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.error?.message || "Terjadi kesalahan pada server."
    );
  }

  return result.data as T;
}