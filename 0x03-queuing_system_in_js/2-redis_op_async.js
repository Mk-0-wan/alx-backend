#!/usr/bin/env node
/* Making a simple redis client connection
 * Creating new values for the database
 * Retriving the data from the redis database
 * */
import { createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient();

client.on('error', err => console.log('Redis client not connected to the server:', err));
client.on('ready', () => console.log('Redis client connected to the server'));

const getAsync = promisify(client.get).bind(client);

function setNewSchool(schoolName, value) {
  if (typeof schoolName !== 'undefined' && typeof value !== 'undefined') {
    client.set(schoolName, value, print);
  }
}

async function displaySchoolValue(schoolName) {
  if (typeof schoolName !== 'undefined') {
    const value = await getAsync(schoolName);
    console.log(value);
  }
}

client.on('connect', async() => {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
});
