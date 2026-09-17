// lib/pitchku-api.ts
//
// Satu fungsi per endpoint backend (lihat API Contract v1.1). Halaman React
// tidak pernah memanggil `fetch` langsung — selalu lewat fungsi di sini,
// supaya kalau bentuk request/response backend berubah, cukup diubah di
// satu tempat.
import { apiRequest } from "./api-client";
import type {
  AuthSession,
  BrandKitDraft,
  BrandKitResponse,
  BusinessContext,
  ExportResult,
  OutlineItem,
  PitchKuDeckPayload,
  ProfileResponse,
  ProjectResponse,
  ProjectStatus,
  Slide,
  TemplateType,
} from "./types";

// ---------- Auth ----------
export function signup(email: string, password: string) {
  return apiRequest<AuthSession>("/auth/signup", {
    method: "POST",
    body: { email, password },
  });
}

export function login(email: string, password: string) {
  return apiRequest<AuthSession>("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export function logout() {
  return apiRequest<void>("/auth/logout", { method: "POST" });
}

export function syncProfile(fullName: string, companyName: string) {
  return apiRequest<ProfileResponse>("/auth/sync-profile", {
    method: "POST",
    body: { fullName, companyName },
  });
}

// ---------- Brand Kit ----------
export function uploadLogo(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return apiRequest<{ logoUrl: string }>("/brand-kits/logo-upload", {
    method: "POST",
    body: formData,
    isFormData: true,
  });
}

export function upsertBrandKit(input: BrandKitDraft) {
  return apiRequest<BrandKitResponse>("/brand-kits", {
    method: "POST",
    body: input,
  });
}

export function getActiveBrandKit() {
  return apiRequest<BrandKitResponse | null>("/brand-kits/active");
}

// ---------- Projects ----------
export function createProject(input: {
  title: string;
  templateType: TemplateType;
  businessContext: BusinessContext;
}) {
  return apiRequest<ProjectResponse>("/projects", {
    method: "POST",
    body: input,
  });
}

export function getProject(id: string) {
  return apiRequest<ProjectResponse>(`/projects/${id}`);
}

export function listProjects(params?: {
  status?: ProjectStatus;
  page?: number;
  limit?: number;
}) {
  return apiRequest<ProjectResponse[]>("/projects", { query: params });
}

export function deleteProject(id: string) {
  return apiRequest<void>(`/projects/${id}`, { method: "DELETE" });
}

export function duplicateProject(id: string) {
  return apiRequest<ProjectResponse>(`/projects/${id}/duplicate`, {
    method: "POST",
  });
}

// ---------- AI Engine ----------
// Stage 1: generate outline (tidak butuh body — backend baca business
// context dari deck_versions project ini).
export function generateOutline(projectId: string) {
  return apiRequest<OutlineItem[]>(`/projects/${projectId}/outline`, {
    method: "POST",
  });
}

// CRUD murni, tidak memanggil AI — dipakai untuk menyimpan hasil edit user
// sekaligus "mengonfirmasi" outline sebelum lanjut ke Stage 2.
export function confirmOutline(projectId: string, outline: OutlineItem[]) {
  return apiRequest<OutlineItem[]>(`/projects/${projectId}/outline`, {
    method: "PATCH",
    body: { outline },
  });
}

// Stage 2: generate seluruh isi slide. Syarat: outline sudah di-confirm DAN
// brand kit (dengan logo) sudah tersimpan — kalau belum, backend balas 409
// RESOURCE_STATE_CONFLICT.
export function generateContent(projectId: string) {
  return apiRequest<PitchKuDeckPayload>(`/projects/${projectId}/content`, {
    method: "POST",
  });
}

// Menyimpan slide yang sudah diedit user (Langkah 6/7) balik ke backend.
// Ini murni CRUD (tidak memanggil AI lagi) — dipanggil otomatis saat pindah
// ke Editor dan tepat sebelum export, supaya file yang di-download selalu
// mencerminkan versi terakhir yang dilihat/diedit user, bukan hasil AI mentah.
export function saveSlides(projectId: string, slides: Slide[]) {
  return apiRequest<Slide[]>(`/projects/${projectId}/content`, {
    method: "PATCH",
    body: { slides },
  });
}

// ---------- Export ----------
export function exportPptx(projectId: string) {
  return apiRequest<ExportResult>(`/projects/${projectId}/export/pptx`, {
    method: "POST",
  });
}

export function exportPdf(projectId: string) {
  return apiRequest<ExportResult>(`/projects/${projectId}/export/pdf`, {
    method: "POST",
  });
}