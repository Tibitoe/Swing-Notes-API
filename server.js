import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.get("/", (req, res) => {
  res.redirect("/docs");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${PORT}`);
});
