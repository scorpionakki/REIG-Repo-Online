var databaseRef = firebase.database().ref();
var email_value = document.getElementById("email").value;

function signupdata(){

    // databaseRef.child("users/scorpionakki3").set({
    //     "email" : email_value
    // });

    window.alert(email_value);
}