const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// CommonJS imports for your local files
const notesRoutes = require("./routes/notesRoutes");
const connectToDB = require("./config/db");
const rateLimiter = require("./middleware/rateLimiter");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// In CommonJS, __dirname is built-in. You don't need fileURLToPath!

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}

app.use(express.json());
app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoutes);

// Deployment Settings
if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend dist folder
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
  });
}

// Database and Server Start
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });