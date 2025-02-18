// src/sineWave.ts
import { sin, pi } from "mathjs";

export function getUsersToSpawn(
  time: number,
  maxUsersPerSecond: number,
  waveWidth: number
): number {
  const period = waveWidth * 1000; // Convert seconds to ms
  return Math.round(
    (maxUsersPerSecond * (sin((2 * pi * time) / period) + 1)) / 2
  );
}
