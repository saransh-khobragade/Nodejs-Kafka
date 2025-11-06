// Kafka consumer that reads messages from a topic
const { kafka } = require('./config/kafka.config');

const TOPIC_NAME = 'demo-topic';
const GROUP_ID = 'demo-consumer-group';

async function createConsumer() {
  const consumer = kafka.consumer({ groupId: GROUP_ID });
  await consumer.connect();
  console.log('Consumer connected successfully');
  return consumer;
}

async function subscribeAndConsume(consumer, topic) {
  await consumer.subscribe({ topic, fromBeginning: true });
  console.log(`Subscribed to topic: ${topic}\n`);
  console.log('Waiting for messages...\n');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      const timestamp = message.timestamp;
      
      console.log(`[${new Date(parseInt(timestamp)).toISOString()}]`);
      console.log(`Topic: ${topic}`);
      console.log(`Partition: ${partition}`);
      console.log(`Offset: ${message.offset}`);
      console.log(`Message: ${value}`);
      console.log('---\n');
    }
  });
}

async function main() {
  const consumer = await createConsumer();
  
  try {
    await subscribeAndConsume(consumer, TOPIC_NAME);
  } catch (error) {
    console.error('Error in consumer:', error);
    await consumer.disconnect();
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down consumer...');
  process.exit(0);
});

main().catch(console.error);

