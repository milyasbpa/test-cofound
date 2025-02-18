import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "user-service",
  brokers: ["localhost:9092"], // Change if using cloud Kafka
});

export const producer = kafka.producer();

export async function sendEvent(event: any) {
  await producer.connect();

  await producer.send({
    topic: "video-events",
    messages: [{ value: JSON.stringify(event) }],
  });
}
