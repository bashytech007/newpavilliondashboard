"use client";

import { updateTheme } from "@/lib/actions";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { Theme } from "@/interfaces";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" className="relative" disabled>
        Theme
      </Button>
    );
  }

  async function changeTheme(theme: Theme) {
    setTheme(theme);
    await updateTheme(theme);
  }

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-40" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">Choose Theme</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => changeTheme("light")}
            className="flex justify-between hover:opacity-85"
          >
            Light <Sun className="h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => changeTheme("dark")}
            className="flex justify-between hover:opacity-85"
          >
            Dark <Moon className="h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => changeTheme("system")}
            className="flex justify-between hover:opacity-85"
          >
            System
            <Laptop className="h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
