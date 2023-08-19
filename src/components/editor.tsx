import Quill from "quill";
import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
const Editor = () => {
  const editorRef = useRef(null);
  useEffect(() => {
    if (!editorRef.current) return;
    //eslint-disable-next-line
    // @ts-ignore
    editorRef.current.innerHTML = "";
    const editor = document.createElement("div");
    //eslint-disable-next-line
    // @ts-ignore
    //eslint-disable-next-line
    editorRef.current.append(editor);
    new Quill(editor, {
      theme: "snow",
    });
  }, []);
  return <div id="container" ref={editorRef}></div>;
};

export default Editor;
