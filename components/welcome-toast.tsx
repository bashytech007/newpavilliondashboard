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
    const signup = searchParams.get("signup");
    const login = searchParams.get("login");
    // Handle legacy welcome param if any
    const welcome = searchParams.get("welcome"); 

    // Prevent double toast on React Strict Mode re-renders
    if ((signup || login || welcome) && !hasShownToast.current) {
      hasShownToast.current = true;
      
      let message = "";
      

      if (signup) {
        message = `Welcome ${userName}`;
      } else if (login) {
        message = `Welcome back, ${userName}`;
      } else {
        // Fallback or generic welcome query
        message = `Welcome back, ${userName}`;
      }

      toast.success(message, {
        style: {
          backgroundColor: "#22c55e", 
          color: "#ffffff",
          border: "none",
        },
        duration: 4000,
      });

      // Remove the query params cleanly
      const params = new URLSearchParams(searchParams.toString());
      params.delete("signup");
      params.delete("login");
      params.delete("welcome");
      
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, userName, router, pathname]);

  return null;
}
