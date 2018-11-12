var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();

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


function googlesignin(){
    
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user.uid;
		
        console.log(token)
        console.log(user)
        console.log('success');
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
		
        // console.log(errorCode)
        // console.log(errorMessage)
    });
}