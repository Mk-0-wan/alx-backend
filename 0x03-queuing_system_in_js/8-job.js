#!/usr/bin/env node
/**
 * Making a function that will help me create a job
 * Job should be an array of objects
 * object should contain:
 *  phoneNumber: string,
 *  message: string,
 *
 *  Will be handling all the queue envents at the Global level
 */

import { createQueue } from "kue";


const queue = createQueue();

// on completion
queue.on('job complete', (id) => {
  console.log(`Notification job ${id} completed`);
});

// once a program fails
queue.on('job failed', (id, errorMessage) => {
  console.log(`Notification job ${id} failed: ${errorMessage}`);
});

// keeping track of a job process
queue.on('job progress', (id, progress) => {
  console.log(`Notification job ${id} ${progress}% complete`);
});


function createPushNotificationsJobs(jobs, queue) {
  if (Array.isArray(jobs)) {
    jobs.forEach((job) => {
      const newJob = queue.create('push_notification_code_3', job);
      newJob.save((err) => {
        if (!err) console.log(`Notification job created: ${newJob.id}`);
        else console.log('Encounterd an error', err);
      });
    })
  } else {
    throw new Error('Job is not an array');
  }
}

module.exports = createPushNotificationsJobs;
