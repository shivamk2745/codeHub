import { useContext, useRef, useState } from "react";
import "./editorPage.scss";
import Editor from "@monaco-editor/react";
import { PlaygroundContext } from "../../Provider/PlaygroundProvider";
const EditorPage = ({
  fileId,
  folderId,
  submitCode,
  setMagic,
  magic,
  input,
  setInput,
  output,
  setOutput,
  editorCode,
  setEditorCode,
}) => {
  const { getDefaultCode, getLanguage, updateLanguage, saveNewCode } =
    useContext(PlaygroundContext);
  const [code, setCode] = useState(() => {
    return getDefaultCode(fileId, folderId);
  });
  const [language, setLanguage] = useState(() => {
    return getLanguage(fileId, folderId);
  });
  const [theme, setTheme] = useState("vs-dark");
  const codeRef = useRef(code);
  // console.log(code);
  setEditorCode(codeRef.current);

  const handleOption = {
    fontSize: "20px",
  };

  const handleChangeInput = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.includes("text");
    const validExtensions = ["cpp", "c", "java", "py", "js"]; // Add other extensions as needed
    const fileExtension = file.name.split(".").pop();

    if (fileType || validExtensions.includes(fileExtension)) {
      const readFile = new FileReader();
      readFile.readAsText(file);
      readFile.onload = function (value) {
        codeRef.current = value.target.result;
        setCode(value.target.result);
      };
    } else {
      console.log("Incorrect file type");
    }
  };

  const handleEditorChange = (e) => {
    codeRef.current = e;
  };

  const saveCode = () => {
    console.log("click");

    saveNewCode(fileId, folderId, codeRef.current);
  };

  const extensionMapping = {
    cpp: "cpp",
    javascript: "js",
    python: "py",
    java: "java",
  };
  const handleExport = () => {
    const codeVal = codeRef.current?.trim();
    if (!codeVal) {
      alert("Nothing to export");
    }
    const codeBlob = new Blob([codeVal], { type: "text/plain" });
    const download = URL.createObjectURL(codeBlob);
    const link = document.createElement("a");
    link.href = download;
    link.download = `code.${extensionMapping[language]}`;
    link.click();
  };

  const handleLanguage = (e) => {
    updateLanguage(fileId, folderId, e.target.value);
    setCode(getDefaultCode(fileId, folderId));
    setLanguage(e.target.value);
  };

  const handleTheme = (e) => {
    setTheme(e.target.value);
  };

  const runCode = () => {
    submitCode({ code: codeRef.current, language });
  };

  const handleMagic = () => {
    console.log("magic", magic);
    setMagic(!magic);
  };
  const handleInput = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.includes("text");
    const emptyType = file.type.includes("");
    if (fileType || emptyType) {
      const readFile = new FileReader();
      readFile.readAsText(file);
      readFile.onload = function (value) {
        console.log(value.target.result);
        setInput(value.target.result);
      };
    } else {
      console.log("Incorrect file type");
    }
  };
  return (
    <div className="editor-container">
      <div className="editor-header">
        <div className="header-left">
          <div className="title">
            <span className="title-name">{"title"}</span>
            <span className="material-icons">edit</span>
          </div>
          <button onClick={saveCode}>Save Code</button>
        </div>
        <div className="header-right">
          <div className="magic-icon" title="AI Help" onClick={handleMagic}>
            <i className="fa fa-magic magic" aria-hidden="true"></i>
          </div>
          <div className="dropdown-container">
            <select
              className="dropdown"
              value={language}
              onChange={handleLanguage}
            >
              <option value="cpp">cpp</option>
              <option value="javascript">javascript</option>
              <option value="java">java</option>
              <option value="python">python</option>
            </select>
          </div>

          <div className="dropdown-container">
            <select className="dropdown" value={theme} onChange={handleTheme}>
              <option value="vs-light">vs-light</option>
              <option value="vs-dark">vs-dark</option>
            </select>
          </div>
        </div>
      </div>

      <div className="editor-body">
        <Editor
          // height={"100%"}
          theme={theme}
          language={language}
          options={handleOption}
          value={code}
          onChange={handleEditorChange}
        />
      </div>
      <div className="entire-footer">
        <div className="container-input">
          <div className="input-container">
            <div className="new-input">
              <b>Input:</b>
              <button htmlFor="uploadTestcase" className="label">
                <span className="material-icons icons">upload</span>
                <span className="title">Import Code</span>
              </button>
              <input
                type="file"
                id="uploadTestcase"
                onChange={handleInput}
                style={{ display: "none" }}
              />
            </div>

            <div className="textarea-wrapper">
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              ></textarea>
            </div>
          </div>

          <div className="output-container">
            <div className="new-input">
              <b>Output:</b>
              <button className="label">
                <span className="material-icons icons">download</span>
                <span className="title">Export Code</span>
              </button>
            </div>

            <div className="textarea-wrapper">
              <textarea
                value={output}
                onChange={(e) => {
                  setOutput(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="editor-footer">
          <div className="title">
            <span className="material-icons">fullscreen</span>
            <span>Full Screen</span>
          </div>
          <div className="title">
            <span className="material-icons icons">upload</span>
            <span>Import Code</span>
            <input
              type="file"
              id="upload"
              onChange={handleChangeInput}
              style={{ display: "none" }}
            />
          </div>
          <div className="title" onClick={handleExport}>
            <span className="material-icons">download</span>
            <span>Export Code</span>
          </div>
          <button onClick={runCode}>Run Code</button>
        </div>
      </div>
    </div>
  );
};
export default EditorPage;
