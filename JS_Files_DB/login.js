var user_login;
var pass_login;
$('#btn_login').click(function getvalues(){
    
    user_login = $('#username_login').val();
    pass_login = $('#password_login').val();
    
    var databaseRef = firebase.database().ref().child('users').child('testing_reig').child('details').child('password');
    databaseRef.on("value",brobro);
    
});

function brobro(snap){
    window.alert(snap.val());
}
