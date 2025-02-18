// src/kafka.ts
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "orchestrator",
  brokers: ["localhost:9092"],
});
export const producer = kafka.producer();

export async function sendUserSpawnRequest(count: number) {
  await producer.connect();
  await producer.send({
    topic: "user-spawn",
    messages: [{ value: JSON.stringify({ count }) }],
  });
}
