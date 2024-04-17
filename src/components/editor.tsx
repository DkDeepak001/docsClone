"use client";
import Quill from "quill";
import { useCallback, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import { type Socket, io } from "socket.io-client";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { toolbarOptions } from "~/utils/toolbar";



const Editor = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);

  const { id: documentId } = useRouter().query;
  const { mutateAsync: saveDocument } = api.docs.save.useMutation();


  useEffect(() => {
    const s = io("http://localhost:8000/");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);


  //loading changes
  useEffect(() => {
    if (!socket || !quill) return;


    //set up Quill and load the content of we have 
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

    //eslint-disable-next-line
    //@ts-ignore
    const handleTxtChange = (delta) => {
      quill?.updateContents(delta);
    };

    //eslint-disable-next-line
    //@ts-ignore
    const handleTextChange = (delta, old, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    //save the content in db
    const handleSave = async () => {
      const data = quill.getContents();
      if (quill.isEnabled())
        await saveDocument({
          id: documentId as string,
          content: JSON.stringify(data),
        });
    };



    quill.on("text-change", handleTextChange);

    socket?.on("receive-changes", handleTxtChange);
    socket.emit("get-documents", documentId);

    //debouncing save the document
    const interval = setInterval(handleSave, 10000);

    return () => {
      clearInterval(interval);
      quill.off("text-change", handleTxtChange);
      quill.off("text-change", handleTextChange);
    };

  }, [quill, socket, documentId]);



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
    <div className="flex flex-col flex-1 h-screen items-center justify-center py-5 ">
      <div ref={wrapperRef} className="xl:w-3/5 md:w-[95%] flex flex-1 flex-col "></div>
    </div>
  );
};

export default Editor;
