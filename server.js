require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user");

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/tasks", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db - тільки при запуску в звичайному режимі, не в serverless
if (process.env.NODE_ENV !== 'production') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(
          `Connected to db & Server Started on port:${process.env.PORT}`
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

// Важливо: експортуйте app для Vercel
module.exports = app;