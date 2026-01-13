import { Metadata } from "next";
import { DashboardClientWrapper } from "@/components/dashboard-client-wrapper";
import { getCaseCount, getResearchCount } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Dashboard - LawPavillion",
  description: "Legal Research Dashboard",
};

export default async function DashboardPage() {
  const activeCases = await getCaseCount();
  const researchCount = await getResearchCount();
  
  // Artificial delay to demonstrate skeleton loader (optional, kept for effect)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return <DashboardClientWrapper activeCases={activeCases} researchCount={researchCount} />;
}
