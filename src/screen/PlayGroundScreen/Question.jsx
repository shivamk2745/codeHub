import React from "react";
import "./question.scss";
import data from "./data.json";
import { useParams } from "react-router-dom";

const Question = () => {
  const { fileId, folderId, fileName } = useParams();

  // Log the fileName received from URL params
  console.log("FileName from URL:", fileName);

  // Find the question object based on fileName
  const question = data.find((file) => file.fileName === fileName);

  // Log the question object found
  console.log("Found question:", question);

  return (
    <>
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
            <p>{question ? question.descriptions : "No Description"}</p>
          </div>

          <div className="parent-question">
            {question &&
              question.examples.map((example, index) => (
                <div key={index} className="q-example">
                  <h2 className="q-input-title">Example {index + 1}</h2>
                  <div className="q-actual-input">
                    <p>
                      <strong className="strong">Input:</strong> {example.input}
                    </p>
                  </div>
                  <div className="q-actual-input">
                    <p>
                      <strong className="strong">Output:</strong>{" "}
                      {example.output}
                    </p>
                  </div>
                  <div className="q-actual-input">
                    <p>
                      <strong className="strong">Explanation:</strong>{" "}
                      {example.explanation}
                    </p>
                  </div>
                </div>
              ))}
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
                : "No Constraints"}
            </p>
          </div>
          <div className="q-company">
            <h2>Companys</h2>
            <div className="company">
              <span>{question ? question.company[0] : "No Company"}</span>
              <span>{question ? question.company[1] : "No Company"}</span>
              <span>{question ? question.company[2] : "No Company"}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
