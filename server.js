const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5000;

const corsOptions = {
  origin: "https://ransom-ofqkfysuj-aaravshukla15s-projects.vercel.app",
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/api/ransomwareData", (req, res) => {
  const filePath = path.join(__dirname, "data", "ransomwareData.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading ransomware data:", err);
      return res.status(500).json({ error: "Failed to read data" });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData); // Send data to frontend
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
