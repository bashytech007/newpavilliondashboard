import { PlaceholderPage } from "@/components/placeholder-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team - LawPavillion",
};

export default function TeamPage() {
  return (
    <PlaceholderPage
      title="Team Management"
      description="Collaborate with your team, assign roles, and track performance. Coming soon."
    />
  );
}
