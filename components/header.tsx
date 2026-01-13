import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { auth } from "@/auth";
import { ThemeSwitcher } from "./ui/theme-switch";
import { UserNav } from "./user-nav";
import { Greeting } from "@/components/greeting";
import { LogoutButton } from "@/components/logout-button";

export async function Header() {
  const session = await auth();

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-6 lg:px-10 shadow-sm transition-all duration-300">
      <div className="flex-1">
        {session?.user?.name && <Greeting userName={session.user.name} />}
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <LogoutButton />
        <UserNav user={session?.user || {}} />
      </div>
    </header>
  );
}
