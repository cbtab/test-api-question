import { db } from "../utils/db.js";
import { Router } from "express";
import { ObjectId } from "mongodb";

export const deleteRouter = Router();

deleteRouter.delete("/:questionId", async (req, res) => {
  const collection = db.collection("questions");
  const id = new ObjectId(req.params.questionId);

  await collection.deleteOne({ _id: id });

  return res.json({
    message: "Post has been deleted!",
  });
});
