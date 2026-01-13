import { Metadata } from "next";
import { DashboardClientWrapper } from "@/components/dashboard-client-wrapper";
import { getCaseCount } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Dashboard - LawPavillion",
  description: "Legal Research Dashboard",
};

export default async function DashboardPage() {
  const activeCases = await getCaseCount();
  
  // Artificial delay to demonstrate skeleton loader (optional, kept for effect)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return <DashboardClientWrapper activeCases={activeCases} />;
}
