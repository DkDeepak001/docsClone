"use client";
import Quill from "quill";
import { useCallback, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import { type Socket, io } from "socket.io-client";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);

  const { id: documentId } = useRouter().query;

  useEffect(() => {
    const s = io(process.env.WEBSOCKET_URL ?? "http://localhost:8000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  //loading changes
  useEffect(() => {
    if (!socket || !quill) return;

    socket.once("loaded-documents", (document) => {
      if (!document?.data?.content) {
        //eslint-disable-next-line
        //@ts-ignore
        quill.setContents({ ops: [{ insert: "\n" }] });
        quill.enable();
        return;
      }
      quill.setContents(JSON.parse(document.data.content));
      quill.enable();
    });

    socket.emit("get-documents", documentId);
  }, [quill, socket, documentId]);

  //sending changes
  useEffect(() => {
    if (!socket || !quill) return;
    //eslint-disable-next-line
    //@ts-ignore
    const handleTextChange = (delta, old, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handleTextChange);

    return () => {
      quill.off("text-change", handleTextChange);
    };
  }, [quill, socket]);

  //receiving changes
  useEffect(() => {
    if (!socket || !quill) return;

    //eslint-disable-next-line
    //@ts-ignore
    const handleTxtChange = (delta) => {
      quill?.updateContents(delta);
    };
    socket?.on("receive-changes", handleTxtChange);

    return () => {
      quill.off("text-change", handleTxtChange);
    };
  }, [quill, socket]);

  useEffect(() => {
    if (!socket || !quill) return;
    const handleSave = async () => {
      const data = quill.getContents();
      if (quill.isEnabled())
        await saveDocument({
          id: documentId as string,
          content: JSON.stringify(data),
        });
    };

    const interval = setInterval(handleSave, 2000);

    return () => {
      clearInterval(interval);
    };
    //eslint-disable-next-line
  }, [quill, socket, documentId]);
  const { mutateAsync: saveDocument } = api.docs.save.useMutation();
  //eslint-disable-next-line
  //@ts-ignore
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;
    //eslint-disable-next-line
    wrapper.innerHTML = "";
    const editor = document.createElement("div");

    //eslint-disable-next-line
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });
    setQuill(q);
    q?.disable();
    q?.setText("Loading....");
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div ref={wrapperRef} className="w-3/4 "></div>
    </div>
  );
};

export default Editor;
