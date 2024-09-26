#!/usr/bin/env node
/**
 * Making a simple reservation system with redis and express
 * Function that takes in the number of seats and sets it to a redis server
 *
 */

// make the redis client
import express from 'express'; 
import { createClient } from 'redis';
import { createQueue } from 'kue';
import { promisify } from 'util'

const client = createClient();
const queue = createQueue();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const availableSeats = 50;
const port = 1245;
const app = express();
let reservationEnabled = true;

client.connect;
client.on('ready', () => console.log('Client connection to redis was succeful'));
client.on('error', () => console.log('Client connection to redis failed'));

// asynchronously set the number default number of seats
(async () => {
  await setAsync('available_seats', availableSeats);
})();

// handle setting new requests
async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

// handles getting cached available seats
async function getCurrentAvailableSeats() {
  try {
    const data = await getAsync('available_seats');
    // console.log(data);
    return Number(data);
  } catch (err) {
    throw new Error('Error feching data from redis: ', err);
  }
}

app.get('/available_seats', async (req, res) => {
  try {
    const seats = await getCurrentAvailableSeats();
    res.json({'numberOfAvailableSeats': String(seats) });
  } catch (err) {
    res.json({'Error': err});
  }
})

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    res.json({'status': 'Reservation are blocked'});
  }

  // each req make a new job(reservation of one seat)
  const job = queue.create('reserve_seat').save((err) => {
    if (!err) {
      res.json({'status': 'Reservation in process'});
    } else {
      res.json({'status': 'Reservation failed'});
    }
  });

  job.on('complete', () => console.log(`Seat reservation job ${job.id} completed`));
  job.on('failure', (err) => console.log(`Seat reservation job ${job.id} failed: ${err}`));

})

app.get('/process', async (req, res) => {

  res.json({'status': 'Queue processing'});

  // process each req(reservation of seats)
  queue.process('reserve_seat', async (_, done) => {
    try {
      const currentAvailableSeats = await getCurrentAvailableSeats(); 
      if (currentAvailableSeats >= 0) {
        await reserveSeat(currentAvailableSeats - 1);
        if (currentAvailableSeats - 1  === 0) { reservationEnabled = false }
        done();
      } else {
        done (new Error('Not enough seats available'));
      }
    } catch (err) {
      done(new Error(err));
    }
  })
})

app.listen(port, () => console.log(`Server running on port : ${port}`));
