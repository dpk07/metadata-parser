module.exports = class Tag {
  constructor(tag) {
    this.tag = tag;
  }
  /**
   * Checks if the tag was found in the html.
   */
  doesTagExist = () => {
    return this.tag.length > 0;
  };
  /**
   * Returns the content attribute of the tag.
   */
  getContent = () => {
    return this.tag.attr("content");
  };
};
