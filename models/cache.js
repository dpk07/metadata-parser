module.exports = class InMemoryCache {
  constructor() {
    this.map = new Map();
    setTimeout(() => {
      this.refresh();
    }, 1000 * 60 * 60 * 24);
  }
  /**
   * Puts value in the cache.
   * @param {*} key
   * @param {*} value
   */
  put(key, value) {
    this.map.set(key, value);
  }
  /**
   * Checks if the cache already has a value for this key.
   * @param {*} key
   */
  exists(key) {
    return this.map.has(key);
  }
  /**
   * Returns the value associated with this key.
   * @param {*} key
   */
  get(key) {
    return this.map.get(key);
  }
  /**
   * Invalidates all the cache entries.
   */
  refresh() {
    this.map.clear();
  }
};
