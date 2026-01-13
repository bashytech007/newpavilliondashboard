import { Metadata } from "next";
import { DashboardClientWrapper } from "@/components/dashboard-client-wrapper";

export const metadata: Metadata = {
  title: "Dashboard - LawPavillion",
  description: "Legal Research Dashboard",
};

export default async function DashboardPage() {
  // Artificial delay to demonstrate skeleton loader
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  return <DashboardClientWrapper />;
}
