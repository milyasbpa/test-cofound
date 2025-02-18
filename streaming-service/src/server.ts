import { startConsumer } from "./kafka";

type Stream = { videoId: string; users: Set<string> };
const activeStreams: Map<string, Stream> = new Map();
const maxUsersPerServer = 100;

export function handleEvent(event: any) {
  const { userId, eventType, videoId } = event;
  console.log(event, "ini consumer");

  if (eventType === "play") {
    if (!activeStreams.has(videoId)) {
      activeStreams.set(videoId, { videoId, users: new Set() });
    }
    activeStreams.get(videoId)?.users.add(userId);
  } else if (eventType === "exit" || eventType === "pause") {
    activeStreams.get(videoId)?.users.delete(userId);
    if (activeStreams.get(videoId)?.users.size === 0) {
      activeStreams.delete(videoId);
    }
  }

  checkScaling();
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
