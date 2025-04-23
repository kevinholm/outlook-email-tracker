const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const pixelPath = path.join(__dirname, "pixel.png");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(__dirname)); // Server static files like index.html, pixel.png

// Sørg for logfil eksisterer
const logPath = path.join(__dirname, "tracking.log");
if (!fs.existsSync(logPath)) {
  fs.writeFileSync(logPath, "");
}

// 🎯 Tracking pixel route
app.get("/track/:id", (req, res) => {
  const { id } = req.params;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"];

  const SELF_IP = "123.123.123.123"; // <- Udskift med din egen IP hvis du vil udelukke dig selv
  if (ip === SELF_IP) return res.sendFile(pixelPath);

  const log = `${new Date().toISOString()} - Opened by: ${ip}, ID: ${id}, UA: ${userAgent}\n`;
  fs.appendFileSync(logPath, log);
  res.sendFile(pixelPath);
});

// 🏠 Hovedside
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 📊 Dashboard (live logvisning)
app.get("/dashboard", (req, res) => {
  try {
    const data = fs.readFileSync(logPath, "utf8");
    res.setHeader("Content-Type", "text/plain");
    res.send(data);
  } catch (err) {
    res.status(500).send("Kunne ikke læse tracking-log.");
  }
});

// Backup route til generator hvis du har en generator.html
app.get("/generator", (req, res) => {
  res.sendFile(path.join(__dirname, "generator.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server kører på http://localhost:${PORT}`);
});
