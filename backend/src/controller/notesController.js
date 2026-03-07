const Notes = require("../models/Note");

const getNote = async (req, res) => {
  try {
    const notes = await Notes.find().sort({ createdAt: -1 }); //-1 cause to sort in desc order
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(400).json({
      message: `Internal Server Error: ${error.message}`,
      success: false,
    });
  }
};

const getNoteById = async (req, res) => {
  try {
    const notes = await Notes.findById(req.params.id);
    if (!notes)
      return res
        .status(404)
        .json({ message: `Note not found` }, { success: false });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error`,
      success: false,
    });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Notes({ title, content });
    const savedNote = await note.save();

    return res.status(200).json(savedNote);
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error`,
      success: false,
    });
  }
};

const modifyNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true },
    );

    if (!updatedNote) return res.status(404).json(`The note was not found`);
    return res.status(200).json(updatedNote);
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error; ${error}`,
      success: false,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Notes.findByIdAndDelete(req.params.id);
    if (!deletedNote) return `Note not found`;
    return res.status(200).json(deletedNote);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal Server Error`,
      success: false,
    });
  }
};

module.exports = {
  createNote,
  getNote,
  getNoteById,
  modifyNote,
  deleteNote,
};
