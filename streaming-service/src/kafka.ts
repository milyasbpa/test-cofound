// src/kafka.ts
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "streaming-server",
  brokers: ["localhost:9092"],
});

export const consumer = kafka.consumer({ groupId: "streaming-group" });

export async function startConsumer(handleEvent: (event: any) => void) {
  await consumer.connect();
  await consumer.subscribe({ topic: "video-events", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (message.value) {
        handleEvent(JSON.parse(message.value.toString()));
      }
    },
  });
}
