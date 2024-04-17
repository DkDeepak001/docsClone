import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Filter } from "~/components/filter";
import { Header } from "~/components/header";
import { Loader } from "~/components/loader";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { api } from "~/utils/api";
import { toast } from "~/components/ui/use-toast";

export default function Home() {
  const { data: docs, isLoading } = api.docs.all.useQuery();

  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { mutateAsync: createDocs, isLoading: isUploading } = api.docs.create.useMutation({
    onSuccess: async (data) => {
      await router.push(`/docs/${data.id}`);
    },
  });

  const handleCreateDoc = async () => {
    try {
      if (title === "") {
        return toast({
          title: "Title Required",
          description: "Please provide a title for the document.",
          variant: "destructive"
        });
      } else if (title.length >= 16) {
        return toast({
          title: "Title Too Long",
          description: "The title should not be more than 15 characters ",
          variant: "destructive"
        });
      } else {
        await createDocs({ title })
      }
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
              className="flex flex-col w-60 justify-center rounded-xl border border-foreground/50  h-full cursor-pointer"
              onClick={() => void setShowPopup(true)}
            >
              <div className="h-4/5 border-b border-b-foreground/20 w-full flex items-center justify-center">
                <Plus size={100} />
              </div>
              <div className="h-1/5 flex flex-col justify-center items-start px-5 py-1">
                <p className=" text-base font-semibold">New Document</p>
              </div>
            </div>
            {docs?.map((_, i) => {
              return (
                <div
                  className="flex flex-col w-60  justify-center rounded-xl border border-foreground/50 h-full cursor-pointer"
                  key={i}
                  onClick={() => void router.push(`/docs/${_.id}`)}
                >
                  <div className="h-4/5 border-b border-b-foreground/20 w-full p-3  text-[8px] overflow-hidden whitespace-pre-wrap max-w-full " dangerouslySetInnerHTML={{ __html: deltaToHTML(_.content) }}></div>
                  <div className=" h-1/5 flex flex-col items-start px-5 py-1 justify-evenly overflow-hidden ">
                    <p className=" text-sm font-semibold ">{_.title}</p>
                    <p className="text-xs">{_.createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <Dialog onOpenChange={() => setShowPopup(false)} open={showPopup}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Document</DialogTitle>
            </DialogHeader>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="my-2" placeholder="Enter a Title" />
            <Button onClick={handleCreateDoc} variant="default" color="primary" disabled={isUploading}>
              Create
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div >
  );
}

const deltaToHTML = (data: string) => {
  if (!data) return 'Empty Document'
  const delta = JSON.parse(data)
  //@ts-ignore
  return delta.ops?.map(function(op) {
    if (typeof op.insert !== 'string' || delta.ops.length === 1 && op.insert === "\n") return 'Empty Document';
    let html = op.insert.replace(/\n/g, '<br>')
    if (op.attributes && op.attributes.bold) {
      html = '<strong>' + html + '</strong>';
    }
    return html;
  }).join('');
};


