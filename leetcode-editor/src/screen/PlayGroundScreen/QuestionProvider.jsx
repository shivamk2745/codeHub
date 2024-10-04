import React, { createContext, useState, useEffect } from "react";
import data from "./data.json";
import { useParams } from "react-router-dom";

// Create a context
export const QuestionContext = createContext();

// Context provider component
export const QuestionProvider = ({ children }) => {
  const { fileId, folderId, fileName } = useParams();
  const [questionDesc, setQuestionDesc] = useState("");
  const [question, setQuestion] = useState(null);
  const [examples, setExamples] = useState([]); 

  useEffect(() => {
    // console.log("FileName from URL:", fileName);
    const foundQuestion = data.find((file) => file.fileName === fileName);
    // console.log("sdfs");

    if (foundQuestion) {
      setQuestionDesc(foundQuestion.descriptions);
      setExamples(foundQuestion.examples);
      setQuestion(foundQuestion);
    }
  }, [fileName]);

  return (
    <QuestionContext.Provider
      value={{ questionDesc, question, examples }} 
    >
      {children}
    </QuestionContext.Provider>
  );
};
