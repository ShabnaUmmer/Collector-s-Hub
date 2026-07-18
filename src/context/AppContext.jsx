import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [collections, setCollections] = useState(() => {
    try {
      const stored = localStorage.getItem('collectors_hub_collections');
      if (stored) return JSON.parse(stored);
    } catch {}
    return { owned: [], wishlist: [], selling: [] };
  });

  const [likedPosts, setLikedPosts] = useState(() => {
    try { return JSON.parse(localStorage.getItem('collectors_hub_likes') || '[]'); } catch { return []; }
  });

  const [savedPosts, setSavedPosts] = useState(() => {
    try { return JSON.parse(localStorage.getItem('collectors_hub_saved') || '[]'); } catch { return []; }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('collectors_hub_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('collectors_hub_likes', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem('collectors_hub_saved', JSON.stringify(savedPosts));
  }, [savedPosts]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCollection = useCallback((item, collectionKey) => {
    setCollections(prev => {
      const col = prev[collectionKey];
      const already = col.some(i => i.id === item.id);
      if (already) {
        showToast(`Already in ${collectionKey}.`, 'warning');
        return prev;
      }
      const entry = { ...item, dateAdded: new Date().toISOString(), estimatedValue: item.price || 0 };
      showToast(`Added to ${collectionKey}!`, 'success');
      return { ...prev, [collectionKey]: [...col, entry] };
    });
  }, [showToast]);

  const removeFromCollection = useCallback((itemId, collectionKey) => {
    setCollections(prev => ({
      ...prev,
      [collectionKey]: prev[collectionKey].filter(i => i.id !== itemId),
    }));
    showToast('Item removed.', 'info');
  }, [showToast]);

  const moveItem = useCallback((itemId, fromKey, toKey) => {
    setCollections(prev => {
      const item = prev[fromKey].find(i => i.id === itemId);
      if (!item) return prev;
      const alreadyIn = prev[toKey].some(i => i.id === itemId);
      if (alreadyIn) {
        showToast(`Already in ${toKey}.`, 'warning');
        return prev;
      }
      return {
        ...prev,
        [fromKey]: prev[fromKey].filter(i => i.id !== itemId),
        [toKey]: [...prev[toKey], item],
      };
    });
    showToast(`Moved to ${toKey}!`, 'success');
  }, [showToast]);

  const toggleLike = useCallback((postId) => {
    setLikedPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  }, []);

  const toggleSave = useCallback((postId) => {
    setSavedPosts(prev => {
      const next = prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId];
      showToast(prev.includes(postId) ? 'Post unsaved.' : 'Post saved!', 'info');
      return next;
    });
  }, [showToast]);

  const isInCollection = useCallback((itemId, collectionKey) => {
    return collections[collectionKey]?.some(i => i.id === itemId) ?? false;
  }, [collections]);

  return (
    <AppContext.Provider value={{
      collections, addToCollection, removeFromCollection, moveItem, isInCollection,
      likedPosts, savedPosts, toggleLike, toggleSave,
      toast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
