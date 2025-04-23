
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const pixelPath = path.join(__dirname, "pixel.png");
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/track/:id", (req, res) => {
  const { id } = req.params;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"];

  const SELF_IP = "123.123.123.123";
  if (ip === SELF_IP) return res.sendFile(pixelPath);

  fs.appendFileSync("tracking.log", `${new Date().toISOString()} - Opened by: ${ip}, ID: ${id}, UA: ${userAgent}\n`);

  res.sendFile(pixelPath);
});

app.listen(PORT, () => console.log(`Pixel server running on port ${PORT}`));
app.get("/generator", (req, res) => {
  res.sendFile(path.join(__dirname, "generator.html"));
});
