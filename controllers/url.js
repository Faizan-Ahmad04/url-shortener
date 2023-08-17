const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewURL(req, res) {
  const body = req.body;

  const shortID = shortid();
  if (!body.url) return res.status(400).json({ error: "url required" });
  const resultss = await URL.insertMany({
    shortId: shortID,
    redirectURL: body.url,
    visitHistroy: [],
  });
  return res.render('home',{
    id: shortID 
  })
  // return res.json({ id: shortID });
}

async function handleGetAnalitics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistroy.length,
    analitics: result.visitHistroy,
  });
}

module.exports = {
  handleGenerateNewURL,
  handleGetAnalitics,
};
