var firebaseRef = firebase.database().ref('users');
// var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();

function googlesignin(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user.uid;
        console.log(user);
        window.location = 'signup.html' ;
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert('Please try again!')
        console.log(errorCode);
        console.log(errorMessage);
    });
}

function signupinsertion(){
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            // var email_val = document.getElementById('email').value;
            var phone_val = document.getElementById('phone').value;
            // var password_val = document.getElementById('password').value;
            // // var profpic_FileName_val = document.getElementById('profpic_FileName').value;
            // // var profpic_FileName_val_split = profpic_FileName_val.split("\\");
            // // var profpic_FileName_val_split_filename = profpic_FileName_val_split[profpic_FileName_val_split.length - 1];
            var description_val = document.getElementById('description').value;
            
            firebaseRef.child(user.uid).child('details').set({
                "phone" : phone_val,
                "profpic_FileName" : "null",
                "description" : description_val,
                "email" : user.email
            });
            
            if((confirm("Sure with your details?"))){
                window.location = "index.html";
            }
            
        } else {
            // No user is signed in.
            window.alert('Sorry! No user has been signed in. Please try logging in again');
            window.location = 'login.html';
        }
    });
    // var email_val = document.getElementById('email').value;
    // var phone_val = document.getElementById('phone').value;
    // var password_val = document.getElementById('password').value;
    // // var profpic_FileName_val = document.getElementById('profpic_FileName').value;
    // // var profpic_FileName_val_split = profpic_FileName_val.split("\\");
    // // var profpic_FileName_val_split_filename = profpic_FileName_val_split[profpic_FileName_val_split.length - 1];
    // var description_val = document.getElementById('description').value;
    
    
    // // firebase.auth().createUserWithEmailAndPassword(email_val,password_val).catch(function(error){
    // //     window.alert('Please try again');
    // // });
    
    
    // firebaseRef.child(email_val).child('details').set({
    //     "phone" : phone_val,
    //     "profpic_FileName" : "null",
    //     "description" : description_val
    // });
    
    // alert(email_val);
    // alert(phone_val);
    // alert(password_val);
    // alert(description_val);
    
}


// function loginfetching(){
//     var email_val_login = document.getElementById('email_login').value;
//     var password_val_login = document.getElementById('password_login').value;
//     //var databaseRef = firebaseRef.child(username_val_login).child('details').child('password');

//     // databaseRef.on('value',function(snap){

//     //     var password_db = snap.val();
//     //     if(password_db == password_val_login){
//     //         sessionStorage.setItem("username", username_val_login);
//     //         window.alert('Done');
//     //         window.location.href = "index.html";
//     //     }
//     //     else
//     //     {
//     //         window.alert('Please Try again');
//     //     }
//     // });

//     auth.signInWithEmailAndPassword(email_val_login,password_val_login).catch(function(error){

//         window.alert('Please try Again! Maybe create a new account');

//     });

// }

