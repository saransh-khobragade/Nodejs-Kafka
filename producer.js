// Kafka producer that sends messages to a topic
const { kafka } = require('./config/kafka.config');

const TOPIC_NAME = 'demo-topic';

async function createProducer() {
  const producer = kafka.producer();
  await producer.connect();
  console.log('Producer connected successfully');
  return producer;
}

async function sendMessage(producer, topic, messages) {
  try {
    await producer.send({
      topic,
      messages: messages.map(msg => ({
        value: typeof msg === 'string' ? msg : JSON.stringify(msg),
        timestamp: Date.now().toString()
      }))
    });
    console.log(`Message sent successfully to topic: ${topic}`);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

async function main() {
  const producer = await createProducer();
  
  // Send sample messages
  const messages = [
    { id: 1, message: 'Hello from Kafka Producer!', timestamp: new Date().toISOString() },
    { id: 2, message: 'This is a demo message', timestamp: new Date().toISOString() },
    { id: 3, message: 'Kafka is working!', timestamp: new Date().toISOString() }
  ];

  console.log('\nSending messages...\n');
  
  for (const msg of messages) {
    await sendMessage(producer, TOPIC_NAME, [msg]);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between messages
  }

  await producer.disconnect();
  console.log('\nProducer disconnected');
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down producer...');
  process.exit(0);
});

main().catch(console.error);

