var firebaseRef = firebase.database().ref('users');
function signupinsertion(){
    
    var username_val = document.getElementById('username').value;
    var email_val = document.getElementById('email').value;
    var phone_val = document.getElementById('phone').value;
    var password_val = document.getElementById('password').value;
    var profpic_FileName_val = document.getElementById('profpic_FileName').value;
    var profpic_FileName_val_split = profpic_FileName_val.split("\\");
    var profpic_FileName_val_split_filename = profpic_FileName_val_split[profpic_FileName_val_split.length - 1];
    var description_val = document.getElementById('description').value;


    firebaseRef.child(username_val).child('details').set({
        email : email_val,
        phone : phone_val,
        password : password_val,
        profpic_FileName : profpic_FileName_val_split_filename,
        description : description_val
    });

    window.alert('Inserted');
}
