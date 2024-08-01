#!/usr/bin/env node
/*
 * Making a simple subscriber using nodejsRedis
 * First create a client
 * Make the client a subscriber
 * Listen to the connection from `mychannel`
 * Console.log all the message you recieve from the channel
 */

import { createClient } from 'redis';

const subscriber = createClient();

async function setupSubscriber(channel) {

  // make a connection to the redis server
  await subscriber.connect;

  subscriber.on('error', (err) => console.log('Redis client not connected to the server:', err));
  subscriber.on('ready', () => console.log('Redis client connected to the server'));

  // adding an event listener handler
  subscriber.on('message', (channel, message) => {
    if (message === 'KILL_SERVER') {
      subscriber.unsubscribe(channel);
      subscriber.quit();
    }
    console.log(message);
  });

  // Subscribe to a channel
  await subscriber.subscribe(channel);
}

setupSubscriber('holberton school channel').catch(console.error);
