import express from "express";
import { client } from "./utils/db.js";
import { getRouter } from "./apps/getQuestions.js";
import { postRouter } from "./apps/postQuestions.js";
import { deleteRouter } from "./apps/deleteQuestion.js";
import { updateRouter } from "./apps/updateQuestions.js";
import cors from "cors";

async function init() {
  const app = express();
  const port = 4000;

  await client.connect();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/questions", getRouter);
  app.use("/questions", postRouter);
  app.use("/questions", updateRouter);
  app.use("/questions", deleteRouter);

  app.get("/", (req, res) => {
    return res.json("Hello Skill Checkpoint #2");
  });

  app.get("*", (req, res) => {
    return res.status(404).json("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
