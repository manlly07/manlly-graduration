
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBq0UYeKIxPHXwSG0BvtmdWYX0Lur2wPr8",
    authDomain: "graduation-c8769.firebaseapp.com",
    projectId: "graduation-c8769",
    storageBucket: "graduation-c8769.appspot.com",
    messagingSenderId: "207177752785",
    appId: "1:207177752785:web:edbf99d74a165b0a93a5f0",
    measurementId: "G-275C94T96D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, onValue };