// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA7uQzHMJe5yl2YkUtfvw3rMEjtYnEZ1WE",
  authDomain: "admin-java-d25c7.firebaseapp.com",
  databaseURL: "https://admin-java-d25c7-default-rtdb.firebaseio.com",
  projectId: "admin-java-d25c7",
  storageBucket: "admin-java-d25c7.appspot.com",
  messagingSenderId: "545922652304",
  appId: "1:545922652304:web:9c2345cb1421eb749b6015",
  measurementId: "G-8N0EL2NS8H"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
