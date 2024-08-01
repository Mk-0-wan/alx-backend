#!/usr/bin/env node
/* Making a simple redis client connection
 * Creating new values for the database
 * Retriving the data from the redis database
 * */

import { createClient, print } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis client not connected to the server:', err));
client.on('ready', () => console.log('Redis client connected to the server'));

function setNewSchool(schoolName, value) {
  if (schoolName !== 'undefined' && value !== 'undefined') {
    client.set(schoolName, value, print);
  }
}

function displaySchoolValue(schoolName) {
  if (schoolName !== 'undefined') {
    client.get(schoolName, (_, value) => {
      console.log(value);
    })
  }
}

client.on('connect', () => {
  displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  displaySchoolValue('HolbertonSanFrancisco');
});
