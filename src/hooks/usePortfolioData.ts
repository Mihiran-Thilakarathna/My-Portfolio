import { useFirestoreCollection } from '../services/firestoreCollection';
import type { Project, Certification, Education, WorkExperience, Competition } from '../types';
import {
  projects as staticProjects,
  certifications as staticCertifications,
  education as staticEducation,
  workExperience as staticWorkExperience,
  competitions as staticCompetitions,
} from '../data/portfolio';

// Keeps sections from rendering empty before Firestore has loaded or been seeded.
function withFallback<T>(data: T[], loading: boolean, fallback: T[]) {
  if (loading) return fallback;
  return data.length > 0 ? data : fallback;
}

const bundledAssets = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('../assets/*.{png,jpg,jpeg,webp,svg}', { eager: true, import: 'default' })
  ).map(([path, url]) => [path.split('/').pop()!.replace(/\.\w+$/, '').toLowerCase(), url])
);

// seeded docs store hashed build paths (e.g. /assets/lumo-Bv2-6cNY.png); resolve by file name
function resolveImage(image: string) {
  if (!image || /^(https?:|data:)/.test(image)) return image;
  const name = image.split('/').pop()!.replace(/\.\w+$/, '').toLowerCase();
  return bundledAssets[name] ?? bundledAssets[name.replace(/-[\w-]{8}$/, '')] ?? image;
}

export function useProjectsData() {
  const { data, loading } = useFirestoreCollection<Omit<Project, 'id'>>('projects');
  const projects = (data as Project[]).map((p) => ({ ...p, image: resolveImage(p.image) }));
  return withFallback(projects, loading, staticProjects);
}

export function useCertificationsData() {
  const { data, loading } = useFirestoreCollection<Omit<Certification, 'id'>>('certifications');
  return withFallback(data as Certification[], loading, staticCertifications);
}

export function useEducationData() {
  const { data, loading } = useFirestoreCollection<Omit<Education, 'id'>>('education');
  return withFallback(data as Education[], loading, staticEducation);
}

export function useWorkExperienceData() {
  const { data, loading } = useFirestoreCollection<Omit<WorkExperience, 'id'>>('workExperience');
  return withFallback(data as WorkExperience[], loading, staticWorkExperience);
}

export function useCompetitionsData() {
  const { data, loading } = useFirestoreCollection<Omit<Competition, 'id'>>('competitions');
  return withFallback(data as Competition[], loading, staticCompetitions);
}
