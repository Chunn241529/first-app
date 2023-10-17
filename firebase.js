import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB1Cmz_hrf5UL2kKia-WZuMX4FKdFHcURg",
    authDomain: "test-1544c.firebaseapp.com",
    databaseURL: "https://test-1544c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-1544c",
    storageBucket: "test-1544c.appspot.com",
    messagingSenderId: "546342325481",
    appId: "1:546342325481:web:7a74f2fb0422dabba17478",
    measurementId: "G-7ETBS2N41H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
