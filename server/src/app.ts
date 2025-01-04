import express, { Application } from "express";
import morgan from "morgan";
import "dotenv/config";

const app: Application = express();
const port = process.env.PORT;
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ msg: process.env.ASD });
});

app.listen(port, () => console.log(`App runnin on port ${port}`));
