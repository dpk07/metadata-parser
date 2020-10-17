const htmlDoc = require("../models/htmlDocument");
const cheerios = require("cheerio");
let htmlDocument;

beforeEach(() => {
  const html = `<meta property="og:title" content="Getting Started · Jest"/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="https://jestjs.io/"/>
  <meta name="description" content="Install Jest using [\`yarn\`](https://yarnpkg.com/en/package/jest):"/>
  <meta name="image" content="https://jestjs.io/img/opengraph.png"/>`;
  const loadedHtml = cheerios.load(html);
  htmlDocument = new htmlDoc(loadedHtml);
});

test("Should return true for does tag exist.", () => {
  let tag = htmlDocument.getTagByProperty({ fieldName: "og:title" });
  expect(tag.doesTagExist()).toBe(true);
});

test("Should get tag content properly.", () => {
  let description = htmlDocument.getTagByName({ fieldName: "description" });
  let expectedDescription =
    "Install Jest using [`yarn`](https://yarnpkg.com/en/package/jest):";
  let expectedType = "website";
  let type = htmlDocument.getTagByProperty({ fieldName: "og:type" });
  expect(description.getContent()).toBe(expectedDescription);
  expect(type.getContent()).toBe(expectedType);
});
