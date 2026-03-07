const express = require("express");
const {
  createNote,

  getNote,
  getNoteById,
  modifyNote,
  deleteNote,
} = require("../controller/notesController");

const router = express.Router();

router.get("/", getNote);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", modifyNote);
router.delete("/:id", deleteNote);

module.exports = router;
