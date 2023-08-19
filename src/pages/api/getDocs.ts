import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function getDocs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  if (!req.body.documentId)
    return res.status(400).json({ message: "documentId is required" });

  const document = await prisma.docs.findUnique({
    where: {
      id: req?.body?.documentId! as string,
    },
  });

  console.log(document);
  res.send({
    message: "suucess",
    data: document,
  });
}
