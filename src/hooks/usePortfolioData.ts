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

export function useProjectsData() {
  const { data, loading } = useFirestoreCollection<Omit<Project, 'id'>>('projects');
  return withFallback(data as Project[], loading, staticProjects);
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
