"use server";
import { auth, signIn, signOut } from "@/auth";
import { Theme, User as IUser, UserWithPassword } from "@/interfaces";
import { AuthError } from "next-auth";
import { connectDB } from "./mongoose";
import { User } from "@/models/User";
import { z } from "zod";
import bcrypt from "bcrypt";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const logOut = async () => {
  "use server";
  await signOut({ redirectTo: "/" });
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

async function createUser(
  data: Omit<UserWithPassword, "id">
): Promise<typeof User> {
  await connectDB();
  const userExists = await User.findOne({ email: data.email.toLowerCase() });
  if (!!userExists?.email) {
    throw new Error("Email already in use");
  }

  return await User.create({
    email: data.email.toLowerCase(),
    password: data.password,
    name: data.name,
    role: data?.role || "user",
  });
}

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const role = formData.get("role") ?? "";
    const parsedData = z
      .object({
        email: z.email(),
        password: z.string().min(6),
        name: z.string().min(3),
        role: z.string(),
      })
      .safeParse({ email, password, name, role });

    if (parsedData.success) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(parsedData.data.password, salt);
      const user = await createUser({
        ...parsedData.data,
        password: hashedPassword,
      });
      if (!user) {
        return "Registration Failed";
      }
      await signIn("credentials", { email, password, redirectTo: "/" });
    } else {
      // RETURN PROPER ERROR MESSAGE TO USER
      return "Registration Failed";
    }
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return (error as any)?.message || "Error occured";
  }
}

export async function updateTheme(theme: Theme) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await connectDB();
  await User.findByIdAndUpdate(session.user.id, {
    theme,
  });
}

export async function getTheme() {
  const session = await auth();
  if (!!session?.user) {
    try {
      await connectDB();
      const user = (await User.findById(session.user.id).lean()) as IUser;
      return user?.theme ?? "system";
    } catch (error) {
      console.error(error);
    }
  }
}
