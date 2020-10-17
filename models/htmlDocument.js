const Tag = require("./tag");
module.exports = class $ {
  constructor(loadedHtml) {
    this.$ = loadedHtml;
  }

  getTagByProperty = (property) => {
    return new Tag(this.$(`meta[property="${property.fieldName}"]`));
  };
  getTagByName = (name) => {
    return new Tag(this.$(`meta[name="${name.fieldName}"]`));
  };
};
