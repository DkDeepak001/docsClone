import { useRouter } from "next/router";

export default function Docs() {
  const { id } = useRouter().query;
  return <div>Docs {id}</div>;
}
