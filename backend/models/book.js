const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
title: { type: String, required: true },
author: { type: String, required: true },
year: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false // met "true" si obligatoire
  }

});
module.exports = mongoose.model("Book", BookSchema);