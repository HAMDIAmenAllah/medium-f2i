const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  content: String,
  comments: [
    {
      author: String,
      content: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  applauseCount: { type: Number, default: 0 },
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
