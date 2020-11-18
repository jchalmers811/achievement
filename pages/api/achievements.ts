import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/database";

export default async function achievements(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { db } = await connect();
        const { name, page } = req.query;

        const achievements = await db
          .collection("achievements")
          .find()
          .skip(parseInt(page as string))
          .limit(10)
          .toArray();
        res.status(200).json(achievements);
      } catch (e) {
        res.status(500).json({ error: "Unable to retrieve achievements" });
      }

      break;
    case "PUT":
      try {
        const { db } = await connect();
        const { achievement } = req.body;
        const result = await db.collection("achievements").insertOne({
          name: achievement,
          createdAt: new Date(),
        });
        res.status(201).json(result.ops[0]);
      } catch (e) {
        res.status(500).json({ error: "Unable to add achievement" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
