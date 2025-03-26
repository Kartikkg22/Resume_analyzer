import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
  contentType: String,
});

export const Resume = mongoose.model("Resume", ResumeSchema);
