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
## Cloud Functions
There are 6 different functions. The mobile application and ML server require separate functions due different data sets being processed. They are:
- `onBioStore` - This function is called with the **biometric** data JSON as an argument. This data will be stored on the MIST database.
- `onMLStore` - This function is called with the **ML snapshot** in JSON format as an argument. This data will be stored on the MIST database.
- `onBioGet` - This function is called with a unique 10-digit userID to retrieve **biometric** data for that user.
- `onMLGet` - This function is called with a unique 10-digit userID to retrieve **ML snapshot** data for that user.
- `onBioDelete` - This function is called with a unique 10-digit userID to delete a user's **biometric** data from the MIST database.
- `onMLDelete` - This function is called with a unique 10-digit userID to delete a user's **ML snapshot** data from the MIST database.
