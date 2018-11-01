var firebaseRef = firebase.database().ref('users');
//var authRef = firebase.auth();
function signupinsertion(){
    
    var username_val = document.getElementById('username').value;
    var email_val = document.getElementById('email').value;
    var phone_val = document.getElementById('phone').value;
    var password_val = document.getElementById('password').value;
    var profpic_FileName_val = document.getElementById('profpic_FileName').value;
    var profpic_FileName_val_split = profpic_FileName_val.split("\\");
    var profpic_FileName_val_split_filename = profpic_FileName_val_split[profpic_FileName_val_split.length - 1];
    var description_val = document.getElementById('description').value;
    
    if(username_val == ""){
        document.getElementById('display_error').innerText = "Username cant be left blank";
        return false;
    }

    // firebase.auth().createUserWithEmailAndPassword(email_val, password_val).catch(function(error) {
    //     console.log(error.code);
    //     console.log(error.message);
    //     window.alert('Error');
    //  });
    // firebaseRef.child(username_val).child('details').set({
    //     email : email_val,
    //     phone : phone_val,
    //     password : password_val,
    //     profpic_FileName : profpic_FileName_val_split_filename,
    //     description : description_val
    // });
    
    
}


function loginfetching(){
    var username_val_login = document.getElementById('username_login').value;
    var password_val_login = document.getElementById('password_login').value;
    var databaseRef = firebaseRef.child(username_val_login).child('details').child('password');

    databaseRef.on('value',function(snap){

        var password_db = snap.val();
        if(password_db == password_val_login){
            sessionStorage.setItem("username", username_val_login);
            window.alert('Done');
            window.location.href = "index.html";
        }
        else
        {
            window.alert('Please Try again');
        }
    });

}

