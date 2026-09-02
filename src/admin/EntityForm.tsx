import React, { useState } from 'react';
import type { EntityConfig, FieldConfig } from './entityConfig';
import { uploadFile } from '../services/uploadFile';

type FieldValue = string | boolean | string[];
type FormValues = Record<string, FieldValue>;

interface Props {
  config: EntityConfig;
  initialData: Record<string, unknown> | null;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

function emptyValueFor(field: FieldConfig): FieldValue {
  switch (field.type) {
    case 'multiselect':
    case 'images':
      return [];
    case 'checkbox':
      return false;
    default:
      return '';
  }
}

const EntityForm: React.FC<Props> = ({ config, initialData, onSave, onCancel }) => {
  const [values, setValues] = useState<FormValues>(() => {
    const base: FormValues = {};
    config.fields.forEach((f) => {
      if (initialData && f.key in initialData) {
        const raw = initialData[f.key];
        base[f.key] = f.type === 'tags' ? (raw as string[]).join(', ') : (raw as FieldValue);
      } else {
        base[f.key] = emptyValueFor(f);
      }
    });
    return base;
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const setField = (key: string, value: FieldValue) => setValues((prev) => ({ ...prev, [key]: value }));

  const handleSingleFileUpload = async (field: FieldConfig, file: File) => {
    setUploading(true);
    try {
      const url = await uploadFile(file, config.collectionName);
      setField(field.key, url);
    } finally {
      setUploading(false);
    }
  };

  const handleMultiFileUpload = async (field: FieldConfig, files: FileList) => {
    setUploading(true);
    try {
      const uploaded = await Promise.all(Array.from(files).map((file) => uploadFile(file, config.collectionName)));
      const existing = (values[field.key] as string[]) || [];
      setField(field.key, [...existing, ...uploaded]);
    } finally {
      setUploading(false);
    }
  };

  const toggleMultiselect = (field: FieldConfig, option: string) => {
    const current = (values[field.key] as string[]) || [];
    setField(
      field.key,
      current.includes(option) ? current.filter((o) => o !== option) : [...current, option]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: Record<string, unknown> = { ...values };
      config.fields.forEach((f) => {
        if (f.type === 'tags') {
          payload[f.key] = String(values[f.key] || '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);
        }
      });
      await onSave(payload);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={onCancel}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{initialData ? `Edit ${config.singular}` : `Add ${config.singular}`}</h3>
        <form onSubmit={handleSubmit}>
          {config.fields.map((field) => (
            <div className="admin-field" key={field.key}>
              <label>{field.label}</label>

              {field.type === 'text' && (
                <input
                  type="text"
                  value={(values[field.key] as string) || ''}
                  placeholder={field.placeholder}
                  onChange={(e) => setField(field.key, e.target.value)}
                />
              )}

              {field.type === 'tags' && (
                <input
                  type="text"
                  value={(values[field.key] as string) || ''}
                  placeholder="React, Node.js, MongoDB"
                  onChange={(e) => setField(field.key, e.target.value)}
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  value={(values[field.key] as string) || ''}
                  onChange={(e) => setField(field.key, e.target.value)}
                />
              )}

              {field.type === 'select' && (
                <select value={(values[field.key] as string) || ''} onChange={(e) => setField(field.key, e.target.value)}>
                  <option value="" disabled>Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              )}

              {field.type === 'checkbox' && (
                <div className="admin-checkbox-row">
                  <input
                    type="checkbox"
                    checked={!!values[field.key]}
                    onChange={(e) => setField(field.key, e.target.checked)}
                  />
                  <span>{values[field.key] ? 'Yes' : 'No'}</span>
                </div>
              )}

              {field.type === 'multiselect' && (
                <div className="admin-multiselect-options">
                  {field.options?.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      className={`admin-chip ${((values[field.key] as string[]) || []).includes(opt) ? 'selected' : ''}`}
                      onClick={() => toggleMultiselect(field, opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {field.type === 'image' && (
                <>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => e.target.files?.[0] && handleSingleFileUpload(field, e.target.files[0])}
                  />
                  {values[field.key] && (
                    <div className="admin-image-preview">
                      {String(values[field.key]).toLowerCase().includes('.pdf') ? (
                        <span className="file-chip">📄 File uploaded</span>
                      ) : (
                        <img src={values[field.key] as string} alt="" />
                      )}
                      <button type="button" className="remove-img" onClick={() => setField(field.key, '')}>
                        Remove
                      </button>
                    </div>
                  )}
                </>
              )}

              {field.type === 'images' && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => e.target.files && handleMultiFileUpload(field, e.target.files)}
                  />
                  <div className="admin-image-preview">
                    {((values[field.key] as string[]) || []).map((url, i) => (
                      <div key={i} style={{ position: 'relative' }}>
                        <img src={url} alt="" />
                        <button
                          type="button"
                          className="remove-img"
                          onClick={() =>
                            setField(
                              field.key,
                              ((values[field.key] as string[]) || []).filter((_, idx) => idx !== i)
                            )
                          }
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}

          {uploading && <p className="admin-uploading-text">Uploading file...</p>}

          <div className="admin-modal-actions">
            <button type="button" className="admin-btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="admin-btn-primary" disabled={saving || uploading}>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntityForm;
