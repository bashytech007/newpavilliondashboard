import { getTeamMembers } from "@/lib/actions";
import { TeamView } from "@/components/team-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description: "Manage your legal team members and permissions.",
};

export default async function TeamPage() {
  const members = await getTeamMembers();
  return <TeamView members={members || []} />;
}
