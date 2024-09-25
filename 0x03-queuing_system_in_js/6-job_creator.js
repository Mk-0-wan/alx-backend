#!/usr/bin/env node
/*
 * Making a simple Kue(redis queuing system in nodejs)
 * Understanding how jobs work
 * First you will need to create a que, then the object of the que
 * Check the status of the kue, was it successful, failed, completed
 * Handle any other global event that you would like to check out
 */
import { createQueue } from 'kue';

const queue = createQueue();

const job = queue.create('push_notification_code', {
  phoneNumber: string,
  message: string,
}).save((err) => {
  if (!err) console.log(`Notification job created: ${job.id}`);
})

job.on('completed', () => console.log('Notification job completed'));
job.on('failed', () => console.log('Notification failed'));
