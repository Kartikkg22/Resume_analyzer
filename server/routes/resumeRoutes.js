import express from "express";
import multer from "multer";
import Resume from "../models/Resume.js";
const router = express.Router();

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload resume
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const resume = new Resume({
      filename: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    await resume.save();
    res.json({ message: "Resume uploaded successfully", resumeId: resume._id });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

// Get resume by ID
router.get("/:id", async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: "Resume not found" });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: "Error fetching resume" });
  }
});

// Delete resume
router.delete("/:id", async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting resume" });
  }
});

export default router;
