import React, { useContext } from "react";
import { QuestionContext } from "./QuestionProvider";
import "./question.scss";

const Question = () => {
  // Access the context values
  const { questionDesc, question, examples } = useContext(QuestionContext);

  return (
    <div className="input">
      <div className="question">
        <div className="q-title">
          <h2>{question ? question.fileName : "No Title"}</h2>
        </div>

        <div className="q-level">
          <span>{question ? question.topic : "No Topic"}</span>
          <span>{question ? question.difficulty : "No Difficulty"}</span>
        </div>

        <div className="q-question">
          <p>{questionDesc}</p>
        </div>

        <div className="parent-question">
          {examples && examples.length > 0 ? (
            examples.map((example, index) => (
              <div key={index} className="q-example">
                <h2 className="q-input-title">Example {index + 1}</h2>
                <div className="q-actual-input">
                  <p>
                    <strong className="strong">Input:</strong> {example.input}
                  </p>
                </div>
                <div className="q-actual-input">
                  <p>
                    <strong className="strong">Output:</strong> {example.output}
                  </p>
                </div>
                <div className="q-actual-input">
                  <p>
                    <strong className="strong">Explanation:</strong>{" "}
                    {example.explanation}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No examples available.</p>
          )}
        </div>

        <div className="q-constraints">
          <h2>Constraints</h2>
          <p>{question ? question.constraint : "No Constraints"}</p>
        </div>

        <div className="q-complexity">
          <h2>Expected Complexity</h2>
          <p>
            {question
              ? `Time: ${question.time}, Space: ${question.space}`
              : "No Complexity Information"}
          </p>
        </div>

        <div className="q-company">
          <h2>Companies</h2>
          <div className="company">
            {question && question.company
              ? question.company.map((comp, idx) => (
                  <span key={idx}>{comp}</span>
                ))
              : "No Company Information"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
