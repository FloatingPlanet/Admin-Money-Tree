import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
export const onUserCreate =
    functions.auth.user().onCreate((user) => {
        console.log('A new user signed in for the first time.');
        return db.doc('Users/' + user.uid).get().then((res) => {
            res.ref.set({
                uid: user.uid,
                guest: false,
                email: user.email,
                username: user.displayName,
                cart: [],
                orders: [],
                createOn: new Date(),
            }).then(() => {
                console.log(`${user.uid} have been created into database!`);
            }).catch((error) => {
                console.log(error);
            });
        });

    });

export const onUserCartUpdate =
    functions.firestore.document('Users/{uid}/cart/{any}').onWrite((change, context) => {

        return new Promise((res, rej) => {
            const uid = context.params.uid;
            const newState = change.after.data();
            console.log(`updating ${uid} cart count`);
            const userCartCollection = db.collection(`Users/${uid}/cart`);
            userCartCollection.get().then((snapshot) => {
                let newCount = 0;
                snapshot.forEach((doc) => {
                    if (doc.data().count < 1) {
                        doc.ref.delete().then(() => {
                            console.log(`${uid} remove item succeeded`);
                        }).catch((error) => {
                            console.error(error);
                        });
                    } else {
                        newCount += doc.data().count;
                    }
                });
                return db.doc(`Users/${uid}`).get().then((doc) => {
                    doc.ref.update({ cartSize: newCount }).then(() => {
                        console.log(`user's cart size update: ${newCount}`);
                        res(newState);
                    }).catch((error) => {
                        console.error(error);
                        rej(error);
                    });
                });
            }).catch((error) => {
                console.error(error);
                rej(error);
            });
        });
    });

export const grantPermission = functions.https.onCall((data, context) => {
    // get user and add custom claim(admin)
    console.log('grant')
    return admin.auth().getUserByEmail(data.email).then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(() => {
        console.log(`${data.email} added as Admin`);
        return {
            message: `Success! ${data.email} has been made as an admin`,
            set: true
        };
    }).catch((error) => {
        console.error(error);
        return error;
    });
});
