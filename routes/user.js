const express = require("express");
const { loginUser, signupUser } = require("../controllers/userControllers");

const router = express.Router();

// Login
router.post("/login", loginUser);

// Signup
router.post("/signup", signupUser);

module.exports = router;
