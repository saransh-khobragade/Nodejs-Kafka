// Kafka configuration settings
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'kafka-demo-client',
  brokers: ['localhost:9092'],
  retry: {
    initialRetryTime: 100,
    retries: 8
  }
});

module.exports = { kafka };

