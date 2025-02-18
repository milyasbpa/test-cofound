// src/orchestrator.ts
import { getUsersToSpawn } from "./sineWave";
import { sendUserSpawnRequest } from "./kafka";
import { maxUsersPerSecond, waveWidth } from "./config";

let startTime = Date.now();

export async function spawnUsers() {
  const elapsedTime = Date.now() - startTime;
  const usersToSpawn = getUsersToSpawn(
    elapsedTime,
    maxUsersPerSecond,
    waveWidth
  );
  console.log(`Spawning ${usersToSpawn} users...`);

  await sendUserSpawnRequest(usersToSpawn);
}
