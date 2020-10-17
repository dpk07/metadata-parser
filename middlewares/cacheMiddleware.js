const cache = new (require("../models/cache"))();

/**
 * Checks if the url exists in the cache
 * If yes, returns the response right away.
 * Else moves to the next middleware.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.tryCacheHit = (req, res, next) => {
  const url = req.body.url;
  if (cache.exists(url)) {
    res.json(cache.get(url));
  } else {
    next();
  }
};

/**
 * Updates the cache with the response for particular url
 * and returns the response to the client.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.updateCache = (req, res, next) => {
  const url = req.body.url;
  cache.put(url, res.finalResponse);
  res.json(res.finalResponse);
};
