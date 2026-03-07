const express = require("express");
const notesRoutes = require("./routes/notesRoutes");
const connectToDB = require("./config/db");
const dotenv = require("dotenv");
const Note = require("./models/Note");
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// middleware to parse given data to json
// middleware is the function that runs between request and response
app.use(express.json());

app.use("/api/notes", notesRoutes);
connectToDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
