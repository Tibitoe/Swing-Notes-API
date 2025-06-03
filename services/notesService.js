import NotesModel from "../models/notesModel.js";

const NotesService = {
  getAllNotes: async function (profileId) {
    try {
      const notes = await NotesModel.getAll(profileId);
      return notes;
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      throw error;
    }
  },

  getNoteById: async function (id, profileId) {
    try {
      const note = await NotesModel.getById(id, profileId);
      return note;
    } catch (error) {
      console.error("Failed to fetch note by ID:", error);
      throw error;
    }
  },

  createNote: async function (title, text, profileId) {
    try {
      const newNote = await NotesModel.create(title, text, profileId);
      return newNote;
    } catch (error) {
      console.error("Failed to create note:", error);
      throw error;
    }
  },

  updateNote: async function (id, title, text, profileId) {
    try {
      const updatedNote = await NotesModel.update(id, title, text, profileId);
      return updatedNote;
    } catch (error) {
      console.error("Failed to update note:", error);
      throw error;
    }
  },

  deleteNote: async function (id, profileId) {
    try {
      const deletedNote = await NotesModel.delete(id, profileId);
      return deletedNote;
    } catch (error) {
      console.error("Failed to delete note:", error);
      throw error;
    }
  },

  searchNotes: async function (searchTerm, profileId) {
    try {
      const searchResults = await NotesModel.search(searchTerm, profileId);
      return searchResults;
    } catch (error) {
      console.error("Failed to search notes:", error);
      throw error;
    }
  },
};

export default NotesService;
