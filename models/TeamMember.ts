import mongoose, { Schema, model, models } from "mongoose";

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "Member" },
    image: String,
  },
  { timestamps: true }
);

export const TeamMember = models.TeamMember || model("TeamMember", TeamMemberSchema);
