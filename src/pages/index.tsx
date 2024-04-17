import { Plus, SquarePlus } from "lucide-react";
import { useRouter } from "next/router";
import Quill from "quill";
import { useState } from "react";
import { Filter } from "~/components/filter";
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
    <div className="bg-background flex flex-col items-center ">
      <Header />
      <div className="w-4/5 my-5">
        <div className="flex flex-row justify-between  py-5 ">
          <h3 className="text-base font-semibold">Recent Documenst</h3>
          <Filter />
        </div>


        <div className="flex  flex-col items-center justify-center py-2  h-full">
          <div className="mt-3 flex  flex-wrap items-center justify-self-start gap-y-5 gap-x-4 h-80  w-full ">
            <div
              className="flex flex-col w-60 items-center justify-center rounded-xl border border-foreground/50  h-full cursor-pointer"
              onClick={() => void setShowPopup(true)}
            >
              <div className="h-5/6 border-b border-b-foreground/20 w-full flex items-center justify-center">
                <Plus size={100} />
              </div>
              <p className="h-1/6 pt-3 text-lg font-semibold">New Document</p>
            </div>
            {docs?.map((_, i) => {
              return (
                <div
                  className="flex flex-col w-60 items-center justify-center rounded-xl border border-foreground/50 h-full cursor-pointer"
                  key={i}
                  onClick={() => void router.push(`/docs/${_.id}`)}
                >
                  <div className="h-5/6 border-b border-b-foreground/20 w-full flex items-start justify-start p-3 text-[8px]" >
                    {deltaToHTML(_.content)}
                  </div>
                  <p className="h-1/6 pt-3 text-lg font-semibold">{_.title}</p>
                </div>
              )
            })}
          </div>
        </div>
        {
          showPopup && (
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
          )
        }
      </div>
    </div >
  );
}

const deltaToHTML = (data: string) => {
  if (!data) return 'Empty Document'
  const delta = JSON.parse(data)
  return delta.ops?.map(function(op) {
    if (typeof op.insert !== 'string' || op.insert === "\n") return 'Empty Document';
    let html = op.insert;
    if (op.attributes && op.attributes.bold) {
      html = '<strong>' + html + '</strong>';
    }
    return html;
  }).join('');
};


