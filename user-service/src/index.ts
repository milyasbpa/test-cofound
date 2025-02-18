import express from "express";
import { simulateUser } from "./user";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "Hello from Express with TypeScript!" });
});

app.post("/addOneUser", (_, res) => {
  simulateUser();
  res.json({ message: "User simulation started." });
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
