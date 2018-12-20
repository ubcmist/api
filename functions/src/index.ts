import * as functions from 'firebase-functions';

//Initialize firestore
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

//Add cloud functions here
export const onBioStore = functions.https.onRequest((req, res) => {

});

export const onMLStore = functions.https.onRequest((req, res) => {

});

export const onBioGet = functions.https.onRequest((req, res) => {

});

export const onMLGet = functions.https.onRequest((req, res) => {

});

export const onBioDelete = functions.https.onRequest((req, res) => {

});

export const onMLDelete = functions.https.onRequest((req, res) => {

});