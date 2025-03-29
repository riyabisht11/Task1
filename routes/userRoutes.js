const express = require("express");
const {register,login,logout}=require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/login", login);
router.post("/logout", logout);
router.get("/dashboard", authenticate, (req, res) => {
  res.json({ message: "Welcome to the dashboard", user: req.user });
});

module.exports = router;