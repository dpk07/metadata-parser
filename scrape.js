const cheerio = require("cheerio");
const { ogTags, otherTags } = require("./tags");
const HtmlDocument = require("./models/htmlDocument");

/**
 * Scrapes OG and non OG tags from html.
 * @param {*} html html response from request.
 */
const scrape = (html) => {
  let response = {};
  const htmlDocument = new HtmlDocument(cheerio.load(html));
  scrapeOpenGraphProperties(htmlDocument, response);
  scrapeNonOpenGraphProperties(htmlDocument, response);
  return response;
};
/**
 * Scrapes the HTMLDocument for Open Graph tags.
 * @param {*} htmlDocument
 * @param {*} response
 */
const scrapeOpenGraphProperties = (htmlDocument, response) => {
  ogTags.map((tag) => {
    let $tag = htmlDocument.getTagByProperty(tag);
    const parsedObj = {};
    if (tag.hasOtherProperties) {
      tag.properties.map((property) => {
        let $propertyTag = htmlDocument.getTagByProperty(property);
        if ($propertyTag.doesTagExist()) {
          parsedObj[property.name] = $propertyTag.getContent();
        }
      });
    }

    let propertiesExist = wereSubPropertiesFound(parsedObj);
    if ($tag.doesTagExist() || propertiesExist) {
      let content = $tag.getContent();
      if (propertiesExist) {
        response[tag.name] = parsedObj;
        if (content) parsedObj[tag.alternateName] = content;
      } else {
        response[tag.name] = content;
      }
    }
  });
};
/**
 * Scrapes the HTMLDocument for generic tags.
 * @param {*} htmlDocument
 * @param {*} response
 */
const scrapeNonOpenGraphProperties = (htmlDocument, response) => {
  otherTags.map((tag) => {
    if (!isOpenGraphTagFound(response, tag.name)) {
      let $tag = htmlDocument.getTagByName(tag);
      if ($tag.doesTagExist()) {
        let content = $tag.getContent();
        response[tag.name] = content;
      }
    }
  });
};

/**
 * Checks if the open graph tag was already found and added to response.
 * @param {*} response
 * @param {*} name
 */
const isOpenGraphTagFound = (response, name) => {
  return response.hasOwnProperty(name);
};

/**
 * Checks if sub properties were found.
 * @param {*} tagObj
 */
const wereSubPropertiesFound = (tagObj) => {
  return Object.keys(tagObj).length > 0;
};

module.exports = scrape;
