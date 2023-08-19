import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const DynamicEditor = dynamic(() => import("~/components/editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Docs() {
  const { id } = useRouter().query;
  return (
    <div>
      Docs {id}
      <div>
        <DynamicEditor />{" "}
      </div>{" "}
    </div>
  );
}
