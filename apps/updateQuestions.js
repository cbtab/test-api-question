import { db } from "../utils/db.js";
import { Router } from "express";
import { ObjectId } from "mongodb";

export const updateRouter = Router();

updateRouter.put("/:questionId", async (req, res) => {
  const collection = db.collection("questions");
  const id = new ObjectId(req.params.questionId);
  const updatedQuestion = { ...req.body, updated_date: new Date() };

  await collection.updateOne({ _id: id }, { $set: updatedQuestion });

  return res.json({
    message: "Question has been edited!",
  });
});
