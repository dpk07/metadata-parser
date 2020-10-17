const express = require("express");
const router = express.Router();

const request = require("request");
const scrape = require("../scrape");

router.post("/", function (req, res, next) {
  request(req.body.url, function (error, response, responseHtml) {
    let resObj = {};
    if (error) {
      res.end(JSON.stringify({ error: error.message }));
      return;
    }
    try {
      resObj = scrape(responseHtml);
    } catch (e) {
      res.end(JSON.stringify({ error: e.message }));
      return;
    }
    res.json(resObj);
  });
});

module.exports = router;
