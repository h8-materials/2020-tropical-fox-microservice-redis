const express = require("express");
const app = express();
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

app.get("/users", async (req, res) => {
  // cek redis
  // kalo ada return
  // kalo gak ada request ke service
  const usersCache = await redis.get("users");
  if (usersCache !== null) {
    res.status(200).json(JSON.parse(usersCache));
  } else {
    const { data } = await axios.get("http://localhost:3001/users");
    // set data ke redis
    await redis.set("users", JSON.stringify(data));
    res.status(200).json(data);
  }
});

app.post("/users", async (req, res) => {
  try {
    const { data } = await axios.post("http://localhost:3001/users", req.body);
    redis.del("users");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
