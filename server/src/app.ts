import express, { Application } from "express";
import morgan from "morgan";
import "dotenv/config";
import { router as userRouter } from "./routes/user.route.js";

const app: Application = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(morgan("dev"));

app.use("/users", userRouter);

app.listen(port, () => console.log(`App runnin on port ${port}`));

export default app;
