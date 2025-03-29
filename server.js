require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user");

// Кеш з'єднання для повторного використання між викликами
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  
  const db = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000 // Зменшимо таймаут до 5 секунд
  });
  
  cachedDb = db;
  return db;
}

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Проміжне ПЗ для підключення до БД перед обробкою маршрутів
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ error: 'Database connection failed' });
  }
});

//Routes
app.use("/api/tasks", workoutRoutes);
app.use("/api/user", userRoutes);

// Для локальної розробки
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
}

module.exports = app;