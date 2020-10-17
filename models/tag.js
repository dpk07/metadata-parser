module.exports = class Tag {
  constructor(tag) {
    this.tag = tag;
  }
  doesTagExist = () => {
    return this.tag.length > 0;
  };
  getContent = () => {
    return this.tag.attr("content");
  };
};
