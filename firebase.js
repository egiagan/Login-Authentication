// firebase.js

// Import the necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { firebaseConfig } from './firebase-config.js';  // Import Firebase config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

// Listen for authentication state changes
onAuthStateChanged(auth, function (user) {
  if (user) {
    document.getElementById('user').style.display = 'block';
    document.getElementById('login').style.display = 'none';
  } else {
    document.getElementById("user").style.display = 'none';
    document.getElementById("login").style.display = 'block';
  }
});

// Login function
function login() {
  const userEmail = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;

  // Use the modular approach for Firebase authentication
  signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logged in as:", user.email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Error: ' + errorMessage);  // Display the error message
    });
}

// Logout function
function logout() {
  signOut(auth)
    .then(() => {
      console.log("User logged out");
      // Optionally you can add a success message here
      alert("Logged out successfully!");
    })
    .catch((error) => {
      console.error("Error logging out:", error);
      alert("Error logging out: " + error.message);
    });
}

// Add event listeners for login and logout buttons when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Ensure the elements exist before attaching event listeners
  const loginButton = document.getElementById('loginButton');
  const logoutButton = document.getElementById('logoutButton');

  if (loginButton) {
    loginButton.addEventListener('click', login);
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  }
});
