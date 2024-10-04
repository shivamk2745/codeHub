import { useParams } from "react-router-dom";
import "./index.scss";
import EditorPage from "./EditorPage";
import { useCallback, useState } from "react";
import { createSubmission } from "./judge";
import Import from "./Import";
import Ai from "./Ai";
import Question from "./Question";
import { QuestionProvider } from "./QuestionProvider";
const Playground = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [editorCode, setEditorCode] = useState("");
  const param = useParams();
  const { fileId, folderId, fileName } = param;
  // console.log(fileName);

  // console.log(param);
  const [loader, setLoader] = useState(false);
  const [magic, setMagic] = useState(false);
  const callback = ({ apiStatus, data, message }) => {
    console.log(data);

    if (apiStatus === "loading") {
      setLoader(true);
    } else {
      setLoader(false);
      if (data.status.id === 3) {
        console.log(data.stderr);
        setOutput(atob(data.stdout));
      } else {
        setOutput(atob(data.stderr));
      }
    }
  };

  const submitCode = useCallback(
    ({ code, language }) => {
      createSubmission({ code, language, stdin: input, callback });

      console.log(code);
    },
    [input]
  );

  return (
    <QuestionProvider>
      <div className="outer-container">
        <div className="playground-container">
          <div className="container-header">
            <img src="/logo.png" alt="logo" />
            <b>Code Online</b>
          </div>
          <div className="container-body">
            <div className="editor">
              <EditorPage
                fileId={fileId}
                folderId={folderId}
                submitCode={submitCode}
                setMagic={setMagic}
                magic={magic}
                input={input}
                setInput={setInput}
                output={output}
                setOutput={setOutput}
                editorCode={editorCode}
                setEditorCode={setEditorCode}
              />
            </div>
            {magic ? (
              <Ai editorCode={editorCode} />
            ) : (
              // <Import
              //   input={input}
              //   setInput={setInput}
              //   output={output}
              //   setOutput={setOutput}
              // />
              <Question />
            )}
            {/* <Import
            input={input}
            setInput={setInput}
            output={output}
            setOutput={setOutput}
          /> */}
            {/* <Ai /> */}
          </div>
          {loader && (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          )}
        </div>
      </div>
    </QuestionProvider>
  );
};
export default Playground;
