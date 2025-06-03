import NotesModel from "../models/notesModel.js";

const notesController = {
  getAllNotes: async (req, res) => {
    try {
      const profileId = req.profile.id;
      const notes = await NotesModel.getAll(profileId);
      res.status(200).json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch notes" });
    }
  },

  getNoteById: async (req, res) => {
    try {
      const profileId = req.profile.id;
      const note = await NotesModel.getById(req.params.id, profileId);
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

  createNote: async (req, res) => {
    try {
      const profileId = req.profile.id;
      const { title, text } = req.body;
      const newNote = await NotesModel.create(title, text, profileId);
      res.status(201).json(newNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create note" });
    }
  },

  updateNote: async (req, res) => {
    try {
      const profileId = req.profile.id;
      const { title, text } = req.body;
      const updatedNote = await NotesModel.update(
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

  deleteNote: async (req, res) => {
    try {
      const profileId = req.profile.id;
      const deletedNote = await NotesModel.delete(req.params.id, profileId);
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
      const searchResults = await NotesModel.search(searchTerm, profileId);
      res.status(200).json(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to search notes" });
    }
  },
};

export default notesController;
