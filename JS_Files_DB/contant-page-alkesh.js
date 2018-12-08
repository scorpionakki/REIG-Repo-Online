var databaseRef = firebase.database().ref().child('users');
var databaseRef_group = firebase.database().ref().child('groups');
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var table_currentUser = document.getElementById("table_addedmembers");
        var row_currentuser = table_currentUser.insertRow(1);
        var cell1_user = row_currentuser.insertCell(0);
        cell1_user.innerHTML = user.email;
        
        
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
                                var row = table.insertRow(1);
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                
                                var alink_more_details = document.createElement("button");
                                alink_more_details.setAttribute("class","btn btn-primary fa fa-plus");
                                var alink_more_details_text = document.createTextNode('ADD');
                                alink_more_details.appendChild(alink_more_details_text);
                                // alink.setAttribute("href","http://index.html");
                                //alink_more_details.setAttribute('value',"ADD")
                                
                                alink_more_details.setAttribute('onclick',"add_member_in_table_addedmembers(); return false");
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
            
            var table_rows = document.getElementById('table_addedmembers');
            
            for(var i = 0;i< table_rows.rows.length;i++)
            {
                if(table_rows.rows[i].cells[0].innerHTML == input_value){
                    document.getElementById('add_member_btn').disabled= true;
                    document.getElementById('table_searchresults').deleteRow(1);
                }
                
            }
            
            
            
            databaseRef.on('value',function(snap){
                if(snap.val() == null){
                    window.alert("No such user exist");
                }
            });
            
        };
        
        document.getElementById('create_group').onclick =  function(){
            
            var table = document.getElementById('table_addedmembers');
            if(table.rows.length < 3){
                alert('No memerbers added');
                return false;
            }
            else
            {
                var group_name = document.getElementById('group_name').value;
                // databaseRef_group.child(group_name).on("value",function(snap){
                //     //window.alert('Name already taken! Please try with some different name');
                //     console.log('Name already taken');
                // });
                
                var groupID = databaseRef_group.push().getKey();
                var group_description = document.getElementById('group_description').value;
                
                databaseRef_group.child(groupID).child(group_name).child('details').set({
                    created_by : user.email,
                    group_description : group_description
                });
                
                
                
                for(var i=1;i<table.rows.length;i++){
                    var table_cell_value_email = table.rows[i].cells[0].innerHTML;
                    
                    databaseRef_group.child(groupID).child(group_name).child('members').push({
                        member : table_cell_value_email
                    });
                    console.log('Member details added in group');
                    
                }
                
                alert('Redirecting! Creation Successful');
                window.location = "index.html";
            }
            
            
            
            // databaseRef.on('value',function(snapshot_user_keys){
            //     var users_key = snapshot_user_keys.val();
            //     var keys =  Object.keys(users_key);
            
            //     for(var j=1;j<keys.length;j++){
            //         databaseRef.child(keys[j]).child('details').child('email').on('value',function(email){
            
            
            //         });
            //     }
            
            
            
            // });
            
            
            // function addgroupintouser(keys_para,i_para,group_name_para,groupID_para){
            //     databaseRef.child(keys_para[i_para]).child('groups').push({
            //         group : group_name_para,
            //         ID : groupID_para
            //     });
            
            //     break;
            // }
            //     // databaseRef.on('value',function(snap){
            //     //     var users = snap.val();
            //     //     var keys = Object.keys(users);
            
            //     //     for(var j = 0; j< keys.length;j++){
            //     //         databaseRef.child(keys[j]).child('details').child('email').on('value',function(email){
            //     //             if(value == email.val()){
            //     //                 databaseRef.child(keys[j]).child('groups').push({
            //     //                     group_name_key : group_name
            //     //                 });
            
            //     //             }
            //     //         });
            //     //     }
            //     // });
            // }
            
            
            //window.location = 'contact-page.html?gn='+group_name;
            // databaseRef_group.on('value',function(snap){
            //     var group_names = snap.val();
            //     var keys = Object.keys(group_names);
            
            //     // keys.forEach(function(group_name_foreach){
            //     //     if(group_name == group_name_foreach){
            //     //         alert('Same group name already exists! Please try again with different name');
            //     //         window.location = "contact-page.html";
            
            //     //     }
            //     //     else
            //     //     {
            //     //         console.log('Match not found');
            //     //     }
            //     // });
            
            //     // for(var i = 0; i< keys.length;i++){
            //     //     if(group_name == keys[i])
            //     //     {
            //     //         alert('Same group name already exists! Please try again with different name');
            //     //         window.location.replace = "contact-page.html";
            
            //     //     }
            //     //     else
            //     //     {
            //     //         var group_description = document.getElementById('group_description').value;
            
            //     //         databaseRef_group.child(group_name).child('details').set({
            //     //             description : group_description,
            //     //             created_by : user.email
            //     //         });
            
            
            //     //         var table = document.getElementById('table_addedmembers');
            
            //     //         for(var i=1;i<table.rows.length;i++){
            //     //             var value = table.rows[i].cells[0].innerHTML;
            //     //             // var member = "member"+i;
            //     //             databaseRef_group.child(group_name).child('members').push({
            //     //                 member : value 
            //     //             });
            
            //     //             databaseRef.on('value',function(snap){
            //     //                 var users = snap.val();
            //     //                 var keys = Object.keys(users);
            
            //     //                 for(var j = 0; j< keys.length;j++){
            //     //                     databaseRef.child(keys[j]).child('details').child('email').on('value',function(email){
            //     //                         if(value == email.val()){
            //     //                             databaseRef.child(keys[j]).child('groups').push({
            //     //                                 group_name : group_name
            //     //                             });
            
            //     //                         }
            //     //                     });
            //     //                 }
            //     //             });
            //     //         }
            
            //     //         window.alert('Group Created');
            //     //         window.location = 'group.html?grpid='+group_name;
            //     //     }
            //     //     break;
            
            //     // }
            
            //     // // if(flag == 1){
            //     //     alert('Same Name Exists! Please try again with different name');
            //     //     return false;
            //     // }
            //     // else
            //     // {
            //     // var group_pic = document.getElementById('group_pic').value;
            
            
            
            // });
            
            
            //window.location = "index.html";
        };
    }
    else
    {
        console.log('Error');
    }
    
    
});


// function getusername(){





// }



function add_member_in_table_addedmembers(){
    var table = document.getElementById("table_addedmembers");
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = document.getElementById('hidden_value').value;
    
    
    
    
    // document.getElementById('add_member_btn').disabled= true;
    var table = document.getElementById("table_searchresults");
    table.deleteRow(1);
}

// var databaseRef = firebase.database().ref('groups');
