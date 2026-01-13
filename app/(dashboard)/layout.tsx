import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { SidebarProvider } from "@/components/providers/sidebar-provider";
import { DashboardLayoutClient } from "@/components/dashboard-layout-client";

import { WelcomeToast } from "@/components/welcome-toast";
import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  return (
    <SidebarProvider>
      <DashboardLayoutClient sidebar={<Sidebar />}>
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-auto">
            <WelcomeToast userName={session?.user?.name || "User"} />
            {children}
          </main>
      </DashboardLayoutClient>
    </SidebarProvider>
  );
}
