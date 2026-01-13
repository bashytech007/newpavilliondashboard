import { PlaceholderPage } from "@/components/placeholder-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Management - LawPavillion",
};

export default function CaseManagementPage() {
  return (
    <PlaceholderPage
      title="Case Management"
      description="Manage your cases, documents, and clients in one place. This module is coming soon."
    />
  );
}
