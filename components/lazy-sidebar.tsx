"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const Sidebar = dynamic(() => import("./sidebar").then((mod) => mod.Sidebar), {
  loading: () => (
    <aside className="hidden border-r bg-card lg:flex lg:flex-col w-[280px]">
      <div className="flex h-16 items-center border-b px-6">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </aside>
  ),
  ssr: false,
});

export function LazySidebar() {
  return <Sidebar />;
}
