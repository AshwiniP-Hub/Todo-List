const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./Routes/todoRoutes");
const userRoutes = require("./Routes/userRoutes");
// const taskRoutes = require("./Routes/taskRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("MongoDB connection error:", error));

// API Routes
app.use("/todos", todoRoutes);
app.use("/user", userRoutes);
// app.use("/tasks",taskRoutes)
// Test database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await mongoose.connection.db.admin().ping();
    res.send({ success: true, message: "Database connected", result });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
