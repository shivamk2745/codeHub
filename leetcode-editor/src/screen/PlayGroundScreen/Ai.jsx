import "./Ai.scss";
import React, { useState, useContext } from "react";
import { QuestionContext } from "./QuestionProvider";
import AiChat from "./AiChat";
const Ai = ({ editorCode }) => {
  const [aiMode, setAiMode] = useState(false);
  const [mode, setMode] = useState("");
  const handleMistake = (e) => {
    setMode("mistake");
    setAiMode(!aiMode);
  };
  const handleHint = (e) => {
    setMode("hint");
    setAiMode(!aiMode);
  };
  const handleExplain = (e) => {
    setMode("explanation"); 
    setAiMode(!aiMode);
  };
  // const { questionDesc, examples } = useContext(QuestionContext);
  // console.log(questionDesc);

  return (
    <>
      {aiMode ? (
        <AiChat editorCode={editorCode} mode={mode} />
      ) : (
        <div className="input">
          <div className="ai-container">
            <h2 className="ai-header">Chat with AI</h2>
            <p className="subtitle">Pick any one of the chat mode</p>
            <div className="chat-modes">
              <div className="mode-card" onClick={handleMistake}>
                <div className="icon">🔍</div>
                <p>Find Mistake</p>
              </div>
              <div className="mode-card" onClick={handleHint}>
                <div className="icon">💡</div>
                <p>Give Hints</p>
              </div>
              <div className="mode-card" onClick={handleExplain}>
                <div className="icon">💬</div>
                <p>Explain Question</p>
              </div>
            </div>
            <div className="examples">
              <p className="description">
                Our AI already has knowledge about the problem and your
                solution. You can start asking questions right away.
              </p>
              <br></br>
              <p className="description">Examples:</p>
              <br></br>
              <p>What are the pre-requisites to solve the problem?</p>
              <p>Provide me hints to solve the problem?</p>
              <p>Help me debug my code</p>
              <p>Help me understand the problem</p>
              <p>Help me understand the solution</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Ai;
