"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  BookOpen,
  Menu,
  ChevronLeft,
  Briefcase,
  Search,
  LogOut,
} from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { signOut } from "@/auth";
import { logOut } from "@/lib/actions";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Case Management",
    href: "/cases",
    icon: Briefcase,
  },
  {
    title: "Research",
    href: "/research",
    icon: Search,
  },
  {
    title: "Team",
    href: "/team",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

import { useSidebar } from "@/components/providers/sidebar-provider";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar, setCollapsed } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  // We only mount the mobile Sheet on the client to avoid hydration errors
  // The Desktop sidebar renders normally (SSR compatible)
  const mobileSidebar = isMounted ? (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden fixed top-3 left-4 z-40"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>
            <div className="flex items-center gap-2 font-bold text-xl text-primary">
              <Image
                src="/lawpavillionlogo.svg"
                alt="LawPavillion"
                width={146}
                height={21}
                priority
                className="dark:invert dark:hue-rotate-180"
              />
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col py-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
                pathname === item.href
                  ? "border-r-4 border-primary bg-muted text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
          <Separator className="my-2" />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex w-full items-center gap-3 px-6 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
                <LogOut className="h-5 w-5" />
                Log out
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will need to sign in again to access your dashboard.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={async () => {
                    await logOut();
                  }}
                >
                  Log out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SheetContent>
    </Sheet>
  ) : null;

  return (
    <>
      {/* Mobile Sidebar */}
      {mobileSidebar}

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden border-r bg-card transition-all duration-300 lg:flex lg:flex-col",
          isCollapsed ? "w-[80px]" : "w-[280px]",
          className
        )}
      >
        <div className={cn("flex h-16 items-center border-b px-4", isCollapsed ? "justify-center" : "justify-between")}>
          {!isCollapsed && (
            <Image
              src="/lawpavillionlogo.svg"
              alt="LawPavillion"
              width={120}
              height={18}
              priority
              className="dark:invert dark:hue-rotate-180"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", isCollapsed ? "mx-auto" : "")}
            onClick={toggleSidebar}
            title={isCollapsed ? "Expand" : "Collapse"}
          >
             {isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="grid gap-1 px-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setCollapsed(true)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : "text-muted-foreground",
                  isCollapsed && "justify-center px-2"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>


      </aside>
    </>
  );
}
