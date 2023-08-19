"use client";
import Quill from "quill";
import { useCallback } from "react";
import "quill/dist/quill.snow.css";
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
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div ref={wrapperRef} className="w-3/4"></div>
    </div>
  );
};

export default Editor;
