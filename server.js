import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import ApiRouter from "./routes/ApiRouter.js";
import AuthRouter from "./routes/AuthRouter.js";
import { swaggerDocs } from "./config/swagger.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", ApiRouter);
app.use("/auth", AuthRouter);

if (process.env.NODE_ENV !== "production") {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.get("/", (req, res) => {
  res.redirect("/docs");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
