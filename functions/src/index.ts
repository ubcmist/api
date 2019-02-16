import * as functions from 'firebase-functions';
import { isArray, isNumber, isDate } from 'util';

//  Sample BioMetric JSON
const sampleBioData = {
  userID: 6243819361,
  metrics: {
    hr: [89, 72, 77, 75,78],
    gsr: [100, 102, 105, 109, 88],
    locSnap: [{lat: 0, lon: 0}, {lat: 1, lon: 1}],
    numSteps: 300,
    temp: [36, 37, 37, 36, 37]
  },
  time: 5
};

const maxHistory = 10000;

//  Sample ML JSON
const sampleMLData = {
  snapshot: [[],[],[]]
};

//  Data interfaces
interface Metrics {
  hr: Array<number>;
  gsr: Array<number>;
  temp: Array<number>;
  pedometer: number;
  locSnap: Array<Geolocation>;
  userAssessedStressLevel: number;
}

interface Geolocation {
  lat: number;
  lon: number;
}

interface BioData {
  userID: number;
  metrics: Metrics;
  time:number
}

interface Response {
  code: number;
  body: any
}

interface dbBioData {
  metrics: Metrics;
  time: number;
}

interface UserIDQuery {
  userID: number;
}

//  Initialize firestore
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

//  Constants
const biometricsQuery: string = 'biometrics';
const biometricsHistQuery = 'bioHistory';
const metricsQuery: string = 'metrics';
const timeQuery: string = 'time';

//  Add all cloud functions here

/*  This function is called with the **biometric** data JSON as an argument.
*   This data will be stored on the MIST database.
*/
export const onBioStore = functions.https.onRequest((req, res) => {
  let data: BioData = req.body;
  if (data === null) {
    res.sendStatus(400);
  }
  else {
    if (checkValidData(data)) {
      let doc = db.collection(biometricsQuery).doc(String(data.userID));
      doc.get()
        .then((dbdoc) => {
          let newDat: dbBioData = { metrics: data.metrics, time: data.time };
          if (!dbdoc.exists) {
            doc.set(newDat);
            res.sendStatus(200);
          }
          else {
            doc.update(newDat);
            res.sendStatus(201);
          }
          let histDoc = db.collection(biometricsHistQuery).doc(String(data.userID));
          return db.runTransaction((t) => {
            return t.get(histDoc).then((doc) => {
              // doc doesn't exist; can't update
              if (!doc.exists) {
                let newHistDat = { hist: [newDat] };
                t.set(histDoc, newHistDat, { merge: true });
                res.sendStatus(200);
              }
              else {
                // update the array after getting it from Firestore.
                let newArray = doc.get('hist').push(newDat);
                let newFinalArray = newArray;
                if (newArray.length > maxHistory) {
                  newFinalArray = [];
                  for (let i = 0; i < maxHistory; i++) {
                    newFinalArray.push(newArray[i + 1]);
                  }
                }
                t.set(histDoc, { hist: newArray }, { merge: true });
              }
            })
              .catch((err) => {
                res.sendStatus(500);
              });
            /*histDoc.get()
              .then((dbhistdoc) => {
                let newHistDat = {hist: [newDat]};
                if(!dbhistdoc.exists){
                  histDoc.set(newHistDat);
                  res.sendStatus(200);
                }
                else{
                  let newArr: Array<dbBioData> = dbhistdoc;
                  if(newArr.length == maxHistory){
                    let newHistArr: Array<dbBioData> = [];
                    for(let i = 1; i < maxHistory; i++) {
                      newHistArr.push(newArr[i]);
                    }
                    newHistArr.push(newDat);
                    histDoc.set(newHistArr);
                    res.sendStatus(201);
                  }
                  else{
                    newArr.push(newDat);
                    histDoc.set(newArr);
                    res.sendStatus(201);
                  }
                }
              })
              .catch((err) => {
                res.sendStatus(500);
              });*/
          })
        })
        .catch((err) => {
          res.sendStatus(500);
        });
    }
    else{
        res.sendStatus(400);
    }
  }
});

/*  This function is called with a unique 10-digit userID to retrieve
*   **biometric** data for that user.
*/
export const onBioGet = functions.https.onRequest((req, res) => {
  let query: UserIDQuery = req.body;
  if(checkValidUserID(query.userID)){
    let doc = db.collection(biometricsQuery).doc(String(query.userID));
    doc.get()
      .then((dbdoc) => {
        if(!dbdoc.exists){
          res.sendStatus(404);
        }
        else{
          res.send({
            userID: query.userID,
            metrics: dbdoc.data()[metricsQuery],
            time: dbdoc.data()[timeQuery]
          });
        }
      })
      .catch((err) => {
        res.sendStatus(400);
      });
  }
  else {
    res.sendStatus(400);
  }
});

/*  This function is called with a unique 10-digit userID to delete a user's
*   **biometric** data from the MIST database.
*/
export const onBioDelete = functions.https.onRequest((req, res) => {
  let query: UserIDQuery = req.body;
  if(checkValidUserID(query.userID)){
    let doc = db.collection(biometricsQuery).doc(String(query.userID)).delete();
    res.sendStatus(200);
  }
  else {
    res.sendStatus(400);
  }
});

/*  This function generates a new and unique 10-digit userID
*/
export const generateNewUserID = functions.https.onRequest((req, res) => {
  let exists: boolean = false;
  let col = db.collection(biometricsQuery).get()
    .then(docs => {
      if(docs.empty){
        res.send({
          userID: Math.floor(1000000000 + Math.random() * 9000000000)
        });
      }
      else{
        let newID: number = Math.floor(1000000000 + Math.random() * 9000000000);
        docs.forEach(doc => {
          if(newID == doc.id){
            exists = true;
          }
        });
        while(exists){
          newID = Math.floor(1000000000 + Math.random() * 9000000000);
          exists = false;
          docs.forEach(doc => {
            if(newID == doc.id){
              exists = true;
            }
          });
        }
        res.send({
          userID: newID
        });
      }
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

/*  This function gets biodata history for user that has been persisted in
*   firestore
* */
export const onBioHistGet = functions.https.onRequest((req, res) => {
  let query: UserIDQuery = req.body;
  if(checkValidUserID(query.userID)){
    let doc = db.collection(biometricsHistQuery).doc(String(query.userID));
    doc.get()
      .then((dbdoc) => {
        if(!dbdoc.exists){
          res.sendStatus(404);
        }
        else{
          res.send({
            userID: query.userID,
            metrics: dbdoc.data()[metricsQuery],
            time: dbdoc.data()[timeQuery]
          });
        }
      })
      .catch((err) => {
        res.sendStatus(400);
      });
  }
  else {
    res.sendStatus(400);
  }
});

/*  This function deletes a user's biodata history from the firestore collection
*
*/
export const onBioHistDel = functions.https.onRequest((req, res) => {
  let query: UserIDQuery = req.body;
  if(checkValidUserID(query.userID)){
    let doc = db.collection(biometricsHistQuery).doc(String(query.userID)).delete();
    res.sendStatus(200);
  }
  else {
    res.sendStatus(400);
  }
});

/*  This function is called with the **ML snapshot** in JSON format as an
*   argument. This data will be stored on the MIST database.
*/
export const onMLStore = functions.https.onRequest((req, res) => {

});

/*  This function is called with a unique 10-digit userID to retrieve
*   **ML snapshot** data for that user.
*/
export const onMLGet = functions.https.onRequest((req, res) => {

});

/*  This function is called with a unique 10-digit userID to delete a user's
*   **ML snapshot** data from the MIST database.
*/
export const onMLDelete = functions.https.onRequest((req, res) => {

});

//  Helpers

//  Checks if BioMetric data is in a valid JSON format
export const checkValidData = (data: any): boolean => {
  if(isNumber(data.userID)){
    if(isNumber(data.time)){
      let metrics: Metrics = data.metrics;
      if(isArray(metrics.gsr)){
        if(isArray(metrics.temp)){
          if(isArray(metrics.hr)){
            return true;
          }
          else {
            return false;
          }
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
};

//  Checks is userID is in valid 10-digit range
export const checkValidUserID = (userID: number): boolean => {
  return (userID >= 1000000000 && userID <= 9999999999)
};