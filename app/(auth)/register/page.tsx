"use client";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { register } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, formAction, isPending] = useActionState(
    register,
    undefined
  );

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">LawPavillion</CardTitle>
        <CardDescription>
          Welcome to LawPavillon, complete below form to get started.
        </CardDescription>
      </CardHeader>

      <form action={formAction}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Username</Label>
            <Input
              id="name"
              type="name"
              name="name"
              placeholder="JSmith"
              required
            />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={4}
            />
          </div>
        </CardContent>

        <CardFooter>
          <div className="w-full">
            <Button type="submit" className="w-full" aria-disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            {errorMessage && (
              <p className="text-sm pt-3 text-red-500">{errorMessage}</p>
            )}
            <p className="pt-4">
              Already Registered?{" "}
              <Link href={"/login"} className="text-orange-400">
                Login Here
              </Link>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
