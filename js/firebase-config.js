import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCZAd_0Fw8QJQ3RWEQE0vbawiny54Octww",
    authDomain: "todolimpio-f796f.firebaseapp.com",
    projectId: "todolimpio-f796f",
    storageBucket: "todolimpio-f796f.firebasestorage.app",
    messagingSenderId: "663644954070",
    appId: "1:663644954070:web:dff26f018f32a9a271d877",
    measurementId: "G-M34LQSPWQK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);