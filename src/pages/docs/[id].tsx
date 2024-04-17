import dynamic from "next/dynamic";

const DynamicEditor = dynamic(() => import("~/components/editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Docs() {
  return (
    <div className="max-h-full min-h-screen bg-background">
      <DynamicEditor />
    </div>
  );
}
