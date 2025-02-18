import { Kafka } from "kafkajs";
import { simulateUser } from "./user";

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

// Spawn User
export const consumer = kafka.consumer({ groupId: "user-group" });

export async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-spawn", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { count } = JSON.parse(message.value!.toString());
      for (let i = 0; i < count; i++) {
        simulateUser();
      }
    },
  });
}
