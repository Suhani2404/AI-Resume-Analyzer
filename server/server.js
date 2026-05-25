const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const resumeRoutes = require("./routes/resumeRoutes");

app.use("/api/resume", resumeRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("AI Resume Analyzer Backend Running");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});