"use client";

import React, { Suspense } from "react";

// Lazy load the named export 'Overview' by converting it to a default export
const Overview = React.lazy(() =>
  import("./overview").then((module) => ({ default: module.Overview }))
);

export function LazyOverview() {
  return (
    <Suspense
      fallback={
        <div className="h-[350px] w-full bg-slate-200/20 dark:bg-slate-700/50 animate-pulse rounded-md" />
      }
    >
      <Overview />
    </Suspense>
  );
}
