var url_string = window.location.href;
var url = new URL(url_string);
var grp_name = url.searchParams.get("name");
var grp_id = url.searchParams.get("id");


// User is signed in.

var chatRef = firebase.database().ref();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById('redirect_group').href = "group.html?id="+grp_id+"&name="+grp_name;
    }
    else
    {
        
    }
});