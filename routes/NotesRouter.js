import express from "express";
import notesController from "../controllers/notesController.js";

const router = express.Router();

// GET all notes
router.get("/", notesController.getAllNotes);

// GET notes by search term
router.get("/search", notesController.searchNotes);

// GET a specific note by ID
router.get("/:id", notesController.getNoteById);

// POST a new note
router.post("/", notesController.createNote);

// PUT (update) an existing note
router.put("/:id", notesController.updateNote);

// DELETE a note
router.delete("/:id", notesController.deleteNote);

export default router;
