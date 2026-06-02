"use client";

import { useState, useEffect } from "react";
import { defaultContent, ContentData } from "../data/content";

export function useContent() {
  const [content, setContent] = useState<ContentData>(() => {
    // Return defaultContent during SSR, and attempt loading from localStorage on the client.
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("master_fitness_content");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.version === defaultContent.version) {
            return parsed;
          }
        }
      } catch (e) {
        console.error("Error loading content from localStorage", e);
      }
    }
    return defaultContent;
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  const updateContent = (newContent: ContentData) => {
    setContent(newContent);
    try {
      localStorage.setItem("master_fitness_content", JSON.stringify(newContent));
    } catch (e) {
      console.error("Error saving content to localStorage", e);
    }
  };

  const resetContent = () => {
    setContent(defaultContent);
    try {
      localStorage.removeItem("master_fitness_content");
    } catch (e) {
      console.error("Error resetting content", e);
    }
  };

  return { content, updateContent, resetContent, isLoaded };
}
