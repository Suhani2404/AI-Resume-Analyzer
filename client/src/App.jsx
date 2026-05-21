import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [atsScore, setAtsScore] = useState(0);
  const [skills, setSkills] = useState([]);

  // File select
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload Resume
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "https://ai-resume-backend-ler8.onrender.com/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message);
      setResumeText(res.data.text);
      setAtsScore(res.data.atsScore);
      setSkills(res.data.skills);

    } catch (error) {
      console.log(error);
      setMessage("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-10">

      <h1 className="text-5xl font-bold mb-10 text-center">
        AI Resume Analyzer
      </h1>

      {/* Upload Box */}
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg flex flex-col items-center gap-5 w-[500px]">

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="bg-white text-black p-2 rounded w-full"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 w-full"
        >
          Upload Resume
        </button>

        {message && (
          <p className="text-green-400 font-semibold">
            {message}
          </p>
        )}

      </div>

      {/* ATS Score */}
      {atsScore > 0 && (
        <div className="bg-green-700 px-8 py-4 rounded-xl mt-8">
          <h2 className="text-3xl font-bold">
            ATS Score: {atsScore}/100
          </h2>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="bg-gray-900 p-6 rounded-2xl mt-8 w-[700px]">
          <h2 className="text-3xl font-bold mb-5">
            Detected Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-600 px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Resume Text */}
      {resumeText && (
        <div className="bg-gray-900 p-6 rounded-2xl mt-8 w-[700px] max-h-[400px] overflow-y-auto">
          <h2 className="text-3xl font-bold mb-5">
            Extracted Resume Text
          </h2>

          <p className="text-sm whitespace-pre-wrap leading-7">
            {resumeText}
          </p>
        </div>
      )}

    </div>
  );
}

export default App;