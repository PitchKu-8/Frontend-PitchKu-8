// lib/types.ts
//
// Tipe-tipe ini SENGAJA dibuat mengikuti persis schema Zod di backend
// (src/shared/schemas/*.ts, src/modules/*/*.schema.ts). Kalau backend
// berubah, tipe di sini juga harus diubah supaya frontend tidak diam-diam
// mengirim/menerima bentuk data yang salah.

export type TemplateType =
  | "company_profile"
  | "penawaran_produk"
  | "proposal_kerjasama"
  | "laporan_ringkas";

export type ProjectStatus = "draft" | "completed";

// ---------- Business Context ----------
// businessName, shortDescription, rawMaterialText WAJIB (lihat BusinessContextSchema
// di backend). Field lain bebas (catchall) tapi tetap diketik di sini supaya
// form "create" type-safe.
export type BusinessContext = {
  businessName: string;
  shortDescription: string;
  rawMaterialText: string;
  targetAudience?: string;
  keyPoints?: string;
  price?: string;
  moq?: string;
  resellerMargin?: string;
  partnershipGoal?: string;
  period?: string;
};

// ---------- Brand Kit ----------
export type BrandKitDraft = {
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
};

export type BrandKitResponse = {
  id: string;
  logoUrl: string | null;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  updatedAt: string;
};

// ---------- Projects ----------
export type ProjectResponse = {
  id: string;
  title: string;
  templateType: TemplateType;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};

// ---------- Outline ----------
export type OutlineItem = {
  slideNumber: number;
  title: string;
  objective: string;
};

// ---------- Slides (discriminated union, samakan dgn deck.schema.ts) ----------
type BaseSlideFields = {
  slideNumber: number;
  imageUrl?: string;
  imageQuery?: string;
};

export type SlideCard = { header: string; description: string };

export type Slide =
  | (BaseSlideFields & { layout: "title_slide"; title: string; subtitle?: string })
  | (BaseSlideFields & { layout: "title_bullets"; title: string; bullets: string[] })
  | (BaseSlideFields & { layout: "two_column"; title: string; bullets: string[] })
  | (BaseSlideFields & { layout: "metrics_grid"; title: string; cards: SlideCard[] })
  | (BaseSlideFields & { layout: "card_grid"; title: string; cards: SlideCard[] })
  | (BaseSlideFields & { layout: "contact_closing"; title: string; subtitle?: string });

export type PitchKuDeckPayload = {
  deckId: string;
  template: TemplateType;
  brandKit: BrandKitDraft;
  slides: Slide[];
};

// ---------- Auth ----------
export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  userId: string;
  email: string;
};

export type ProfileResponse = {
  id: string;
  fullName: string | null;
  companyName: string | null;
  createdAt: string;
};

// ---------- Export ----------
export type ExportResult = {
  downloadUrl: string;
  fileName: string;
};