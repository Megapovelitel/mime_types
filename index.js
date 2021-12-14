const express = require("express");
const { generateLinks } = require("./links");

const app = express();

app.use(express.static(__dirname));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Content-Type-Options"
  );
  next();
});

const getFilePath = (extension) => {
  return `${__dirname}/files/hello_world.${extension}`;
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is up at ${PORT}`);
});

app.get("/link", (req, res) => {
  const links = generateLinks(req.query.extension);
  res.json({ links });
});

app.get("/download", (req, res) => {
  const path = getFilePath(req.query.extension);
  res.download(path);
});

app.get(`/file`, (req, res) => {
  const path = getFilePath(req.query.extension);
  res.sendFile(path, {
    headers: {
      "Content-Type": `text/${req.query.subtype}`,
    },
  });
});
