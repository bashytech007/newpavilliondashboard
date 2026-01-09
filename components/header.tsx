"use client"

import { useAuth } from "@/lib/auth-context"
import { useTheme } from "next-themes"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Moon, Sun, User } from "lucide-react"

export function Header() {
  const { user, logout } = useAuth()
  const { setTheme } = useTheme()

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-6 lg:px-10 shadow-sm">
        <div className="flex-1">
             <h1 className="text-lg font-semibold md:text-xl">Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme("light")} className="hidden dark:inline-flex">
                <Sun className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setTheme("dark")} className="inline-flex dark:hidden">
                <Moon className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar>
                            <AvatarImage src={user?.avatar} alt={user?.name} />
                            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user?.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
  )
}
