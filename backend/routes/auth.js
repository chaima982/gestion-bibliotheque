const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// Login
router.post("/login", async (req, res) => {
const { username, password } = req.body;
const user = await User.findOne({ username });
if(!user) return res.status(400).json({ message: "Utilisateur non trouvé" });
const isMatch = await user.comparePassword(password);
if(!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
res.json({ token, username: user.username });
});
module.exports = router;