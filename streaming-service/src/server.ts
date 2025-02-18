import { startConsumer } from "./kafka";

type Stream = { videoId: string; users: Map<string, NodeJS.Timeout> };
const activeStreams: Map<string, Stream> = new Map();
const maxUsersPerServer = 100;

export function handleEvent(event: any) {
  const { userId, eventType, videoId, seekPosition } = event;
  console.log(event, "ini consumer");

  if (eventType === "play") {
    if (!activeStreams.has(videoId)) {
      activeStreams.set(videoId, { videoId, users: new Map() });
    }

    const stream = activeStreams.get(videoId)!;
    if (!stream.users.has(userId)) {
      stream.users.set(userId, startHeartbeat(userId, videoId));
    }
  } else if (eventType === "seek") {
    console.log(
      `User ${userId} seeks video ${videoId} to position ${seekPosition}`
    );
  } else if (eventType === "exit" || eventType === "pause") {
    activeStreams.get(videoId)?.users.delete(userId);
    if (activeStreams.get(videoId)?.users.size === 0) {
      activeStreams.delete(videoId);
    }
  }

  checkScaling();
}

function startHeartbeat(userId: string, videoId: string) {
  return setInterval(() => {
    console.log(`Heartbeat: User ${userId} is still watching video ${videoId}`);
  }, 10000);
}

function checkScaling() {
  let totalUsers = Array.from(activeStreams.values()).reduce(
    (sum, stream) => sum + stream.users.size,
    0
  );
  let requiredServers = Math.ceil(totalUsers / maxUsersPerServer);

  console.log(
    `Total Users: ${totalUsers}, Required Servers: ${requiredServers}`
  );
}

startConsumer(handleEvent);
