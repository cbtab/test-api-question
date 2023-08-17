import { db } from "../utils/db.js";
import { Router } from "express";
import { ObjectId } from "mongodb";

export const getRouter = Router();

getRouter.get("/", async (req, res) => {
  const collection = db.collection("questions");
  const allQuestions = await collection
    .find({})
    .limit(10)
    .sort({ post_date: -1 })
    .toArray();

  return res.json({
    data: allQuestions,
  });
});

getRouter.get("/:questionId", async (req, res) => {
  const collection = db.collection("questions");
  const question = new ObjectId(req.params.questionId);
  const postLog = await collection.find({ _id: question }).toArray();
  return res.json({
    data: postLog,
  });
});
