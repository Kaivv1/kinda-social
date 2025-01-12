import express, { Application } from "express";
import morgan from "morgan";
import "dotenv/config";
import { router as userRouter } from "./routes/user.route.js";
import { errorHandler } from "./errorHandler.js";
import cors from "cors";

const app: Application = express();
const port = process.env.PORT || 8080;
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use("/users", userRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`App runnin on port ${port}`));

export default app;
