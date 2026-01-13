import mongoose, { Schema, model, models } from "mongoose";

const CaseSchema = new Schema(
  {
    title: { type: String, required: true },
    caseNumber: { type: String, required: true },
    status: {
      type: String,
      enum: ["Active", "Closed", "Pending"],
      default: "Active",
    },
    clientName: { type: String, required: true },
    description: String,
  },
  { timestamps: true }
);

export const Case = models.Case || model("Case", CaseSchema);
