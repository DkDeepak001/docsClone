import { type NextApiRequest, type NextApiResponse } from "next";

export default function getDocs(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  res.send({
    message: "suucess",
    data: { ops: [{ retain: 8 }, { insert: "d" }] },
  });
}
