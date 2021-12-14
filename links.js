const mimeTypeBase = "text/";
const mimeSubTypes = ["plain", "html", "xml"];
const basePath = "/file";

const generateLinks = (extension) => {
  const links = mimeSubTypes.map((mimeSubType) => {
    const text = mimeTypeBase + mimeSubType;
    const href = basePath + `?extension=${extension}&subtype=${mimeSubType}`;

    return { text, href };
  });

  return [
    ...links,
    {
      text: "Скачать с подходящим mime-type",
      href: `/download?extension=${extension}`,
    },
  ];
};

module.exports = {
  generateLinks,
};
