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

test("Should get tag by property.", () => {
  let tag = htmlDocument.getTagByProperty({ fieldName: "og:title" });
  expect(tag.doesTagExist()).toBe(true);
});

test("Should get tag by name.", () => {
  let tag = htmlDocument.getTagByName({ fieldName: "description" });
  expect(tag.doesTagExist()).toBe(true);
});
