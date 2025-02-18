import { sendEvent } from "./kafka";

type UserEvent = {
  userId: string;
  eventType: string;
  videoId?: string;
  timestamp: number;
  seekPosition?: number;
};

const userId = `user-${Math.floor(Math.random() * 10000)}`;
const videos = ["vid-101", "vid-102", "vid-103"]; // Sample video IDs

export async function simulateUser() {
  let watching = false;
  let videoId = videos[Math.floor(Math.random() * videos.length)];
  let seekPosition = 0;
  let heartbeatInterval: NodeJS.Timeout | null = null;

  // Function to send heartbeat event every 10 seconds
  function startHeartbeat() {
    return setInterval(() => {
      sendEvent({
        userId,
        eventType: "heartbeat",
        videoId,
        timestamp: Date.now(),
      });
    }, 10000);
  }

  while (Math.random() > 0.1) {
    // 10% chance of user leaving
    const eventType = getRandomEvent(watching);
    const event: UserEvent = {
      userId,
      eventType,
      videoId,
      timestamp: Date.now(),
      seekPosition,
    };

    if (eventType === "play") {
      watching = true;
      if (!heartbeatInterval) {
        heartbeatInterval = startHeartbeat();
      }
    }
    if (eventType === "pause" || eventType === "exit") {
      watching = false;
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
      }
    }
    if (eventType === "seek") seekPosition = Math.floor(Math.random() * 300); // Random seek
    await sendEvent(event);
    await sleep(getRandomWaitTime(eventType));
  }

  await sendEvent({ userId, eventType: "exit", timestamp: Date.now() });
}

function getRandomEvent(watching: boolean) {
  const events = watching ? ["pause", "seek", "exit"] : ["play"];
  return events[Math.floor(Math.random() * events.length)];
}

function getRandomWaitTime(eventType: string) {
  return eventType === "play" ? 10000 : Math.floor(Math.random() * 3000); // 10s for play, others random
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

simulateUser();
