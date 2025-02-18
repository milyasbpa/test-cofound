export let maxUsersPerSecond = 100; // Peak users per second
export let waveWidth = 60; // 1-minute oscillation
export let errorFactor = 0.0; // 0 (perfect data) to 1 (completely broken)

export const config = {
  maxUsersPerSecond, // Peak users per second
  waveWidth, // 1-minute oscillation (in seconds)
  errorFactor, // 0 (perfect data) to 1 (completely broken)
};

export function updateConfig(newConfig: Partial<typeof config>) {
  if (newConfig.maxUsersPerSecond !== undefined)
    maxUsersPerSecond = newConfig.maxUsersPerSecond;
  if (newConfig.waveWidth !== undefined) waveWidth = newConfig.waveWidth;
  if (newConfig.errorFactor !== undefined) errorFactor = newConfig.errorFactor;
}
