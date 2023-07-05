const Article = require("../models/articleModel");

const create = async (req, res) => {
  const { title, content } = req.body;
  try {
    const article = await Article({ title, content });
    article.save().then((saveArticle) => {
      res.status(201).json(saveArticle);
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erreur lors de la sauvegarde de l'article` });
  }
};
const showArticle = async (req, res) => {
  const  id  = req.params.id;
  try {
    const article = await Article.findOne({_id : id});
    res.status(200).render("show", { article: article });
  } catch (error) {
    res.json({ message: "Article non trouvé" });
  }
};
const showListArticle = async (req, res) => {
  try {
    const article = await Article.find();
    res.status(200).render("listes", { article: article });
  } catch (error) {
    res.json({ message: "Article non trouvé" });
  }
};
const comments = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, content } = req.body;
    await Article.findById(id)
      .then((article) => {
        if (!article) {
          return res.status(404).json({ error: "Article introuvable" });
        }
        const comment = { author, content };
        article.comments.push(comment);
        return article.save();
      })
      .then((updateArticle) => {
        res.json(updateArticle);
      });
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de l'ajout du commentaire` });
  }
};

const applaud = async (req, res) => {
  try {
    const { id } = req.params;
    await Article.findById(id)
      .then((article) => {
        if (!article) {
          return res.status(404).json({ error: "Article introuvable" });
        }
        article.applauseCount++;
        return article.save();
      })
      .then((updateArticle) => res.json(updateArticle));
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erreur lors de l'ajoout d'applaudissements` });
  }
};
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.deleteOne({ _id: req.params.id });
    if (article.deletedCount === 0) {
      // L'article n'a pas été trouvé
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedArticle = await Article.updateOne({ _id: req.params.id }, { title, content });

    if (updatedArticle.n === 0) {
      // L'article n'a pas été trouvé
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({ message: "Article updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { create, comments, applaud, showArticle, showListArticle, deleteArticle, updateArticle };
