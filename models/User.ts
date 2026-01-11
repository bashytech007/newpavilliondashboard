import { UserWithPassword as IUser } from "@/interfaces";
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: String,
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>("User", UserSchema);
