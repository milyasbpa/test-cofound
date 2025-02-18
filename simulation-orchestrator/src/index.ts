// src/index.ts
import express from "express";
import cron from "node-cron";
import { spawnUsers } from "./orchestrator";
import { updateConfig } from "./config";

const app = express();
app.use(express.json());

// Adjust parameters dynamically
app.post("/update-config", (req, res) => {
  updateConfig(req.body);
  res.json({ message: "Config updated", newConfig: req.body });
});

// Schedule user spawning every second
cron.schedule("* * * * * *", spawnUsers);

app.listen(5000, () => console.log("Orchestrator running on port 5000"));
