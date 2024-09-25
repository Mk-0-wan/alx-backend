#!/usr/bin/env node
/*
 * Making a simple subscriber using nodejsRedis
 * Create a subscriber
 * Listen to the connection from `mychannel`
 * Console.log all the message you recieve from the channel
 */

import { createClient } from 'redis';

const subscriber = createClient();

async function setupSubscriber(channel) {

  // make a connection to the redis server
    await subscriber.connect;

  // check the connection status
    subscriber.on('error', (err) => console.log('Redis client not connected to the server:', err));
    subscriber.on('ready', () => console.log('Redis client connected to the server'));

    // adding an event listener handler
    subscriber.on('message', (channel, message) => {
      // handling special messages sent by the publisher
      if (message === 'KILL_SERVER') {
        subscriber.unsubscribe(channel);
        subscriber.quit();
      }
      // log each message recieved by the publisher
      console.log(message);
    });

    // Subscribe to a channel
    await subscriber.subscribe(channel);
  }

  setupSubscriber('holberton school channel').catch(console.error);
