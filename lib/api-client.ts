// lib/api-client.ts
//
// Satu-satunya tempat yang tahu cara "bicara" dengan backend PitchKu:
// - menambahkan header Authorization dari session yang tersimpan di store
// - membongkar response envelope { success, data } / { success: false, error }
// - melempar ApiClientError yang membawa `code` asli dari backend, supaya
//   halaman bisa menampilkan pesan yang sesuai (mis. brand kit belum lengkap,
//   rate limited, dll) alih-alih "terjadi kesalahan" generik.
//
// Import store secara lazy (getState, bukan hook) supaya file ini bisa
// dipakai di luar komponen React.
import { useAuthStore } from "@/store/useAuthStore";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/v1";

export type ApiErrorCode =
  | "AUTH_UNAUTHORIZED"
  | "AUTH_FORBIDDEN"
  | "VALIDATION_INVALID_INPUT"
  | "VALIDATION_FILE_TOO_LARGE"
  | "VALIDATION_FILE_TYPE_INVALID"
  | "VALIDATION_HEX_INVALID"
  | "VALIDATION_CHAR_LIMIT_EXCEEDED"
  | "VALIDATION_SLIDE_COUNT_OUT_OF_RANGE"
  | "AI_OUTLINE_GENERATION_FAILED"
  | "AI_CONTENT_GENERATION_FAILED"
  | "AI_PROVIDER_TIMEOUT"
  | "AI_RATE_LIMITED"
  | "EXPORT_RENDER_FAILED"
  | "RESOURCE_NOT_FOUND"
  | "RESOURCE_STATE_CONFLICT"
  | "INTERNAL_SERVER_ERROR";

export class ApiClientError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    message: string,
    public readonly details: unknown = undefined,
    public readonly httpStatus: number | undefined = undefined,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

type ApiEnvelope<T> =
  | {
      success: true;
      data: T;
      meta?: { page?: number; limit?: number; total?: number };
    }
  | {
      success: false;
      error: { code: ApiErrorCode; message: string; details?: unknown };
    };

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | undefined>;
  /** Set true saat body berupa FormData (upload file) — jangan set Content-Type manual. */
  isFormData?: boolean;
  signal?: AbortSignal;
};

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, query, isFormData = false, signal } = options;
  const accessToken = useAuthStore.getState().accessToken;

  const headers: Record<string, string> = {};
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  if (!isFormData && body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  let response: Response;
  try {
    response = await fetch(buildUrl(path, query), {
      method,
      headers,
      body:
        body === undefined
          ? undefined
          : isFormData
            ? (body as FormData)
            : JSON.stringify(body),
      signal,
    });
  } catch {
    // Network error murni (server mati, CORS, offline, dll) — tidak ada
    // response JSON untuk dibongkar.
    throw new ApiClientError(
      "INTERNAL_SERVER_ERROR",
      "Tidak dapat terhubung ke server PitchKu. Periksa koneksi Anda.",
    );
  }

  // 204 No Content: logout, delete project — tidak ada body untuk di-parse.
  if (response.status === 204) return undefined as T;

  const envelope = (await response.json()) as ApiEnvelope<T>;

  if (!envelope.success) {
    if (envelope.error.code === "AUTH_UNAUTHORIZED") {
      // Token kedaluwarsa/invalid — bersihkan session lokal supaya halaman
      // berikutnya redirect ke /login alih-alih diam-diam gagal terus.
      useAuthStore.getState().clearSession();
    }
    throw new ApiClientError(
      envelope.error.code,
      envelope.error.message,
      envelope.error.details,
      response.status,
    );
  }

  return envelope.data;
}