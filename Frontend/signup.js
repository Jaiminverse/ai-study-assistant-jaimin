import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

window.signupUser = async function () {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    try {

        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Account Created 🎉");

        window.location.href =
            "login.html";

    }

    catch(error){

        alert(error.message);

    }

};  