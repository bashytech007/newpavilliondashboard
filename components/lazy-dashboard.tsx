"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import DashboardLoading from "@/app/(dashboard)/loading";

const DashboardContent = dynamic(
  () => import("./dashboard-content").then((mod) => ({ default: mod.DashboardContent })),
  {
    ssr: false,
  }
);

export function LazyDashboard() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
