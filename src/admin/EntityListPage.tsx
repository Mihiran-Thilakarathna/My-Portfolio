import React, { useState } from 'react';
import { FaPlus, FaFileImport } from 'react-icons/fa';
import { entityConfigs } from './entityConfig';
import { seedDataByCollection } from './seedData';
import EntityForm from './EntityForm';
import { useFirestoreCollection, addItem, updateItem, deleteItem } from '../services/firestoreCollection';

const EntityListPage: React.FC<{ entityKey: string }> = ({ entityKey }) => {
  const config = entityConfigs[entityKey];
  const { data, loading } = useFirestoreCollection<Record<string, unknown>>(config.collectionName);
  const [editing, setEditing] = useState<Record<string, unknown> | null | 'new'>(null);
  const [importing, setImporting] = useState(false);

  const handleImportSeed = async () => {
    setImporting(true);
    try {
      const seedItems = seedDataByCollection[config.collectionName] || [];
      for (const item of seedItems) {
        await addItem(config.collectionName, item);
      }
    } finally {
      setImporting(false);
    }
  };

  const handleSave = async (values: Record<string, unknown>) => {
    if (editing && editing !== 'new') {
      await updateItem(config.collectionName, editing.id as string, values);
    } else {
      await addItem(config.collectionName, values);
    }
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm(`Delete this ${config.singular.toLowerCase()}? This cannot be undone.`)) {
      await deleteItem(config.collectionName, id);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h2>{config.title}</h2>
        <button className="admin-btn-primary" style={{ width: 'auto' }} onClick={() => setEditing('new')}>
          <FaPlus /> Add {config.singular}
        </button>
      </div>

      {loading && <p className="admin-empty-state">Loading...</p>}

      {!loading && data.length === 0 && (
        <div className="admin-empty-state">
          <p style={{ marginBottom: '1rem' }}>No {config.title.toLowerCase()} yet. Add your first one, or import your existing portfolio data as a starting point.</p>
          <button className="admin-btn-primary" style={{ width: 'auto' }} onClick={handleImportSeed} disabled={importing}>
            <FaFileImport /> {importing ? 'Importing...' : 'Import Existing Data'}
          </button>
        </div>
      )}

      <div className="admin-item-grid">
        {data.map((item) => (
          <div className="admin-item-card" key={item.id as string}>
            <h4>{String(item[config.titleField] ?? '')}</h4>
            {config.subtitleField && (
              <p className="admin-item-subtitle">{String(item[config.subtitleField] ?? '')}</p>
            )}
            <div className="admin-item-actions">
              <button className="edit-btn" onClick={() => setEditing(item)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(item.id as string)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <EntityForm
          config={config}
          initialData={editing === 'new' ? null : editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
};

export default EntityListPage;
