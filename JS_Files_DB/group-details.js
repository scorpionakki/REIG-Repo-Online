var firebaseRef = firebase.database().ref('groups');
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var url_string = window.location.href;
        var url = new URL(url_string);
        var grp_name = url.searchParams.get("name");
        var grp_id = url.searchParams.get("id");
        
        var groupRef = firebase.database().ref('groups');
        groupRef.on('value',function(groupids_snapshot){
            var groupids = groupids_snapshot.val();
            var groupidskey = Object.keys(groupids);
            
            for(var i=0;i<groupidskey.length;i++){
                if(grp_id == groupidskey[i]){
                    groupRef.child(groupidskey[i]).on('value',function(groupname_snapshot){
                        var groupname = groupname_snapshot.val();
                        var groupnamekeys = Object.keys(groupname);
                        if(grp_name != groupnamekeys[0]){
                            alert('Problem with the Name');
                            window.location = "index.html";
                        }
                        else
                        {
                            groupRef.child(groupidskey[i]).child(groupnamekeys[0]).child('members').on('value',function(memberids_snapshot){
                                var membersids = memberids_snapshot.val();
                                var membersidskeys = Object.keys(membersids);
                                flag = 0;
                                for(var j=0;j<membersidskeys.length;j++){
                                    groupRef.child(groupidskey[i]).child(groupnamekeys[0]).child('members').child(membersidskeys[j]).on('value',function(membersemail_snapshot){
                                        var membersemail = membersemail_snapshot.val();
                                        
                                        if(user.email != membersemail.member){
                                            flag = flag + 1; 
                                            
                                        }
                                        
                                        //console.log(membersemail.member);
                                        // if(user.email == membersemail.member){
                                        //     flag == 1;
                                        // }
                                        // console.log(membersemail.member);
                                        // console.log(user.email);
                                        // console.log(flag);
                                        // if(flag != 1){
                                        //     alert('Not a current member');
                                        // }
                                    });
                                }
                                console.log(flag);
                                flag_call(flag,membersidskeys.length);
                                function flag_call(flag,membersidskeysvalue){
                                    if(flag == membersidskeysvalue){
                                        alert('Not a member');
                                        window.location = "index.html";
                                    }
                                }
                                // for(var j=0;j<membersidskeys.length;j++){
                                //     if(user.email == membersidskeys[i].member){
                                //         flag == 1;
                                //     }
                                // }
                                
                                // if(flag != 1){
                                //     alert('Not current member of this group');
                                
                                // }
                            });
                        }
                    });
                }
            }
            
        });
        
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
            window.location = 'group.html?id='+grp_id+'&name='+grp_name;
        };
        
    } else {
        // No user is signed in.
        alert('No user is signed in');
        window.location = "index.html";
    }
});