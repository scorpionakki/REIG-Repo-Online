var auth = firebase.auth();

function getcurrentuser(){

    var user = auth.currentUser;
    window.alert(user.email);

}

function logoutcurrentuser(){
    firebase.auth().signOut().then(function(){

        window.alert('Logged Out');

    },function(error){

        window.alert('Please try again');

    });
}