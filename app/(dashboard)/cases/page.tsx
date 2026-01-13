import { getCases } from "@/lib/actions";
import { CasesView } from "@/components/cases-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cases",
  description: "View and manage your current legal cases and briefs.",
};

export default async function CaseManagementPage() {
  const cases = await getCases();
  return <CasesView cases={cases} />;
}
