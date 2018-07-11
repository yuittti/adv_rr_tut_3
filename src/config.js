import firebase from 'firebase';

export const appName = 'adv-rr-tut-3';
export const firebaseConfig = {
    apiKey: `AIzaSyBjttqZQYbeTInPBzZpMyYd1pDyru7Nblc`,
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: `642402027478`
}

firebase.initializeApp(firebaseConfig);