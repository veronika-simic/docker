const express = require("express");
const redis = require("redis");
const process = require("process");
const app = express();
/* we have to specify where is redis running, the name comes from the docker-compose
 docker sees this name redis-server and it gets redirected to that container
*/
const client = redis.createClient({
  host: "redis-server",
});
client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send("Number of visits is " + visits);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
