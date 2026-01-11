"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function ThemeSync({ preferredTheme }: { preferredTheme?: string }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    if (preferredTheme) {
      setTheme(preferredTheme);
    }
  }, []);

  return null;
}
