// store/useWizardStore.ts
//
// State yang mengalir sepanjang wizard 7 langkah (template -> business
// context -> brand kit -> proses AI -> outline -> content -> editor).
// SENGAJA tidak dipersist ke localStorage: begitu `createProject` sukses,
// sumber kebenaran adalah backend (projectId), bukan draft lokal. Draft
// form (businessContext, brandKit) cukup hidup di memori selama user masih
// di wizard yang sama — kalau di-refresh, wizard mulai dari awal (ini
// trade-off yang wajar untuk MVP; kalau butuh survive refresh, ganti ke
// `persist` seperti useAuthStore).
"use client";

import { create } from "zustand";
import type {
  BrandKitDraft,
  BusinessContext,
  OutlineItem,
  Slide,
  TemplateType,
} from "@/lib/types";

type WizardState = {
  templateType: TemplateType | null;
  projectId: string | null;
  businessContext: BusinessContext | null;
  brandKit: BrandKitDraft | null;
  outline: OutlineItem[];
  slides: Slide[];
  setTemplateType: (templateType: TemplateType) => void;
  setProjectId: (projectId: string) => void;
  setBusinessContext: (businessContext: BusinessContext) => void;
  setBrandKit: (brandKit: BrandKitDraft) => void;
  setOutline: (outline: OutlineItem[]) => void;
  setSlides: (slides: Slide[]) => void;
  reset: () => void;
};

const initialState = {
  templateType: null,
  projectId: null,
  businessContext: null,
  brandKit: null,
  outline: [],
  slides: [],
} satisfies Omit<
  WizardState,
  | "setTemplateType"
  | "setProjectId"
  | "setBusinessContext"
  | "setBrandKit"
  | "setOutline"
  | "setSlides"
  | "reset"
>;

export const useWizardStore = create<WizardState>((set) => ({
  ...initialState,
  setTemplateType: (templateType) => set({ templateType }),
  setProjectId: (projectId) => set({ projectId }),
  setBusinessContext: (businessContext) => set({ businessContext }),
  setBrandKit: (brandKit) => set({ brandKit }),
  setOutline: (outline) => set({ outline }),
  setSlides: (slides) => set({ slides }),
  reset: () => set(initialState),
}));