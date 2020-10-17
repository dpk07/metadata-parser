const scrape = require("../services/scrape");

beforeAll(() => {});

test("Should parse og meta data properly.", () => {
  const html = `
  <meta property="og:title" content="Getting Started · Jest"/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="https://jestjs.io/"/>
  <meta property="og:description" content="Install Jest using [\`yarn\`](https://yarnpkg.com/en/package/jest):"/>
  <meta property="og:image" content="https://jestjs.io/img/opengraph.png"/>`;
  let response = scrape(html);
  let expected = {
    title: "Getting Started · Jest",
    type: "website",
    url: "https://jestjs.io/",
    description:
      "Install Jest using [`yarn`](https://yarnpkg.com/en/package/jest):",
    image: "https://jestjs.io/img/opengraph.png",
  };
  expect(response).toStrictEqual(expected);
});

test("Should parse normal meta data properly.", () => {
  const html = `
  <meta name="title" content="Getting Started · Jest"/>
  <meta name="description" content="Install Jest using [\`yarn\`](https://yarnpkg.com/en/package/jest):"/>
  <meta name="image" content="https://jestjs.io/img/opengraph.png"/>`;
  let response = scrape(html);
  let expected = {
    title: "Getting Started · Jest",
    description:
      "Install Jest using [`yarn`](https://yarnpkg.com/en/package/jest):",
    image: "https://jestjs.io/img/opengraph.png",
  };
  expect(response).toStrictEqual(expected);
});

test("Should pick details from normal metadata if og metadata is not available.", () => {
  const html = `
  <meta property="og:title" content="Getting Started · Jest"/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="https://jestjs.io/"/>
  <meta name="description" content="Install Jest using [\`yarn\`](https://yarnpkg.com/en/package/jest):"/>
  <meta name="image" content="https://jestjs.io/img/opengraph.png"/>`;
  let response = scrape(html);
  let expected = {
    title: "Getting Started · Jest",
    type: "website",
    url: "https://jestjs.io/",
    description:
      "Install Jest using [`yarn`](https://yarnpkg.com/en/package/jest):",
    image: "https://jestjs.io/img/opengraph.png",
  };
  expect(response).toStrictEqual(expected);
});

test("Should return empty object if no tags are available.", () => {
  const html = `
  `;
  let response = scrape(html);
  let expected = {};
  expect(response).toStrictEqual(expected);
});

test("Should pick nested og image properties", () => {
  const html = `<meta property="og:image" content="https://ogp.me/logo.png">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="300">
  <meta property="og:image:height" content="300">
  <meta property="og:image:alt" content="The Open Graph logo">`;
  let response = scrape(html);
  let expected = {
    image: {
      type: "image/png",
      width: "300",
      height: "300",
      alt: "The Open Graph logo",
      url: "https://ogp.me/logo.png",
    },
  };
  expect(response).toStrictEqual(expected);
});

test("Should pick nested og video properties.", () => {
  const html = `
  <meta property="og:video:url" content="https://www.dailymotion.com/embed/video/x7f2sww?autoplay=1"  />
  <meta property="og:video:secure_url" content="https://www.dailymotion.com/embed/video/x7f2sww?autoplay=1"  />
  <meta property="og:video:type" content="text/html"  />
  <meta property="og:video:width" content="640"  />
  <meta property="og:video:height" content="360"  />`;
  let response = scrape(html);
  let expected = {
    video: {
      url: "https://www.dailymotion.com/embed/video/x7f2sww?autoplay=1",
      secure_url: "https://www.dailymotion.com/embed/video/x7f2sww?autoplay=1",
      type: "text/html",
      width: "640",
      height: "360",
    },
  };
  expect(response).toStrictEqual(expected);
});

test("Should pick combination of nested and normal properties.", () => {
  const html = `<meta property="og:site_name" content="Dailymotion"  />
  <meta property="og:url" content="https://www.dailymotion.com/video/x7f2sww"  />
  <meta property="og:type" content="video"  />
  <meta property="og:title" content="Ed Sheeran - Shape of You [Official Video] - video dailymotion"  />
  <meta property="og:description" content="Watch Ed Sheeran - Shape of You [Official Video] - Color Entertainment on Dailymotion"  />
  <meta property="og:image" content="https://s2.dmcdn.net/v/QlEdW1VY0Tz844aml/526x297"  />
  <meta property="og:image:secure_url" content="https://s2.dmcdn.net/v/QlEdW1VY0Tz844aml/526x297"  />
  <meta property="og:image:type" content="image/jpg"  />
  <meta property="og:image:width" content="526"  />
  <meta property="og:image:height" content="297"  />
  <meta property="og:video:url" content="https://www.dailymotion.com/embed/video/x7f2sww?autoplay=1"  />
  <meta property="og:video:secure_url" content="https://www.dailymotion.com/embed/video/x7f2sww?autoplay=1"  />
  <meta property="og:video:type" content="text/html"  />
  <meta property="og:video:width" content="640"  />
  <meta property="og:video:height" content="360"  />`;
  let response = scrape(html);
  let expected = {
    title: "Ed Sheeran - Shape of You [Official Video] - video dailymotion",
    type: "video",
    url: "https://www.dailymotion.com/video/x7f2sww",
    description:
      "Watch Ed Sheeran - Shape of You [Official Video] - Color Entertainment on Dailymotion",
    site_name: "Dailymotion",
    image: {
      secure_url: "https://s2.dmcdn.net/v/QlEdW1VY0Tz844aml/526x297",
      type: "image/jpg",
      width: "526",
      height: "297",
      url: "https://s2.dmcdn.net/v/QlEdW1VY0Tz844aml/526x297",
    },
    video: {
      url: "https://www.dailymotion.com/embed/video/x7f2sww?autoplay=1",
      secure_url: "https://www.dailymotion.com/embed/video/x7f2sww?autoplay=1",
      type: "text/html",
      width: "640",
      height: "360",
    },
  };
  expect(response).toStrictEqual(expected);
});
