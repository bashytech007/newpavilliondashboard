"use client";

import { useSidebar } from "@/components/providers/sidebar-provider";
import { cn } from "@/lib/utils";

export function DashboardLayoutClient({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={cn(
        "grid h-screen w-full transition-all duration-300 overflow-hidden",
        isCollapsed ? "lg:grid-cols-[80px_1fr]" : "lg:grid-cols-[280px_1fr]"
      )}
    >
      {sidebar}
      <div className="flex flex-col overflow-hidden">{children}</div>
    </div>
  );
}
