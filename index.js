const express = require("express");
const path = require("path")
const app = express();
require("dotenv").config();
const port = process.env.PORT;

const mongoose = require("mongoose");
mongoose
  .connect(process.env.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`[DATABASE]Connected to MongoDB`);
  })
  .catch((error) => {
    console.error("Erreur de la connexion à la base de données : ", error);
  });
  app.set('view engine', 'pug')
  app.set('views', path.join(__dirname, 'views'))
  app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json(`Bienvenue sur l'API REST de type medium`);
});
app.use("/api/articles", require("./routes/articleRoutes"));
app.listen(port, () =>
  console.log(`[SERVER] Le server écoute sur le port : ${port}`)
);
