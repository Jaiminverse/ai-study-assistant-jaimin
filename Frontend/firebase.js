// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyABSdoPMyikKJTgSMZz6ybVut4YdCLlhrc",
  authDomain: "ai-study-assistant-605e8.firebaseapp.com",
  projectId: "ai-study-assistant-605e8",
  storageBucket: "ai-study-assistant-605e8.firebasestorage.app",
  messagingSenderId: "253602615659",
  appId: "1:253602615659:web:26f726e8ea522b13563c2e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);