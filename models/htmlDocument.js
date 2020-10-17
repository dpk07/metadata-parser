const Tag = require("./tag");
module.exports = class $ {
  constructor(loadedHtml) {
    this.$ = loadedHtml;
  }
  /**
   * Finds the tag in loaded html document by property
   * @param {*} property
   */
  getTagByProperty = (property) => {
    return new Tag(this.$(`meta[property="${property.fieldName}"]`));
  };
  /**
   * Finds the tag in loaded html document by name
   * @param {*} property
   */
  getTagByName = (name) => {
    return new Tag(this.$(`meta[name="${name.fieldName}"]`));
  };
};
