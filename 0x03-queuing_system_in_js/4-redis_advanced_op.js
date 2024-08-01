#!/usr/bin/env node
/* Making a client connection
 * Creating a new hash dataset
 * Using the old method without async
 */

import { createClient, print } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis client not connected to the server:', err));
client.on('ready', () => console.log('Redis client connected to the server'));

client.on('connect', () => {
  client.hset('HolbertonSchools', 'Portland', '50', print);
  client.hset('HolbertonSchools', 'Seattle', '80', print);
  client.hset('HolbertonSchools', 'New York', '20', print);
  client.hset('HolbertonSchools', 'Bogota', '20', print);
  client.hset('HolbertonSchools', 'Cali', '40', print);
  client.hset('HolbertonSchools', 'Paris', '2', print);

  client.hgetall('HolbertonSchools', (err, value) => {
    if (err) {
      console.error('Error fetching data:', err);
    } else {
      console.log(JSON.stringify(value, null, 2));
    }
  });
});

