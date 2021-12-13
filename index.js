const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static(__dirname));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const options = ["/plain", "/html", "/xml"]
// const routerOptions = []
options.forEach(option => {
  app.get(option, (req,res) => {
    res.type(`text${option}`)

    const file = fs.readFileSync(`files/hello_world.${req.query.type}`, 'utf-8')
    res.send(file)
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is up at ${PORT}`);
});
