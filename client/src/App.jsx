import { useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [atsScore, setAtsScore] = useState(0);
  const [skills, setSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  // File Select
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

      setLoading(true);

      const res = await axios.post(

        "https://ai-resume-analyzer-2-1ne2.onrender.com/api/resume/upload",

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
      setMissingSkills(res.data.missingSkills);
      setAiSuggestions(res.data.aiSuggestions);

    } catch (error) {

      console.log(error);
      setMessage("Upload failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-black text-white flex flex-col items-center p-10">

      {/* Heading */}
      <h1 className="text-5xl font-bold mb-10 text-center">
        AI Resume Analyzer
      </h1>

      {/* Upload Box */}
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg flex flex-col items-center gap-5 w-[500px]">

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="bg-white text-black p-3 rounded-lg w-full"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 w-full text-lg font-semibold"
        >

          {loading ? "Uploading..." : "Upload Resume"}

        </button>

        {message && (

          <p className="text-green-400 font-semibold text-center">
            {message}
          </p>

        )}

      </div>

      {/* ATS Score */}
      {atsScore > 0 && (

        <div className="bg-green-700 px-8 py-5 rounded-2xl mt-8 shadow-lg">

          <h2 className="text-3xl font-bold text-center">
            ATS Score: {atsScore}/100
          </h2>

        </div>

      )}

      {/* Detected Skills */}
      {skills.length > 0 && (

        <div className="bg-gray-900 p-6 rounded-2xl mt-8 w-[700px] shadow-lg">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Detected Skills
          </h2>

          <div className="flex flex-wrap gap-4 justify-center">

            {skills.map((skill, index) => (

              <div
                key={index}
                className="bg-blue-600 px-5 py-2 rounded-full text-lg font-medium"
              >
                {skill}
              </div>

            ))}

          </div>

        </div>

      )}

      {/* Missing Skills */}
      {missingSkills.length > 0 && (

        <div className="bg-gray-900 p-6 rounded-2xl mt-8 w-[700px] shadow-lg">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Missing Skills
          </h2>

          <div className="flex flex-wrap gap-4 justify-center">

            {missingSkills.map((skill, index) => (

              <div
                key={index}
                className="bg-red-600 px-5 py-2 rounded-full text-lg font-medium"
              >
                {skill}
              </div>

            ))}

          </div>

        </div>

      )}

      {/* AI Suggestions */}
      {aiSuggestions && (

        <div className="bg-gray-900 p-6 rounded-2xl mt-8 w-[700px] shadow-lg">

          <h2 className="text-3xl font-bold mb-6 text-center">
            AI Suggestions
          </h2>

          <pre className="whitespace-pre-wrap leading-8 text-gray-300 text-base">
            {aiSuggestions}
          </pre>

        </div>

      )}

      {/* Resume Text */}
      {resumeText && (

        <div className="bg-gray-900 p-6 rounded-2xl mt-8 w-[700px] shadow-lg">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Extracted Resume Text
          </h2>

          <div className="bg-black p-5 rounded-xl max-h-[400px] overflow-y-auto">

            <pre className="text-sm whitespace-pre-wrap leading-7 text-gray-300">
              {resumeText}
            </pre>

          </div>

        </div>

      )}

    </div>

  );

}

export default App;