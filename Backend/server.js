const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./Routes/todoRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Enable CORS for all origins or specify your frontend URL
app.use(cors({
  origin: 'https://todo-list-web-rho.vercel.app',  // Allow only your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/todos", todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
