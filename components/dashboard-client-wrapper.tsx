"use client";

import dynamic from "next/dynamic";
import DashboardLoading from "@/app/(dashboard)/loading";

// Client-side lazy load to force skeleton display
const DashboardContent = dynamic(
  () => import("./dashboard-content").then((mod) => mod.DashboardContent),
  {
    ssr: false,
    loading: () => <DashboardLoading />,
  }
);

export function DashboardClientWrapper() {
  return <DashboardContent />;
}
