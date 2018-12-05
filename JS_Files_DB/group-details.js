var firebaseRef = firebase.database().ref('groups');
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var url_string = window.location.href;
        var url = new URL(url_string);
        var grp_name = url.searchParams.get("name");
        var grp_id = url.searchParams.get("id");
        document.getElementById('redirect_group').href = 'group.html?id='+grp_id+'&name='+grp_name;
        firebaseRef.child(grp_id).child(grp_name).child('details').on('value',function(group_details_snapshot){
            var group_details = group_details_snapshot.val();
            
            document.getElementById('group_name').value = grp_name;
            document.getElementById('created_by').value = group_details.created_by;
            document.getElementById('group_description').value = group_details.group_description;
        });
        var img = document.getElementById('loading_gif');
        img.style.visibility = 'hidden';
        
        document.getElementById('update_group_details').onclick = function(){
            var description = document.getElementById('group_description').value;
            if(description == ""){
                firebaseRef.child(grp_id).child(grp_name).child('details').update({
                    group_description : ""
                });
            }  
            else
            {
                firebaseRef.child(grp_id).child(grp_name).child('details').update({
                    group_description : description
                });
            }
            
            alert('Updated');
            return false;
            window.location = "index.html";
        };
        
    } else {
        // No user is signed in.
        alert('No user is signed in');
        window.location = "index.html";
    }
});