const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      console.log(`Connected to database`),
    );
  } catch (error) {
    console.error(`Connection error: ${error.message}`);
    process.exit(1); // exit with failure
  }
};
module.exports = connectToDB;
