var firebaseRef = firebase.database().ref('groups');
var databaseRef = firebase.database().ref('users');
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        
        var url_string = window.location.href;
        var url = new URL(url_string);
        var grp_name = url.searchParams.get("name");
        var grp_id = url.searchParams.get("id");
        
        
        document.getElementById('search_member_btn').onclick = function(){
            var input_value = document.getElementById('search_value').value;
            
            // databaseRef = databaseRef.ref('users');
            databaseRef.on('value',function(snap){
                var users = snap.val();
                var keys = Object.keys(users);
                
                for(var i = 0; i< keys.length;i++){
                    databaseRef.child(keys[i]).child('details').child('email').on('value',function(email){
                        if(input_value ==  email.val()){
                            
                            var table = document.getElementById("table_searchresults");
                            if(document.getElementById('table_searchresults').rows.length > 1){
                                for(var i = 1;i<=document.getElementById('table_searchresults').table.rows.length;i++){
                                    document.getElementById('table_searchresults').deleteRow(i);
                                }
                            }
                            else
                            {
                                checkforsamevalue(input_value);
                                var row = table.insertRow(1);
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                
                                var alink_more_details = document.createElement("button");
                                alink_more_details.setAttribute("class","btn btn-primary fa fa-plus");
                                var alink_more_details_text = document.createTextNode('');
                                alink_more_details.appendChild(alink_more_details_text);
                                // alink.setAttribute("href","http://index.html");
                                //alink_more_details.setAttribute('value',"ADD")
                                
                                //alink_more_details.setAttribute('onclick',"add_member_in_table_newlyaddedmembers("+ input_value+"); return false");
                                alink_more_details.setAttribute('onclick','add_member_in_table_newlyaddedmembers()');
                                alink_more_details.setAttribute('id',"add_member_btn");
                                //alink_more_details.href = "more-detail.html?id="+id;
                                
                                // alink_more_details.href = "#table_addedmembers?id="+id;
                                
                                cell1.innerHTML = email.val();
                                cell2.appendChild(alink_more_details);
                                
                                var hidden_field = document.createElement("INPUT");
                                hidden_field.setAttribute("type","hidden");
                                hidden_field.setAttribute("id","hidden_value");
                                document.body.appendChild(hidden_field);
                                
                                document.getElementById('hidden_value').value = email.val();
                                
                                // }
                                //document.getElementById('table_searchresults').deleteRow(table.rows.length - 1);
                                
                                
                            }  
                        }
                    });
                }
                
            });
            
            
            
            
            
            
            databaseRef.on('value',function(snap){
                if(snap.val() == null){
                    window.alert("No such user exist");
                }
            });
            
        };
        
        
        firebaseRef.child(grp_id).child(grp_name).child('members').on('value',function(groupmembersids_snapshot){
            
            var groupmembersids = groupmembersids_snapshot.val();
            var groupmembersidskeys = Object.keys(groupmembersids);
            for(var i=0;i<groupmembersidskeys.length;i++){
                
                firebaseRef.child(grp_id).child(grp_name).child('members').child(groupmembersidskeys[i]).on('value',function(useremails_snapshot){
                    var useremails = useremails_snapshot.val();
                    var id = useremails_snapshot.key;
                    
                    var tableRef = document.getElementById('table_addedmembers');
                    var newRow = tableRef.insertRow(1);
                    newRow.setAttribute('class','list-group-item');
                    var member_name_cell = newRow.insertCell(0);
                    var remove_button_cell = newRow.insertCell(1);
                    // var id_cell = newRow.insertCell(2);
                    
                    var remove_button = document.createElement('button');
                    member_name_cell.appendChild(document.createTextNode(useremails.member));
                    remove_button.appendChild(document.createTextNode('Remove'));

                    // id_cell.appendChild(document.createTextNode(id));
                    
                    // var button = document.createElement("a");
                    // button.setAttribute("href","#myModal");
                    // button.setAttribute("data-toggle","modal");
                    // document.getElementById('modal-content').innerHTML = "Are you sure you want to remove "+id_cell.innerText+"?";
                    // button.appendChild(document.createTextNode("Remove"));
                    
                    var button = document.createElement('button');
                    button.type = "button";
                    button.setAttribute("class","btn btn-primary fa fa-times");
                    button.addEventListener('click',function(){
                        removeMember(useremails_snapshot.key);
                    });
                    //button.setAttribute("onclick","removeMember("+useremails_snapshot.key+");return false");
                    button.appendChild(document.createTextNode(""));
                    remove_button_cell.appendChild(button);
                    
                    // var ul = document.getElementById('myUL');
                    // var li = document.createElement("li");
                    // li.setAttribute('class','list-group-item');
                    // li.appendChild(document.createTextNode(useremails.member));
                    
                    // var button = document.createElement("a");
                    // button.setAttribute("href","#myModal");
                    // button.setAttribute("data-toggle","modal");
                    // document.getElementById('modal-content').innerHTML = "Are you sure you want to remove "+useremails.member+"?";
                    // button.appendChild(document.createTextNode("Remove"));
                    // li.appendChild(button);
                    // ul.appendChild(li);
                });
                
                
            }
            
        });
        
        
        
        
        
    } else {
        // No user is signed in.
    }
});

function add_member_in_table_newlyaddedmembers(){
    
    
    // var table_rows_am = document.getElementById('table_addedmembers'); //am = addedmembers
    // for(var i = 0;i< table_rows_am.rows.length;i++)
    // {
    //     if(table_rows_am.rows[i].cells[0].innerHTML == input_value){
    //         document.getElementById('add_member_btn').disabled= true;
    //         document.getElementById('table_searchresults').deleteRow(1);
    //         document.getElementById('table_newlyaddedmembers').deleteRow(1);
    //     }
    //     else
    //     {
    
    
    //     }
    
    // }
    var table = document.getElementById("table_newlyaddedmembers");
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = document.getElementById('hidden_value').value;
    // var table_rows_nam = document.getElementById('table_newlyaddedmembers'); //nam = newlyaddedmembers           
    // for(var i = 0;i< table_rows_nam.rows.length;i++)
    // {
    //     if(table_rows_nam.rows[i].cells[0].innerHTML == input_value){
    //         document.getElementById('add_member_btn').disabled= true;
    //         document.getElementById('table_searchresults').deleteRow(1);
    //         document.getElementById('table_newlyaddedmembers').deleteRow(1);
    //     }
    //     else
    //     {
    //         var table = document.getElementById("table_newlyaddedmembers");
    //         var row = table.insertRow(table.rows.length);
    //         var cell1 = row.insertCell(0);
    //         cell1.innerHTML = document.getElementById('hidden_value').value;
    
    //     }
    
    // }
    
    
    // document.getElementById('add_member_btn').disabled= true;
    var table = document.getElementById("table_searchresults");
    table.deleteRow(1);
}

function removeMember(key){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var grp_name = url.searchParams.get("name");
    var grp_id = url.searchParams.get("id");
    var firebaseRef = firebase.database().ref('groups');

    firebaseRef.child(grp_id).child(grp_name).child('members').child(key).remove(function(){
        alert('Member removed');
        location.reload();
    });
}

function checkforsamevalue(input_value){
    var newlyaddedmembers = document.getElementById('table_newlyaddedmembers');
    var searchresults = document.getElementById('table_searchresults');
    for(var i = 1;i<newlyaddedmembers.rows.length;i++){
        if(input_value == newlyaddedmembers.rows[i].cells[0].innerHTML)
        {
            alert('Member already present in Newly Added Members Table!');
            searchresults.deleteRow(1);
        }
    }
    
    var addedmembers = document.getElementById('table_addedmembers');
    
    
    for(var j = 1;j<addedmembers.rows.length;j++){
        if(input_value == addedmembers.rows[j].cells[0].innerHTML)
        {
            alert('Member already present in Already Added Members Table!');
            searchresults.deleteRow(1);
        }
    }
}



function updatemembers(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var grp_name = url.searchParams.get("name");
    var grp_id = url.searchParams.get("id");
    var firebaseRef = firebase.database().ref('groups');
    
    var newlyaddedmembers = document.getElementById('table_newlyaddedmembers');
    if(newlyaddedmembers.rows.length > 1){
        for(var i=1;i<newlyaddedmembers.rows.length;i++){
            firebaseRef.child(grp_id).child(grp_name).child('members').push({
                member : newlyaddedmembers.rows[i].cells[0].innerHTML
            });
        }
    }

    window.location = "group.html?id="+grp_id+"&name="+grp_name;
}