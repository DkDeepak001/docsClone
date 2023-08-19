import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { io } from "socket.io-client";

const DynamicEditor = dynamic(() => import("~/components/editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Docs() {
  const { id } = useRouter().query;

  useEffect(() => {
    const socket = io("http://localhost:8000");
    socket.emit("join-room", id);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="max-h-full min-h-screen bg-gray-50">
      <DynamicEditor />
    </div>
  );
}
