import { expect } from 'chai';
import 'mocha';
import * as WebRequest from 'web-request';
import * as lib from '../src/index';
import * as Promise from 'bluebird';
import { generateNewUserID } from '../src/index';

describe('Testing cloud functions for the BioAPI locally...', () => {

  const addBioURL = 'http://localhost:5000/biosignal-e309a/us-central1/onBioStore';
  const addBioURLRemote = 'https://us-central1-biosignal-e309a.cloudfunctions.net/onBioStore';
  const getBioURL = 'http://localhost:5000/biosignal-e309a/us-central1/onBioGet';
  const getBioURLRemote = '';
  const deleteBioUrl = 'http://localhost:5000/biosignal-e309a/us-central1/onBioDelete';
  const genUserIDURL = 'http://localhost:5000/biosignal-e309a/us-central1/generateNewUserID'

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
    return new Promise((resolve, reject) => {
      WebRequest.post(addBioURL, {json: true}, newData)
        .then(value => {
          console.log(value.statusCode);
          console.log(value.message);
          expect(value.statusCode).to.equals(201);
          resolve(value)
        })
        .catch(err => reject(err))})
      .then((val) => {
        expect(val).to.equals(val);
      })
      .catch(err1 => {
        expect.fail(err1);
      });
  });

  it('Test biometric store remote, new user', () => {
    let newData = {
      userID: 9243819461,
      metrics: {
        hr: [89, 72, 77, 75,78],
        gsr: [100, 102, 105, 109, 88],
        temp: [36, 37, 37, 36, 37]
      },
      time: 5
    };
    return new Promise((resolve, reject) => {
      WebRequest.post(addBioURLRemote, {json: true}, newData)
        .then(value => {
          console.log(value.statusCode);
          console.log(value.message);
          expect(value.statusCode).to.equals(201);
          resolve(value)
        })
        .catch(err => reject(err))})
      .then((val) => {
        expect(val).to.equals(val);
      })
      .catch(err1 => {
        expect.fail(err1);
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
    WebRequest.post(addBioURLRemote, {json: true}, newData)
      .then(value1 => {
        WebRequest.post(addBioURLRemote, {json: true}, newData)
          .then(value => {
            console.log(value.statusCode);
            console.log(value.message);
            expect(value.statusCode).to.equals(205);
          })
          .catch(err1 => {
            expect.fail(err1);
          });
      })
      .catch(err => {
        expect.fail(err);
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
    return new Promise((resolve, reject) => {
      WebRequest.post(addBioURLRemote, {json: true}, newData)
        .then(value => {
          expect.fail(value);
          reject(value);
        })
        .catch(err => {
          resolve(err)
        })})
      .then((val) => {
        expect(val).to.equals(val);
      })
      .catch(err1 => {
        expect.fail(err1);
      });
  });

  it("Get valid user data from firestore", () => {
    let userQuery = {
      userID: 6243819331
    };
    return new Promise((resolve, reject) => {
      WebRequest.post(getBioURL, {json:true}, userQuery)
        .then(value => {
          let data = value.message['body'];
          console.log(data);
          expect(data['userID']).to.equals(userQuery.userID);
          expect(value.statusCode).to.equals(200);
          resolve(value);
        })
        .catch(err => {
          reject(err);
        })})
      .then((val) => {
        expect(val).to.equals(val);
      })
      .catch(err1 => {
        expect.fail(err1);
      });
  });

  it("Get invalid user data from firestore, no-existent user", () => {
    let userQuery = {
      userID: 4444419331
    };
    return new Promise((resolve, reject) => {
      WebRequest.post(getBioURL, {json:true}, userQuery)
        .then(value => {
          expect.fail(value);
          reject(value);
        })
        .catch(err => {
          resolve(err);
        })})
      .then((val) => {
        expect(val).to.equals(val);
      })
      .catch(err1 => {
        expect.fail(err1);
      });
  });

  it("Get invalid user data from firestore, invalid userID", () => {
    let userQuery = {
      userID: 44444
    };
    return new Promise((resolve, reject) => {
      WebRequest.post(getBioURL, {json:true}, userQuery)
        .then(value => {
          expect.fail(value);
          reject(value);
        })
        .catch(err => {
          resolve(err);
        })})
      .then((val) => {
        expect(val).to.equals(val);
      })
      .catch(err1 => {
        expect.fail(err1);
      });
  });

  it("Delete valid user", () => {
    let userQuery = {
      userID: 6243819331
    };
    return new Promise((resolve, reject) => {
      WebRequest.post(deleteBioUrl, {json:true}, userQuery)
        .then(value => {
          expect(value.statusCode).to.equals(200);
          resolve(value);
        })
        .catch(err => {
          reject(err);
        })})
      .then((val) => {
        expect(val).to.equals(val);
      })
      .catch(err1 => {
        expect.fail(err1);
      });
  });

  it("Delete invalid user from firestore, invalid userID", () => {
    let userQuery = {
      userID: 44444
    };
    return new Promise((resolve, reject) => {
      WebRequest.post(deleteBioUrl, {json:true}, userQuery)
        .then(value => {
          expect.fail(value);
          reject(value);
        })
        .catch(err => {
          resolve(err);
        })})
      .then((val) => {
        expect(val).to.equals(val);
      })
      .catch(err1 => {
        expect.fail(err1);
      });
  });

  it("Delete invalid user from firestore, non-existent user", () => {
    let userQuery = {
      userID: 4444444444
    };
    return new Promise((resolve, reject) => {
      WebRequest.post(deleteBioUrl, {json:true}, userQuery)
        .then(value => {
          expect(value.statusCode).to.equals(200);
          resolve(value);
        })
        .catch(err => {
          reject(err);
        })})
      .then((val) => {
        expect(val).to.equals(val);
      })
      .catch(err1 => {
        expect.fail(err1);
      });
  });

  it("Generate new userID", () => {
    return new Promise((resolve, reject) => {
      WebRequest.post(genUserIDURL)
        .then(value => {
          console.log(value.message['body']);
          expect(value.statusCode).to.equals(200);
          resolve(value);
        })
        .catch(err => {
          reject(err);
        })})
      .then((val) => {
        expect(val).to.equals(val);
      })
      .catch(err1 => {
        expect.fail(err1);
      });
  });

});