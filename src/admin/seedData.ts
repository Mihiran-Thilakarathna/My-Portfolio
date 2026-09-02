import {
  projects,
  certifications,
  education,
  workExperience,
  competitions,
} from '../data/portfolio';

function stripId<T extends { id: string }>({ id, ...rest }: T): Omit<T, 'id'> {
  void id;
  return rest;
}

// Lets the "Import Existing Data" button seed each collection from the bundled content.
export const seedDataByCollection: Record<string, Record<string, unknown>[]> = {
  projects: projects.map(stripId),
  certifications: certifications.map(stripId),
  education: education.map(stripId),
  workExperience: workExperience.map(stripId),
  competitions: competitions.map(stripId),
};
