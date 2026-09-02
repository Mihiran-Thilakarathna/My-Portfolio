import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db, isFirebaseConfigured } from '../firebase';

export function subscribeToCollection<T>(
  collectionName: string,
  onChange: (items: (T & { id: string })[]) => void,
  orderField = '__order'
) {
  const q = query(collection(db!, collectionName), orderBy(orderField, 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
      onChange(items);
    },
    () => onChange([])
  );
}

export function useFirestoreCollection<T>(collectionName: string) {
  const [data, setData] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsubscribe = subscribeToCollection<T>(collectionName, (items) => {
      setData(items);
      setLoading(false);
    });
    return unsubscribe;
  }, [collectionName]);

  return { data, loading };
}

export async function addItem<T extends object>(collectionName: string, item: T) {
  return addDoc(collection(db!, collectionName), {
    ...item,
    __order: Date.now(),
  });
}

export async function updateItem<T extends object>(
  collectionName: string,
  id: string,
  item: Partial<T>
) {
  return updateDoc(doc(db!, collectionName, id), { ...item } as { [x: string]: unknown });
}

export async function deleteItem(collectionName: string, id: string) {
  return deleteDoc(doc(db!, collectionName, id));
}
