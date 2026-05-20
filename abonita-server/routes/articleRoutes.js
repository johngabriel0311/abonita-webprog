const express = require("express");

const upload = require("../config/upload");

const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

const router = express.Router();

router.route("/").get(getArticles).post(upload.single("image"), createArticle);

router
  .route("/:id")
  .put(upload.single("image"), updateArticle)
  .delete(deleteArticle);

module.exports = router;
