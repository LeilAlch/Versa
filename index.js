require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task")
const projectRoutes = require("./routes/projects")

// database connection
connection();

// middlewares
app.use(express.json());

app.use(cors({origin: 'http://localhost:3000'}))

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

const port = process.env.PORT || 8086;
app.listen(port, console.log(`Listening on port ${port}...`));
