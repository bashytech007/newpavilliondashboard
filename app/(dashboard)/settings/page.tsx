import { auth } from "@/auth";
import { SettingsForm } from "@/components/settings-form";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your profile, preferences, and account settings.",
};

export default async function SettingsPage() {
  const session = await auth();
  
  // Artificial delay to demonstrate skeleton loader
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock data/fallback if session is missing for dev
  const user = {
    name: session?.user?.name || "Chukwudi Lawal",
    email: session?.user?.email || "lawyer@lawpavillion.com",
    image: session?.user?.image || null,
    role: "Senior Associate", // Hardcoded mock role as requested in the "mock user" context
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator />
      
      <SettingsForm user={user} />
    </div>
  );
}
