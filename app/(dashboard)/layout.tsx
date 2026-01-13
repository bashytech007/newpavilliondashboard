import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

import { WelcomeToast } from "@/components/welcome-toast";
import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <WelcomeToast userName={session?.user?.name || "User"} />
          {children}
        </main>
      </div>
    </div>
  );
}
