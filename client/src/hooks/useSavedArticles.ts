import { useCallback, useEffect, useState } from "react";

export interface SavedArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  imageUrl?: string;
  sources: string[];
  savedAt: string;
}

const KEY = "dijai-saved-articles";

function readSaved(): SavedArticle[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedArticle[]) : [];
  } catch {
    return [];
  }
}

function writeSaved(items: SavedArticle[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("dijai-saved-changed"));
}

export function useSavedArticles() {
  const [saved, setSaved] = useState<SavedArticle[]>(() => (typeof window === "undefined" ? [] : readSaved()));

  useEffect(() => {
    const sync = () => setSaved(readSaved());
    window.addEventListener("storage", sync);
    window.addEventListener("dijai-saved-changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("dijai-saved-changed", sync);
    };
  }, []);

  const isSaved = useCallback((id: string) => saved.some((item) => item.id === id), [saved]);

  const toggleSave = useCallback((article: Omit<SavedArticle, "savedAt">) => {
    const current = readSaved();
    const exists = current.some((item) => item.id === article.id);
    const next = exists
      ? current.filter((item) => item.id !== article.id)
      : [{ ...article, savedAt: new Date().toISOString() }, ...current];
    writeSaved(next);
    setSaved(next);
    return !exists;
  }, []);

  const remove = useCallback((id: string) => {
    const next = readSaved().filter((item) => item.id !== id);
    writeSaved(next);
    setSaved(next);
  }, []);

  return { saved, isSaved, toggleSave, remove };
}
