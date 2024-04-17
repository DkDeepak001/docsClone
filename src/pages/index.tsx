import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Header } from "~/components/header";
import { Loader } from "~/components/loader";
import { api } from "~/utils/api";

export default function Home() {
  const { data: docs, isLoading } = api.docs.all.useQuery();
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { mutateAsync: createDocs } = api.docs.create.useMutation({
    onSuccess: async (data) => {
      await router.push(`/docs/${data.id}`);
    },
  });

  const handleCreateDoc = async () => {
    try {
      await createDocs({ title });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div><Loader /></div>;
  return (
    <div className="bg-background">
      <Header />
      <div className="mt-5 flex  flex-col  items-center py-2">
        <h2 className="text-3xl font-bold">Google Docs</h2>
      </div>


      <div className="flex  flex-col items-center justify-center py-2">
        <h1 className="text-3xl font-bold">Welcome to Google Docs</h1>
        <p className="mt-3 text-xl">
          Get started by editing{" "}
          <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
            pages/index.tsx
          </code>
        </p>
        <div className="mt-3 flex w-3/4 cursor-pointer flex-wrap items-center justify-center gap-5">
          <div
            className="flex flex-col items-center justify-center rounded-xl border border-black p-5"
            onClick={() => void setShowPopup(true)}
          >
            <h2 className="text-2xl font-bold">+</h2>
            <p className="mt-3 text-xl">create Docs</p>
          </div>
          {docs?.map((_, i) => (
            <div
              className="flex flex-col items-center justify-center rounded-xl border border-black p-5"
              key={i}
              onClick={() => void router.push(`/docs/${_.id}`)}
            >
              <h2 className="text-2xl font-bold">{_.title}</h2>
              <p className="mt-3 text-xl">{_.createdAt.toISOString()}</p>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-xl bg-white p-5">
            <div className="flex flex-col items-center justify-center">
              <div
                className="flex w-full items-center justify-evenly
                "
              >
                <h2 className="text-2xl font-bold">Create Docs</h2>
                <div className="flex items-center justify-center">X</div>
              </div>
              <input
                className="mt-3 rounded-md border border-black p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                className="mt-3 rounded-md bg-blue-500 p-2 text-white"
                onClick={() => void handleCreateDoc()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
