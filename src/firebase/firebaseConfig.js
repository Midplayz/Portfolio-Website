import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDKA1QjwEcYayN5_Lz-wC1y_hTleEZ7cEI",
    authDomain: "fitnesstracker-127f8.firebaseapp.com",
    projectId: "fitnesstracker-127f8",
    storageBucket: "fitnesstracker-127f8.appspot.com",
    messagingSenderId: "120334602201",
    appId: "1:120334602201:web:5717120668d324edbe53c8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
