#!/usr/bin/env node
/**
 * Testing the 8-job.js file functionality and ensuring that all works well
 * 1. Should handle the case where jobs are not objects
 * 2. Should pass the test when the job was created succefully
 */

// 8-job.js

import { createQueue } from 'kue';
import { expect } from 'chai';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  const queue = createQueue();

  before((done) => {
    queue.testMode.enter();
    done();
  });

  after((done) => {
    queue.testMode.clear();
    queue.testMode.exit();
    done();
  });

  it('should display an error message when jobs is not an array', (done) => {
    expect(() => createPushNotificationsJobs('noJobs', queue)).throws('Job is not an array');
    done();
  });

  it('should create two new jobs', (done) => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account'
      }
    ];

    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
    expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);
    done();
  });
});

