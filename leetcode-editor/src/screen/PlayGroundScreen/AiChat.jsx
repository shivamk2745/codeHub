import React, { useState, useContext } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { QuestionContext } from "./QuestionProvider";

const AiChat = ({ editorCode, mode }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log(apiKey);

  const genAI = new GoogleGenerativeAI(apiKey);
  const [aiResponse, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { questionDesc, examples } = useContext(QuestionContext);

  const generatePrompt = () => {
    let prompt = "";
    switch (mode) {
      case "mistake":
        prompt = `Analyze the following code and find mistakes: \n\nCode: ${editorCode}\n\nProblem Description: ${questionDesc}\n\ninput: ${examples[0].input}\n\noutput: ${examples[0].output}`;
        break;
      case "hint":
        prompt = `Provide hints for solving the following problem: \n\nProblem Description: ${questionDesc}\n\nCode: ${editorCode}\n\nNote:Hint should be in a form that make the user force to thing in more deeply to solve the problem dont directly provide solution/n/nNOTE IMPORTANT:first provide hints related to code deeply analysis the provided code`;
        break;
      case "explanation":
        prompt = `Act like a teacher and explain the problem statement in detail to the student: \n\nProblem Description: ${questionDesc}\n\ninput: ${examples[0].input}\n\noutput: ${examples[0].output}\n\nNote:please dont include any kind of additional information,greeting etc`;
        break;
      default:
        prompt = "Please select a valid mode.";
    }
    return prompt;
  };

  async function aiRun() {
    setLoading(true);
    setResponse("");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = generatePrompt();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Format the response for better readability
    const formattedText = formatResponse(text);

    setResponse(formattedText);
    setLoading(false);
  }

  const handleClick = () => {
    aiRun();
  };

  // Helper function to format the AI response
  const formatResponse = (text) => {
    // Replace newlines with <br/> for line breaks
    let formatted = text.replace(/\n/g, "<br />");

    // Optional: You can replace specific patterns like "Code: ..." or numbered lists to use <strong> or <pre> tags
    formatted = formatted.replace(/Code:/g, "<strong>Code:</strong>");

    // Optionally wrap code blocks in <pre><code> for better formatting
    formatted = formatted.replace(
      /```([^`]+)```/g,
      "<pre><code>$1</code></pre>"
    );

    return formatted;
  };

  return (
    <div className="input">
      <div style={{ display: "flex" }}>
        <button style={{ marginLeft: "20px" }} onClick={handleClick}>
          Search
        </button>
      </div>

      {loading ? (
        <p style={{ margin: "30px 0" }}>Loading ...</p>
      ) : (
        <div style={{ margin: "30px 0" }}>
          {/* Render formatted response */}
          <div
            dangerouslySetInnerHTML={{ __html: aiResponse }}
            style={{
              backgroundColor: "#f8f8f8",
              padding: "10px",
              borderRadius: "5px",
              lineHeight: "1.6",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AiChat;
