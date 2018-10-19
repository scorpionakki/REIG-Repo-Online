var username_value =  document.getElementById("username").value;
    var email_value = document.getElementById("email").value;
    var password_value = document.getElementById("password").value;
    var profpicName_value = document.getElementById("phone").value;
    var database = firebase.database().ref();
    var description_value = document.getElementById("description").value;

    function signupdata() {
        database.set({
            email: email_value,
            password : password_value,
            phone : profpicName_value,
            description : description_value
        });
    }