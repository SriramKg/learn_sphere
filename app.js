const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
dotenv.config();

const userRoutes = require("./routes/users.routes");
const courseRoutes = require("./routes/courses.routes");
const enrollRoutes = require("./routes/enrollments.routes");
const moduleRoutes = require("./routes/modules.routes");

app.use("/api/auth", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollRoutes);
app.use("/api/modules", moduleRoutes);

const connectionStr = process.env.MONGO_URI;
const db = process.env.DB_NAME;
mongoose
  .connect(connectionStr + db)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
    console.error(err);
    process.exit();
  });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
