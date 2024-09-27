import { useParams } from "react-router-dom";
import "./index.scss";
import EditorPage from "./EditorPage";
import { useCallback, useState } from "react";
import { createSubmission } from "./judge";
import Import from "./Import";
import Ai from "./Ai";
import Question from "./Question";
const Playground = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
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
    },
    [input]
  );

  return (
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
            />
          </div>
          {magic ? (
            <Ai />
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
  );
};
export default Playground;
