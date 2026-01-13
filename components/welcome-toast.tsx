"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function WelcomeToast({ userName }: { userName: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const hasShownToast = useRef(false);

  useEffect(() => {
    const welcome = searchParams.get("welcome");
    
    // Prevent double toast on React Strict Mode re-renders
    if (welcome && !hasShownToast.current) {
      hasShownToast.current = true;
      
      toast.success(`Welcome back, ${userName}!`, {
        style: {
          backgroundColor: "#22c55e", 
          color: "#ffffff",
          border: "none",
        },
        duration: 4000,
      });

      // Remove the query param cleanly
      const params = new URLSearchParams(searchParams.toString());
      params.delete("welcome");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, userName, router, pathname]);

  return null;
}
