var auth = firebase.auth();

function store(){
    var emailval = document.getElementById('email').value;
    var passval = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(emailval,passval).catch(function(error){

        window.alert('Please try Again');

    });
}

function login(){
    var emailval = document.getElementById('email').value;
    var passval = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(emailval,passval).catch(function(error){

        window.alert('Please try Again! Maybe create a new account');

    });
    // auth.onAuthStateChanged(function(user){

    //     if(user){
    //         var userid = user.;
    //         window.alert(userid);
    //     }
    //     else
    //     {
    //         window.alert('Error');
    //     }

    // });

    var user = firebase.auth().currentUser;
    window.alert(user.email);
}
