# UBC MIST BioAPI

## Description
This repository contains the code for the BioAPI which acts as an interface between user devices and the ML server for our model. All user data will be collected from biometric sensors and pooled locally on user devices. This will then be sent for storage to the MIST database via remote function calls made to this API. The ML server will request data from the MIST database and also store its snapshots in the database via this API. 
## Development requirements
- You must make detailed pull requests with a reference to and a short description of issues you have addressed. Keep checking for new issues posted on GitHub.
- A local installation of Node.js (this project is written in Typescript).
- A local installation of the Firebase CLI.
## Setup instructions
- Fork this repository and clone into your local system.
- Ensure you have Node.js installed. To check, go to command line/terminal and type `node -v`, you should see something like `v10.4.1`. If not, see the download page and instructions [here](https://nodejs.org/en/download/)
- Install the Firebase CLI by typing `npm install -g firebase-tools`.
- Once Firebase is installed, you will have to log into the Firebase console. Provided you have been granted access to the Firebase console for MIST, this will work for you. Type `firebase login`. You will be redirected to log in on a browser with your Google account.
When this is done, you're all set to start contributing to the project. 
## Outline
These are cloud functions that will be used to send, retrieve, update, and delete data to the mobile application and ML server.
A user's data will be identified by his or her unique identification number which will be randomly generated when a user signs up. This identification will also be used when manipulating data for a given user.
## Database Functions
There are 6 different database functions. The mobile application and ML server require separate functions due to different data sets being processed. They are:
- `onBioStore` - This function is called with the **biometric** data JSON as an argument. This data will be stored on the MIST database. Sends response codes `201` if a new user is created in the database, `205` if an existing user's data is updated, and `400` if data sent is invalid.
- `onMLStore` - This function is called with the **ML snapshot** in JSON format as an argument. This data will be stored on the MIST database.
- `onBioGet` - This function is called with a unique 10-digit userID to retrieve **biometric** data for that user. Sends response codes `200` if data is successfully retrieved, `404` if user with sent `userID` was not found, and `400` for invalid `userID` sent to the server.
- `onMLGet` - This function is called with a unique 10-digit userID to retrieve **ML snapshot** data for that user.
- `onBioDelete` - This function is called with a unique 10-digit userID to delete a user's **biometric** data from the MIST database. Sends response codes `200` if user data was successfully deleted from firestore, and `400` if an invalid `userID` was sent to the server.
- `onMLDelete` - This function is called with a unique 10-digit userID to delete a user's **ML snapshot** data from the MIST database.
## Other Utilities
These functions provide services that help integrate the API's usage with the mobile application. Current functions included in this section are
- `generateNewUserID` - This function generates a new 10-digit `userID` if a user wants one or when a new user starts using the mobile application. The data in firestore is identified with this `userID` for each individual user, and all data transactions are done using this ID. Success code is `200`, failure code is `400`.
## Testing
This project uses Chai and Mocha for testing. Tests can be added to `tests.ts`, and can be run individually from there provided all the development dependencies have been installed correctly. If something goes wrong, try to `cd functions` and then run `npm install` inside the folder. You also need to have your firebase functions running on a local port when you run each individual test. To do this, while you're in the **functions** folder, run `npm run serve` this script builds the latest version of your local source code and deploys the functions on a local port. It will also give the URLs you need to send HTTPS requests to call each function.
