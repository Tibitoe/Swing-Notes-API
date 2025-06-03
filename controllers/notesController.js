import NotesService from "../services/notesService.js";
import { validate } from "../middlewares/validationMiddleware.js";
import {
  createNoteSchema,
  updateNoteSchema,
} from "../validators/notesValidator.js";

const notesController = {
  getAllNotes: async (req, res) => {
    try {
      const profileId = req.profile.id;
      const notes = await NotesService.getAllNotes(profileId);
      res.status(200).json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch notes" });
    }
  },

  getNoteById: async (req, res) => {
    try {
      const profileId = req.profile.id;
      const note = await NotesService.getNoteById(req.params.id, profileId);
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch note" });
    }
  },

  createNote: [
    validate(createNoteSchema),
    async (req, res) => {
      try {
        const profileId = req.profile.id;
        const { title, text } = req.body;
        const newNote = await NotesService.createNote(title, text, profileId);
        res.status(201).json(newNote);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create note" });
      }
    },
  ],

  updateNote: [
    validate(updateNoteSchema),
    async (req, res) => {
      try {
        const profileId = req.profile.id;
        const { title, text } = req.body;
        const updatedNote = await NotesService.updateNote(
          req.params.id,
          title,
          text,
          profileId
        );
        if (updatedNote) {
          res.status(200).json(updatedNote);
        } else {
          res.status(404).json({ message: "Note not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update note" });
      }
    },
  ],

  deleteNote: async (req, res) => {
    try {
      const profileId = req.profile.id;
      const deletedNote = await NotesService.deleteNote(
        req.params.id,
        profileId
      );
      if (deletedNote) {
        res.status(200).json({ message: "Note deleted" });
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete note" });
    }
  },

  searchNotes: async (req, res) => {
    try {
      const profileId = req.profile.id;
      const searchTerm = req.query.term;
      const searchResults = await NotesService.searchNotes(
        searchTerm,
        profileId
      );
      res.status(200).json(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to search notes" });
    }
  },
};

export default notesController;
