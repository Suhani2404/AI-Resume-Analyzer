const fs = require("fs");
const pdfParse = require("pdf-parse");

const uploadResume = async (req, res) => {

  try {

    // File path
    const filePath = req.file.path;

    // Read PDF file
    const dataBuffer = fs.readFileSync(filePath);

    // Extract text from PDF
    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text;

    // Skills list
    const skills = [
      "java",
      "python",
      "javascript",
      "react",
      "node",
      "mongodb",
      "html",
      "css",
      "sql",
      "express",
    ];

    // Detect skills
    const foundSkills = [];
    const missingSkills = [];

    skills.forEach((skill) => {

      if (
        resumeText.toLowerCase().includes(skill)
      ) {

        foundSkills.push(skill);

      } else {

        missingSkills.push(skill);

      }

    });

    // ATS Score
    const atsScore = foundSkills.length * 10;

    // AI Suggestions (Static)
    let aiSuggestions = `
1. Add more technical projects.

2. Improve resume summary section.

3. Include internships and achievements.

4. Add backend and database skills.

5. Use better action words in experience.
`;

    // Send Response
    res.json({

      message:
        "Resume uploaded and analyzed successfully",

      text: resumeText,

      atsScore: atsScore,

      skills: foundSkills,

      missingSkills: missingSkills,

      aiSuggestions: aiSuggestions,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error parsing resume",
    });
  }
};

module.exports = {
  uploadResume,
};