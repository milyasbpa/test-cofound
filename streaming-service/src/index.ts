import { startConsumer } from './kafka';
import { handleEvent } from './server';

async function main() {
  console.log('Streaming Server is starting...');
  await startConsumer(handleEvent);
}

main().catch((error) => {
  console.error('Error starting the Streaming Server:', error);
});