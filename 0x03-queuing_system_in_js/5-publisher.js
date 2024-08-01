#!/usr/bin/env node
/*
 * Publishing messages to a Redis channel using nodejsRedis
 * Ensure the client connects before publishing
 * Publish messages at specified intervals
 * Stop, and quit the process when "KILL_SERVER" message is published
 */

import { createClient } from 'redis';

const publisher = createClient();

async function setupPublisher() {

  publisher.on('error', (err) => console.log('Redis client not connected to the server:', err));
  publisher.on('ready', () => console.log('Redis client connected to the server'));
  
  await publisher.connect;

  function publishMessage(message, time) {
    setTimeout(() => {
      console.log('About to send', message);
      publisher.publish('holberton school channel', message);
    }, time);
  }

  publishMessage("Holberton Student #1 starts course", 100);
  publishMessage("Holberton Student #2 starts course", 200);
  publishMessage("KILL_SERVER", 300);
  publishMessage("Holberton Student #3 starts course", 400);
}

setupPublisher().catch(console.error);

