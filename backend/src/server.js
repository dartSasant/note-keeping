const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const notesRoutes = require("./routes/notesRoutes");
const connectToDB = require("./config/db");
const Note = require("./models/Note");
const rateLimiter = require("./middleware/rateLimiter");
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// middleware to parse given data to json
// middleware is the function that runs between request and response
app.use(
  cors({
    origin: "http://localhost:5173",
    
  }),
);
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });
