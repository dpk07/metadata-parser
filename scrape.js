const cheerio = require("cheerio");
const { ogTags, otherTags } = require("./tags");
const HtmlDocument = require("./models/htmlDocument");

const scrape = (html) => {
  let response = {};
  const htmlDocument = new HtmlDocument(cheerio.load(html));
  scrapeOpenGraphProperties(htmlDocument, response);
  scrapeNonOpenGraphProperties(htmlDocument, response);
  return response;
};

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

    let propertiesExist = doPropertiesExist(parsedObj);
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

const isOpenGraphTagFound = (response, name) => {
  return response.hasOwnProperty(name);
};

const doPropertiesExist = (tagObj) => {
  return Object.keys(tagObj).length > 0;
};

module.exports = scrape;
