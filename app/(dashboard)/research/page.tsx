import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Research",
  description: "AI-powered legal research and database access.",
};

export default function ResearchPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-center">
      <div className="rounded-full bg-muted p-4">
        <Clock className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight">Coming Soon</h1>
      <p className="max-w-[600px] text-muted-foreground">
        We are working hard to bring you comprehensive legal database and AI-powered research tools. 
        Stay tuned for updates!
      </p>
      <Button asChild className="mt-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>
    </div>
  );
}
