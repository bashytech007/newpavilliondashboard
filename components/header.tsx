import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { auth } from "@/auth";
import { ThemeSwitcher } from "./ui/theme-switch";
import { UserNav } from "./user-nav";

export async function Header() {
  const session = await auth();

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-6 lg:px-10 shadow-sm">
      <div className="flex-1">
        {/* <h1 className="text-lg font-semibold md:text-xl">Dashboard</h1> */}
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <UserNav user={session?.user || {}} />
      </div>
    </header>
  );
}
