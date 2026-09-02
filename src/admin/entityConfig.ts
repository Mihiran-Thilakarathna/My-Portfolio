export type FieldType =
  | 'text'
  | 'textarea'
  | 'tags'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'image'
  | 'images';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
}

export interface EntityConfig {
  collectionName: string;
  title: string;
  singular: string;
  titleField: string;
  subtitleField?: string;
  fields: FieldConfig[];
}

export const entityConfigs: Record<string, EntityConfig> = {
  projects: {
    collectionName: 'projects',
    title: 'Projects',
    singular: 'Project',
    titleField: 'title',
    subtitleField: 'description',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image', label: 'Cover Image', type: 'image' },
      {
        key: 'categories',
        label: 'Categories',
        type: 'multiselect',
        options: ['AI/ML', 'Web Application', 'Mobile Application'],
      },
      { key: 'tags', label: 'Tech Tags (comma separated)', type: 'tags' },
      { key: 'codeUrl', label: 'Code URL', type: 'text', placeholder: 'https://github.com/...' },
      { key: 'liveUrl', label: 'Live Demo URL', type: 'text', placeholder: 'https://...' },
    ],
  },
  certifications: {
    collectionName: 'certifications',
    title: 'Certifications',
    singular: 'Certification',
    titleField: 'title',
    subtitleField: 'provider',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'provider', label: 'Provider', type: 'text' },
      { key: 'date', label: 'Date', type: 'text', placeholder: 'e.g. Jun 2026' },
      { key: 'certificateUrl', label: 'Certificate (PDF)', type: 'image' },
    ],
  },
  education: {
    collectionName: 'education',
    title: 'Education',
    singular: 'Education',
    titleField: 'institution',
    subtitleField: 'degree',
    fields: [
      { key: 'institution', label: 'Institution', type: 'text' },
      { key: 'degree', label: 'Degree', type: 'text' },
      { key: 'startDate', label: 'Start Date', type: 'text' },
      { key: 'endDate', label: 'End Date', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: ['ONGOING', 'COMPLETED'] },
    ],
  },
  workExperience: {
    collectionName: 'workExperience',
    title: 'Work Experience',
    singular: 'Work Experience',
    titleField: 'role',
    subtitleField: 'company',
    fields: [
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'company', label: 'Company', type: 'text' },
      { key: 'startDate', label: 'Start Date', type: 'text' },
      { key: 'endDate', label: 'End Date', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'current', label: 'Currently active', type: 'checkbox' },
    ],
  },
  competitions: {
    collectionName: 'competitions',
    title: 'Achievements & Competitions',
    singular: 'Competition',
    titleField: 'name',
    subtitleField: 'organizer',
    fields: [
      { key: 'name', label: 'Competition Name', type: 'text' },
      { key: 'year', label: 'Year', type: 'text' },
      { key: 'result', label: 'Result', type: 'text', placeholder: 'e.g. Grand Finalist' },
      { key: 'resultType', label: 'Result Type', type: 'select', options: ['winner', 'finalist', 'participant'] },
      { key: 'organizer', label: 'Organizer', type: 'text' },
      { key: 'venue', label: 'Venue', type: 'text' },
      { key: 'team', label: 'Team', type: 'text' },
      { key: 'university', label: 'University', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'tags', label: 'Tags (comma separated)', type: 'tags' },
      { key: 'photos', label: 'Event Photos', type: 'images' },
    ],
  },
};
