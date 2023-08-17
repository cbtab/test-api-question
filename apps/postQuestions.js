import { db } from "../utils/db.js";
import { Router } from "express";

export const postRouter = Router();

postRouter.post("/", async (req, res) => {
  const collection = db.collection("questions");
  const question = { ...req.body, post_date: new Date() };

  await collection.insertOne(question);

  return res.json({
    message: `question added!`,
  });
});
