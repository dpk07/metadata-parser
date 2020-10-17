const InMemoryCache = require("../models/cache");
let cache;

beforeAll(() => {
  cache = new InMemoryCache();
});

test("Should add key value to cache properly.", () => {
  cache.put("test", {});
  expect(cache.exists("test")).toBe(true);
  expect(cache.get("test")).toStrictEqual({});
});

test("Should refresh the cache.", () => {
  cache.refresh();
  expect(cache.map.values.length).toBe(0);
});
