"use server";
import { auth, signIn, signOut } from "@/auth";
import { Theme, User as IUser, UserWithPassword } from "@/interfaces";
import { AuthError } from "next-auth";
import { connectDB } from "./mongoose";
import { User } from "@/models/User";
import { Case } from "@/models/Case";
import { TeamMember } from "@/models/TeamMember";
import { ResearchDocument } from "@/models/ResearchDocument";
import { revalidatePath } from "next/cache";
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
    await signIn("credentials", { ...Object.fromEntries(formData), redirectTo: "/?login=true" });
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
      await signIn("credentials", { email, password, redirectTo: "/?signup=true" });
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

export async function createCase(formData: FormData) {
  try {
    await connectDB();
    const title = formData.get("title");
    const clientName = formData.get("clientName");
    const caseNumber = formData.get("caseNumber");
    const status = formData.get("status") || "Active";

    if (!title || !clientName || !caseNumber) {
      throw new Error("Missing required fields");
    }

    await Case.create({
      title,
      clientName,
      caseNumber,
      status,
    });
    
    revalidatePath("/cases");
    revalidatePath("/"); // Update dashboard too
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create case" };
  }
}

export async function getCases() {
  try {
    await connectDB();
    const cases = await Case.find().sort({ createdAt: -1 }).lean();
    // Convert _id to string for serialization
    return cases.map((c: any) => ({ ...c, _id: c._id.toString() }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createTeamMember(formData: FormData) {
  try {
    await connectDB();
    const name = formData.get("name");
    const email = formData.get("email");
    const role = formData.get("role") || "Member";
    // For profile picture, we might just store a URL or generate one if not provided
    // Since we don't have file upload set up, we'll assume a URL or use a placeholder logic in the UI
    const image = formData.get("image") || ""; 

    if (!name || !email) {
      throw new Error("Missing required fields");
    }

    await TeamMember.create({
      name,
      email,
      role,
      image,
    });

    revalidatePath("/team");
    return { success: true };
  } catch (error) {
    console.error("Error creating team member:", error);
    return { error: "Failed to create team member" };
  }
}

export async function getTeamMembers() {
  try {
    await connectDB();
    const members = await TeamMember.find().sort({ createdAt: -1 }).lean();
    return members.map((m: any) => ({ ...m, _id: m._id.toString() }));
  } catch (error) {
    console.error(error);
  }
}

export async function getCaseCount() {
  try {
    await connectDB();
    return await Case.countDocuments({ status: "Active" });
  } catch (error) {
    console.error(error);
    return 0;
  }
}


// Research Actions
export async function createResearchDocument(formData: FormData) {
  try {
    await connectDB();
    const title = formData.get("title");
    const type = formData.get("type");
    const source = formData.get("source");
    const summary = formData.get("summary");
    const url = formData.get("url");

    await ResearchDocument.create({
      title,
      type,
      source,
      summary,
      url,
    });

    revalidatePath("/research");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create research document!");
  }
}

export async function getResearchDocuments(query: string = "") {
  try {
    await connectDB();
    const regex = new RegExp(query, "i");
    const documents = await ResearchDocument.find({
      $or: [{ title: { $regex: regex } }, { summary: { $regex: regex } }],
    }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(documents));
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch research documents!");
  }
}

export async function getResearchCount() {
    try {
        await connectDB();
        const count = await ResearchDocument.countDocuments();
        return count;
    } catch (err) {
        console.log(err);
        return 0;
    }
}
