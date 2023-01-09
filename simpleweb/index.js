const express = require("express");

const app = express();
/*  when someone visits the page she will see Hi there */
app.get("/", (req, res) => {
  res.send("Hi there");
});

app.listen(8080, () => {
  console.log("Listening on port 808");
});
