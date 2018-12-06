var firebaseRef = firebase.database().ref('groups');
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        
        var url_string = window.location.href;
        var url = new URL(url_string);
        var grp_name = url.searchParams.get("name");
        var grp_id = url.searchParams.get("id");
        
        firebaseRef.child(grp_id).child(grp_name).child('members').on('value',function(groupmembersids_snapshot){
            
            var groupmembersids = groupmembersids_snapshot.val();
            var groupmembersidskeys = Object.keys(groupmembersids);
            for(var i=0;i<groupmembersidskeys.length;i++){
                
                firebaseRef.child(grp_id).child(grp_name).child('members').child(groupmembersidskeys[i]).on('value',function(useremails_snapshot){
                    var useremails = useremails_snapshot.val();
                    // var tableRef = document.getElementById('member_table').getElementsByTagName('tbody')[0];
                    // var newRow = tableRef.insertRow(0);
                    // var member_name_cell = newRow.insertCell(0);
                    // member_name_cell.innerHTML = useremails.member;
                    var ul = document.getElementById('myUL');
                    var li = document.createElement("li");
                    li.setAttribute('class','list-group-item');
                    li.appendChild(document.createTextNode(useremails.member));

                    var button = document.createElement("a");
                    button.setAttribute("href","#myModal");
                    button.setAttribute("data-toggle","modal");
                    document.getElementById('modal-content').innerHTML = "Are you sure you want to remove "+groupmembersidskeys[i]+"?";
                    button.appendChild(document.createTextNode("Remove"));
                    li.appendChild(button);
                    ul.appendChild(li);
                });
                
                
            }
            
        });
        
    } else {
        // No user is signed in.
    }
});

