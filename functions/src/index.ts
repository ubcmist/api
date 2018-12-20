import * as functions from 'firebase-functions';

//Sample BioMetric JSON
const sampleBioData = {
  userID: 6243819361,
  metrics: {
    hr: [89, 72, 77, 75,78],
    gsr: [100, 102, 105, 109, 88],
    temp: [36, 37, 37, 36, 37]
  },
  time: 5
};

//Sample ML JSON
const sampleMLData = {
  snapshot: [[],[],[]]
};

//Initialize firestore
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

//Add cloud functions here

/*  This function is called with the **biometric** data JSON as an argument.
*   This data will be stored on the MIST database.
*/
export const onBioStore = functions.https.onRequest((req, res) => {

});

/*  This function is called with the **ML snapshot** in JSON format as an
*   argument. This data will be stored on the MIST database.
*/
export const onMLStore = functions.https.onRequest((req, res) => {

});

/*  This function is called with a unique 10-digit userID to retrieve
*   **biometric** data for that user.
*/
export const onBioGet = functions.https.onRequest((req, res) => {

});

/*  This function is called with a unique 10-digit userID to retrieve
*   **ML snapshot** data for that user.
*/
export const onMLGet = functions.https.onRequest((req, res) => {

});

/*  This function is called with a unique 10-digit userID to delete a user's
*   **biometric** data from the MIST database.
*/
export const onBioDelete = functions.https.onRequest((req, res) => {

});

/*  This function is called with a unique 10-digit userID to delete a user's
*   **ML snapshot** data from the MIST database.
*/
export const onMLDelete = functions.https.onRequest((req, res) => {

});