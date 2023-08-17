const express = require("express");
const {
  handleGenerateNewURL,
  handleGetAnalitics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewURL);

router.get("/analytics/:shortId", handleGetAnalitics);

module.exports = router;
