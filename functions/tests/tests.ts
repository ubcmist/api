import { expect } from 'chai';
import 'mocha';
import * as WebRequest from 'web-request';
import * as lib from '../src/index';

describe('Testing cloud functions for the BioAPI locally...', () => {

  const addBioURL = 'http://localhost:5000/biosignal-e309a/us-central1/onBioStore';
  const addBioURLRemote = 'https://us-central1-biosignal-e309a.cloudfunctions.net/onBioStore';

  it('Check data, valid data', () => {
    let newData = {
      userID: 6242819361,
      metrics: {
        hr: [89, 72, 77, 75,78],
        gsr: [100, 102, 105, 109, 88],
        temp: [36, 37, 37, 36, 37]
      },
      time: 5
    };
    expect(lib.checkValidData(newData)).to.equals(true);
  });

  it('Test biometric store local, new user', () => {
    let newData = {
      userID: 6243819331,
      metrics: {
        hr: [89, 72, 77, 75,78],
        gsr: [100, 102, 105, 109, 88],
        temp: [36, 37, 37, 36, 37]
      },
      time: 5
    };
    WebRequest.post(addBioURL, {json: true}, newData)
      .then(value => {
        console.log(value.statusCode);
        console.log(value.message);
        expect(value.statusCode).to.equals(200);
      })
      .catch(err => {
        expect.fail();
      });
  });

  it('Test biometric store remote, new user', () => {
    let newData = {
      userID: 7243819361,
      metrics: {
        hr: [89, 72, 77, 75,78],
        gsr: [100, 102, 105, 109, 88],
        temp: [36, 37, 37, 36, 37]
      },
      time: 5
    };
    WebRequest.post(addBioURLRemote, {json: true}, newData)
      .then(value => {
        console.log(value.statusCode);
        console.log(value.message);
        expect(value.statusCode).to.equals(200);
      })
      .catch(err => {
        expect.fail();
      });
  });

  it('Test biometric store, existing user', () => {
    let newData = {
      userID: 6343819361,
      metrics: {
        hr: [89, 72, 77, 75,78],
        gsr: [100, 102, 105, 109, 88],
        temp: [36, 37, 37, 36, 37]
      },
      time: 5
    };
    WebRequest.post(addBioURL, {json: true}, newData)
      .then(value1 => {
        WebRequest.post(addBioURL, {json: true}, newData)
          .then(value => {
            console.log(value.statusCode);
            console.log(value.message);
            expect(value.statusCode).to.equals(200);
          })
          .catch(err => {
            expect.fail();
          });
      })
      .catch(err => {
        expect.fail();
      });
  });

  it('Test biometric store, invalid data', () => {
    let newData = {
      userID: 6243819361,
      metrics: {
        hr: [89, 72, 77, 75,78],
        gsr: [100, 102, 105, 109, 88],
        temp: 12
      },
      time: 5
    };
    WebRequest.post(addBioURLRemote, {json: true}, newData)
      .then(value => {
        console.log(value.statusCode);
        console.log(value.message);
        expect.fail();
      })
      .catch(err => {
        expect(err.statusCode).to.equals(400);
      });
  });
});