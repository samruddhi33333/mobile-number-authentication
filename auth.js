const firebaseConfig = {
  apiKey: "AIzaSyDiiOP2F0I0UYUkVgHpWzImYrmgjEHhR-Q",
  authDomain: "mobile-authentication-669ee.firebaseapp.com",
  projectId: "mobile-authentication-669ee",
  storageBucket: "mobile-authentication-669ee.appspot.com",
  messagingSenderId: "318228172306",
  appId: "1:318228172306:web:abcdef1234567890abcdef"  
};




firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


window.onload = function () {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'normal',
    callback: function(response) {
      console.log("Recaptcha verified!");
    }
  });
};


document.getElementById('sendOtpBtn').addEventListener('click', function () {
  const phoneNumber = document.getElementById('phoneNumber').value;
  const appVerifier = window.recaptchaVerifier;

  auth.signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("OTP sent successfully!");
    })
    .catch((error) => {
      console.error("Error during sign-in:", error);
      alert(error.message);
    });
});


document.getElementById('verifyOtpBtn').addEventListener('click', function () {
  const otp = document.getElementById('otp').value;

  window.confirmationResult.confirm(otp)
    .then((result) => {
      const user = result.user;
      alert("Phone number verified!");
      console.log("User info:", user);
    })
    .catch((error) => {
      console.error("Error during verification:", error);
      alert("Invalid OTP.");
    });
});
