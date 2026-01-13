"use client";

import { useEffect, useState } from "react";

export function Greeting({ userName }: { userName: string }) {
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon");
    } else if (hour >= 17) {
      setGreeting("Good evening");
    }
  }, []);

  return (
    <div className="block">
      <h2 className="text-sm md:text-xl font-semibold text-primary truncate max-w-[200px] md:max-w-none">
        {greeting}, {userName}
      </h2>
    </div>
  );
}
