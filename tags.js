const ogTags = [
  {
    name: "title",
    fieldName: "og:title",
    hasOtherProperties: false,
  },
  {
    name: "type",
    fieldName: "og:type",
    hasOtherProperties: false,
  },

  {
    name: "url",
    fieldName: "og:url",
    hasOtherProperties: false,
  },
  {
    name: "description",
    fieldName: "og:description",
    hasOtherProperties: false,
  },
  {
    name: "determiner",
    fieldName: "og:determiner",
    hasOtherProperties: false,
  },
  {
    name: "locale",
    fieldName: "og:locale",
    hasOtherProperties: false,
  },
  {
    name: "locale_alternate",
    fieldName: "og:locale:alternate",
    hasOtherProperties: false,
  },
  {
    name: "site_name",
    fieldName: "og:site_name",
    hasOtherProperties: false,
  },
  {
    name: "image",
    alternateName: "url",
    fieldName: "og:image",
    hasOtherProperties: true,
    properties: [
      {
        name: "url",
        fieldName: "og:image:url",
      },
      {
        name: "secure_url",
        fieldName: "og:image:secure_url",
      },
      {
        name: "type",
        fieldName: "og:image:type",
      },
      {
        name: "width",
        fieldName: "og:image:width",
      },
      {
        name: "height",
        fieldName: "og:image:height",
      },
      {
        name: "alt",
        fieldName: "og:image:alt",
      },
    ],
  },
  {
    name: "video",
    alternateName: "url",
    fieldName: "og:video",
    hasOtherProperties: true,
    properties: [
      {
        name: "url",
        fieldName: "og:video:url",
      },
      {
        name: "secure_url",
        fieldName: "og:video:secure_url",
      },
      {
        name: "type",
        fieldName: "og:video:type",
      },
      {
        name: "width",
        fieldName: "og:video:width",
      },
      {
        name: "height",
        fieldName: "og:video:height",
      },
    ],
  },
  {
    name: "audio",
    alternateName: "url",
    fieldName: "og:audio",
    hasOtherProperties: true,
    properties: [
      {
        name: "url",
        fieldName: "og:audio:url",
      },
      {
        name: "secure_url",
        fieldName: "og:audio:secure_url",
      },
      {
        name: "type",
        fieldName: "og:audio:type",
      },
    ],
  },
];

const otherTags = [
  {
    name: "title",
    fieldName: "title",
    hasOtherProperties: false,
  },
  {
    name: "description",
    fieldName: "description",
    hasOtherProperties: false,
  },
];

module.exports = { ogTags, otherTags };
