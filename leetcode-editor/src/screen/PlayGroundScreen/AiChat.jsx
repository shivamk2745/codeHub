import React, { useState, useContext } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { QuestionContext } from "./QuestionProvider";
import "./AiChat.scss";
// import { Ai } from "./public/images/Ai.jpg";
const AiChat = ({ editorCode, mode }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log(apiKey);

  const genAI = new GoogleGenerativeAI(apiKey);
  const [aiResponse, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [center, setCenter] = useState(true);
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
    // console.log(text);

    const text = response.text();

    // Format the response for better readability
    const formattedText = formatResponse(text);

    setResponse(formattedText);
    setLoading(false);
    setCenter(false);
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
      <div className="aicontainer">
        <div className="response">
          {loading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="response-ai">
              {center ? (
                <div className="centeral-text">
                  <div className="image-container">
                    <img
                      src="https://media.ahmedabadmirror.com/am/uploads/mediaGallery/image/1724872805696.jpg-org "
                      alt=""
                    />
                    <h2>Make Use Of Our Ai-Assitant</h2>
                  </div>
                  <p>
                    Our AI already has knowledge about the problem and your
                    solution. You can start asking questions right away.
                  </p>
                  <ul className="rule">
                    <li>
                      Avoid distractions while working on problems to enhance
                      productivity and accuracy
                    </li>
                    <li>
                      Don't hesitate to collaborate with peers or ask for help
                      when stuck.
                    </li>
                    <li>
                      Always read the problem thoroughly and plan your solution
                      before jumping into coding.
                    </li>
                    <li>
                      Test your code with various inputs, including edge cases,
                      before submitting or sharing
                    </li>
                  </ul>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: aiResponse }} />
              )}
            </div>
          )}
          {/* {loading && (
            
          )} */}
        </div>
        <div className="button-div">
          <button onClick={handleClick} className="btn">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
