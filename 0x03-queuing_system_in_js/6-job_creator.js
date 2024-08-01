#!/usr/bin/env node
/**
 * Simple js function that creates a job using Kue
 */

import { createQueue } from 'kue'

const queue = createQueue();

const job = queue.create('push_notification_code', {
  phoneNumber: '',
  message: '',
}).save((err) => {
  if (!err) {
    console.log(`Notification job created: ${job.id}`);
  }
});

job.on('completed', () => console.log('Notification job completed'));
job.on('failed', () => console.log('Notification failed'));
