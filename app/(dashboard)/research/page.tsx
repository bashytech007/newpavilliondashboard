import { PlaceholderPage } from "@/components/placeholder-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research - LawPavillion",
};

export default function ResearchPage() {
  return (
    <PlaceholderPage
      title="Legal Research"
      description="Access our comprehensive legal database and AI-powered research tools. Coming soon."
    />
  );
}
