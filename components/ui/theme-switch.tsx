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

export function ThemeSwitcher() {
  const { setTheme } = useTheme();

  async function changeTheme(theme: Theme) {
    setTheme(theme);
    await updateTheme(theme);
  }

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative">
            Theme
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
            Light <Sun />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => changeTheme("dark")}
            className="flex justify-between hover:opacity-85"
          >
            Dark <Moon />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => changeTheme("system")}
            className="flex justify-between hover:opacity-85"
          >
            System
            <Laptop />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
