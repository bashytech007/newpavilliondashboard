import { Metadata } from "next";
import { DashboardClientWrapper } from "@/components/dashboard-client-wrapper";

export const metadata: Metadata = {
  title: "Dashboard - LawPavillion",
  description: "Legal Research Dashboard",
};

export default function DashboardPage() {
  return <DashboardClientWrapper />;
}
