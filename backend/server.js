const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/User");
const Book = require("./models/book");
const app = express();
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/category", require("./routes/category"));
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("MongoDB connecté");
// Créer un compte admin si n'existe pas
const admin = await User.findOne({ username: "admin" });
if(!admin){
const newAdmin = new User({ username: "admin", password: "1234" });
await newAdmin.save();
console.log("Compte admin créé : admin / 1234");
}
// Créer livres initiaux si pas existants
const count = await Book.countDocuments();
if(count === 0){
await Book.insertMany([
{ title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", year: 1943 },
{ title: "1984", author: "George Orwell", year: 1949 },
{ title: "Les Misérables", author: "Victor Hugo", year: 1862 ,category: "67a300cd19ca2b4c61f06fe1"}
]);
console.log("Livres initiaux ajoutés");
}
})
.catch(err => console.log(err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));