# Kafka Demo Project - Node.js

A simple Kafka demonstration project using Node.js and KafkaJS, with Docker Compose for easy setup.

## Prerequisites

- Docker and Docker Compose installed
- Node.js (v14 or higher)
- npm or yarn

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start Kafka and Zookeeper using Docker Compose:**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - Zookeeper on port `2181`
   - Kafka on port `9092`

3. **Wait for Kafka to be ready** (about 10-15 seconds):
   ```bash
   docker-compose logs -f kafka
   ```
   Wait until you see "started (kafka.server.KafkaServer)" message.

## Usage

### Start the Consumer

In one terminal, start the consumer to receive messages:

```bash
npm run start:consumer
```

### Start the Producer

In another terminal, start the producer to send messages:

```bash
npm run start:producer
```

The producer will send 3 sample messages to the `demo-topic` topic, and the consumer will display them.

## Development Mode

For development with auto-reload (requires Node.js 18+):

```bash
# Terminal 1 - Consumer
npm run dev:consumer

# Terminal 2 - Producer
npm run dev:producer
```
