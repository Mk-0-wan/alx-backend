#!/usr/bin/env node
/**
 * This is a simple implementation of a kue job processing
 * understanding how to send notification from one redis connection
 * to another.
 */

import { createQueue } from 'kue';

const queue = createQueue();

function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

queue.process('push_notification_code', (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message);
  done();
});

