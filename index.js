const express = require("express");
const { generateLinks } = require("./links");
// const fs = require("fs");

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

app.get("/link", (req, res) => {
  const links = generateLinks(req.query.extension);
  res.json({ links });
});

app.get("/download", (req, res) => {
  res.download(`${__dirname}/files/hello_world.${req.query.extension}`);
});

app.get(`/file`, (req, res) => {
  res.sendFile(`${__dirname}/files/hello_world.${req.query.extension}`, {
    headers: {
      "Content-Type": `text/${req.query.subtype}`,
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is up at ${PORT}`);
});
