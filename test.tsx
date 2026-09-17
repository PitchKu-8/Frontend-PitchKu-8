// app/projects/page.tsx
//
// Halaman baru — sebelumnya "Proyek Saya" di sidebar cuma tombol statis
// tanpa halaman tujuan. Di sini daftar project diambil dari
// GET /v1/projects (dengan pagination sederhana), plus aksi lanjutkan,
// duplikat, dan hapus yang backend-nya sudah ada tapi belum dipakai
// (POST /projects/:id/duplicate, DELETE /projects/:id).
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/lib/useRequireAuth";
import { Sidebar } from "@/components/Sidebar";
import {
  deleteProject,
  duplicateProject,
  listProjects,
} from "@/lib/pitchku-api";
import { ApiClientError } from "@/lib/api-client";
import { useWizardStore } from "@/store/useWizardStore";
import type { ProjectResponse, ProjectStatus } from "@/lib/types";

const TEMPLATE_LABELS: Record<ProjectResponse["templateType"], string> = {
  company_profile: "Company Profile",
  penawaran_produk: "Penawaran Produk",
  proposal_kerjasama: "Proposal Kerja Sama",
  laporan_ringkas: "Laporan Ringkas",
};

const STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: "Draft",
  completed: "Selesai",
};

export default function ProjectsPage() {
  const router = useRouter();
  const { isAuthenticated } = useRequireAuth();
  const resetWizard = useWizardStore((state) => state.reset);
  const setProjectId = useWizardStore((state) => state.setProjectId);

  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [busyProjectId, setBusyProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    let isCancelled = false;
    setIsLoading(true);
    setErrorMessage(null);

    listProjects({
      status: statusFilter === "all" ? undefined : statusFilter,
      page: 1,
      limit: 20,
    })
      .then((items) => {
        if (!isCancelled) setProjects(items);
      })
      .catch((error) => {
        if (isCancelled) return;
        setErrorMessage(
          error instanceof ApiClientError
            ? error.message
            : "Gagal memuat daftar proyek.",
        );
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated, statusFilter]);

  if (!isAuthenticated) return null;

  const handleContinue = (project: ProjectResponse) => {
    // NOTE: melanjutkan project draft yang sudah ada butuh wizard store
    // diisi ulang dari data project itu (business context, outline, brand
    // kit yang sudah tersimpan) — endpoint GET /projects/:id saat ini cuma
    // mengembalikan metadata project (title, status), bukan snapshot
    // deck_versions-nya. Backend perlu endpoint tambahan (mis. GET
    // /projects/:id/deck) sebelum "Lanjutkan" bisa membuka wizard tepat di
    // langkah terakhir yang dikerjakan. Untuk sekarang, tombol ini membuka
    // langkah Isi Slide/Editor HANYA kalau project berstatus "completed"
    // (artinya slides sudah pasti ada) — untuk draft, arahkan ke pesan ini.
    if (project.status === "completed") {
      resetWizard();
      setProjectId(project.id);
      router.push("/create/editor");
    } else {
      setErrorMessage(
        `Project draft "${project.title}" belum bisa dilanjutkan dari sini — backend belum punya endpoint untuk memuat ulang progres wizard. Untuk sekarang, mulai presentasi baru dengan data yang sama, atau beri tahu saya supaya endpoint "resume" ditambahkan di backend.`,
      );
    }
  };

  const handleDuplicate = async (project: ProjectResponse) => {
    setBusyProjectId(project.id);
    setErrorMessage(null);
    try {
      const duplicated = await duplicateProject(project.id);
      setProjects((current) => [duplicated, ...current]);
    } catch (error) {
      setErrorMessage(
        error instanceof ApiClientError
          ? error.message
          : "Gagal menduplikasi proyek.",
      );
    } finally {
      setBusyProjectId(null);
    }
  };

  const handleDelete = async (project: ProjectResponse) => {
    if (!window.confirm(`Hapus proyek "${project.title}"? Tindakan ini tidak bisa dibatalkan.`)) {
      return;
    }
    setBusyProjectId(project.id);
    setErrorMessage(null);
    try {
      await deleteProject(project.id);
      setProjects((current) => current.filter((p) => p.id !== project.id));
    } catch (error) {
      setErrorMessage(
        error instanceof ApiClientError
          ? error.message
          : "Gagal menghapus proyek.",
      );
    } finally {
      setBusyProjectId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7fc] text-[#17213a]">
      <div className="flex min-h-screen">
        <Sidebar activeNav="projects" />

        <section className="flex-1 p-4">
          <div className="min-h-[calc(100vh-32px)] rounded-[40px] bg-gradient-to-br from-[#f1f4ff] to-[#fbf9ff] px-12 py-16">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold">Proyek Saya</h1>
                <p className="mt-2 text-lg text-[#667b9d]">
                  Semua presentasi yang pernah Anda buat.
                </p>
              </div>

              <div className="flex gap-2 rounded-xl bg-white p-1 shadow-sm">
                {(["all", "draft", "completed"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      statusFilter === status
                        ? "bg-[#6d4aff] text-white"
                        : "text-[#647a9e] hover:bg-[#f3f5f9]"
                    }`}
                  >
                    {status === "all" ? "Semua" : STATUS_LABELS[status]}
                  </button>
                ))}
              </div>
            </div>

            {errorMessage && (
              <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            {isLoading ? (
              <p className="text-[#7185a4]">Memuat proyek...</p>
            ) : projects.length === 0 ? (
              <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
                <p className="text-lg text-[#7185a4]">
                  Belum ada proyek. Mulai presentasi baru dari dashboard.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex flex-col rounded-3xl bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          project.status === "completed"
                            ? "bg-green-50 text-green-700"
                            : "bg-[#f0eaff] text-[#6d4aff]"
                        }`}
                      >
                        {STATUS_LABELS[project.status]}
                      </span>
                      <span className="text-xs text-[#9aa8bd]">
                        {new Date(project.updatedAt).toLocaleDateString("id-ID")}
                      </span>
                    </div>

                    <h2 className="mt-4 text-lg font-bold">{project.title}</h2>
                    <p className="mt-1 text-sm text-[#7185a4]">
                      {TEMPLATE_LABELS[project.templateType]}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleContinue(project)}
                        disabled={busyProjectId === project.id}
                        className="rounded-lg bg-gradient-to-r from-[#8b4dff] to-[#287cff] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                      >
                        Lanjutkan
                      </button>
                      <button
                        onClick={() => handleDuplicate(project)}
                        disabled={busyProjectId === project.id}
                        className="rounded-lg border border-[#dce3ef] px-4 py-2 text-sm font-semibold disabled:opacity-60"
                      >
                        Duplikat
                      </button>
                      <button
                        onClick={() => handleDelete(project)}
                        disabled={busyProjectId === project.id}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 disabled:opacity-60"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}