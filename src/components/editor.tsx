"use client";
import Quill from "quill";
import { useCallback } from "react";
import "quill/dist/quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const Editor = () => {
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;
    //eslint-disable-next-line
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    //eslint-disable-next-line
    wrapper.append(editor);
    new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div ref={wrapperRef} className="w-3/4 "></div>
    </div>
  );
};

export default Editor;
