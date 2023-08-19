import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const DynamicEditor = dynamic(() => import("~/components/editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Docs() {
  const { id } = useRouter().query;
  return (
    <div className="max-h-full min-h-screen bg-gray-50">
      <DynamicEditor />
    </div>
  );
}
