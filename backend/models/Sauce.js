const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required:true },
  name: { type: String, required:true },
  manufacturer: { type: String, required:true },
  description: { type: String, required:true },
  mainPepper: { type: String, required:true },
  imageUrl: { type: String, required:true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 }, // j'aime
  dislikes: { type: Number, default: 0}, // je n'aime pas
  usersLiked: { type: Array }, // les utilisateurs qui ont aimé
  usersDisliked: { type: Array}, // les utilisateurs qui n'ont pas aimé
});

module.exports = mongoose.model('Sauce', sauceSchema);