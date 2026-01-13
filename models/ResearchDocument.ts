import mongoose from "mongoose";

const ResearchDocumentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true }, // e.g., Case Law, Article
    source: { type: String, required: true },
    summary: { type: String, required: true },
    url: { type: String }, // Optional external link
    publicationDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ResearchDocument =
  mongoose.models.ResearchDocument ||
  mongoose.model("ResearchDocument", ResearchDocumentSchema);
