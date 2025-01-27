#!/usr/bin/env node
/**
 * Creating multiple jobs
 */

import { createQueue } from "kue";


const queue = createQueue();
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

// on completion
queue.on('job complete', (id) => {
  console.log(`Notification job #${id} completed`);
});

// once a program fails
queue.on('job failed', (id, errorMessage) => {
  console.log(`Notification job #${id} failed: ${errorMessage}`);
});

// keeping track of a job process
queue.on('job progress', (id, progress) => {
  console.log(`Notification job #${id} ${progress}% complete`);
});

jobs.forEach((job) => {
  const newJob = queue.create('push_notification_code_2', job);
  newJob.save((err) => {
    if (!err) console.log(`Notification job created: ${newJob.id}`);
    else console.log('Encounterd an error', err);
  });

  // Not recommended at the Job level handled all at the queue.level
  // newJob.on('completed', () => console.log(`Notification job ${newJob.id} completed`));
  // newJob.on('failed', (err) => console.log(`Notification job ${newJob.id} failed: ${err}`));
  // newJob.on('progress', (progress) => console.log(`Notification job ${newJob.id} ${progress}% complete`));
})
