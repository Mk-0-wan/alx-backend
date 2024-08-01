#!/usr/bin/env node
/* Making a client connection
 * Creating a new hash dataset
 * Using the old method without async 
 * */

import { createClient, print } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis client not connected to the server:', err));
client.on('ready', () => console.log('Redis client connected to the server'));
client.on('connect', () => {
  client.hSet('HolbertonSchools', {
    Portland: '50', print,
    Seattle: '80', print,
    New York: '20', print,
    Bogota: '20', print,
    Cali: '40', print,
    Paris: '2', print,
  })

  client.hGetAll('HolbertonSchools', (_, value) => {
    console.log(JSON.stringify(value, null, 2));
  })
});
