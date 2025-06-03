import express from "express";
import authenticate from "../middlewares/authMiddleware.js";
import NotesRouter from "./NotesRouter.js";

const router = express.Router();

router.use("/notes", authenticate, NotesRouter);

export default router;
