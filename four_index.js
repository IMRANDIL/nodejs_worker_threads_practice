import express from "express";
import { Worker } from "worker_threads";
const app = express();
const THREAD_COUNT = 4;

app.use(express.json());

const PORT = process.env.PORT || 8000;

const createWorker = () => {
  const worker = new Worker("./four-worker.js", {
    workerData: {
      thread_count: THREAD_COUNT,
    },
  });
  return new Promise((resolve, reject) => {
    worker.on("message", (data) => {
      resolve(data);
    });

    worker.on("error", (error) => {
      reject(`error: ${error}`);
    });
  });
};

app.get("/non-blocking", (req, res) => {
  res.status(200).json(`This is non blocking one.`);
});

app.get("/blocking", async (req, res) => {
  const promisesArray = [];
  for (let i = 0; i < THREAD_COUNT; i++) {
    promisesArray.push(createWorker());
  }
  const result = await Promise.all(promisesArray);
  const resultTosend = result[0] + result[1] + result[2] + result[3];
  res.status(200).send(`This is blocking one result: ${resultTosend}`);
});

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
