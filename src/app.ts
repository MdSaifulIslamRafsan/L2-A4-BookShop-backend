import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
const app: Application = express();

// Middleware to handle CORS requests
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// Use the productsRouter for all /api/products requests
app.use("/api", router);

// Route to handle GET requests at /api/users
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
