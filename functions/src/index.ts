import * as functions from 'firebase-functions';
import admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

exports.addAdminRole = functions.https.onCall((data, context) => {
    // get user and add custom claim(admin)
    return admin.auth().getUserByEmail(data.email).then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(() => {
        console.log(`${data.email} added as Admin`);
        return {
            message: `Success! ${data.email} has been made as an admin`,
            set: true
        }
    }).catch((error) => {
        console.error(error);
        return error;
    })
})