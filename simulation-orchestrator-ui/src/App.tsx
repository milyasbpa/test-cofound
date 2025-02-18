import { useState } from "react";
import "./App.css";

export default function App() {
  const [maxUsers, setMaxUsers] = useState(100);
  const [waveWidth, setWaveWidth] = useState(60);
  const [errorFactor, setErrorFactor] = useState(0);

  async function updateConfig() {
    await fetch("http://localhost:5000/update-config", {
      method: "POST",
      body: JSON.stringify({
        maxUsersPerSecond: maxUsers,
        waveWidth,
        errorFactor,
      }),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <div className={"container"}>
      <h1>Simulation Control</h1>
      <label>Max Users Per Second: {maxUsers}</label>
      <input
        type="range"
        min="10"
        max="500"
        value={maxUsers}
        onChange={(e) => setMaxUsers(Number(e.target.value))}
      />

      <label>Wave Width (seconds): {waveWidth}</label>
      <input
        type="range"
        min="10"
        max="120"
        value={waveWidth}
        onChange={(e) => setWaveWidth(Number(e.target.value))}
      />

      <label>Error Factor: {errorFactor}</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={errorFactor}
        onChange={(e) => setErrorFactor(Number(e.target.value))}
      />

      <button onClick={updateConfig}>Update</button>
    </div>
  );
}
