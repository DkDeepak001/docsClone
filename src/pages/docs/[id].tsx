import { useRouter } from "next/router";
import Editor from "~/components/editor";

export default function Docs() {
  const { id } = useRouter().query;
  return (
    <div>
      Docs {id}
      <div>
        <Editor />{" "}
      </div>{" "}
    </div>
  );
}
