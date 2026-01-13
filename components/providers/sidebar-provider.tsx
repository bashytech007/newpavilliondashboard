"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  setCollapsed: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Optional: Persist state to local storage
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
      return newState;
    });
  };

  const setCollapsed = (value: boolean) => {
     setIsCollapsed(value);
     localStorage.setItem("sidebarCollapsed", JSON.stringify(value));
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
