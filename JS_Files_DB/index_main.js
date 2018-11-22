var eventRef = firebase.database().ref('users');
var groupRef = firebase.database().ref('groups');
var fetchreminderRef = firebase.database().ref('users');
var eventRef2 = firebase.database().ref('users');
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        // console.log(user.uid);
        // console.log(user.email);
        eventRef.child(user.uid).child('details').update({
            email : user.email
        });
        var nav_user_prof = document.getElementById('user_email');
        nav_user_prof.innerHTML = user.email;
        //display reminders
        fetchreminderRef = fetchreminderRef.child(user.uid).child('reminders');
        // //for getting no. of events i.e event count
        // var countRef = firebase.database().ref('users').child('testing_reig').child('total_events');
        // var event_count;
        // eventRef.on('value',function(data){
        //     var count = data.val();
        //     var count_keys = Object.keys(count);
        //     countRef.set(count_keys.length);
        //     event_count = count_keys.length;
        // });
        // window.alert(event_count);
        
        //retrievingreminders
        fetchreminderRef.on('child_added', function(snap){
            var title_reminder_fetch = snap.child('title').val();
            var date_reminder_fetch =  snap.child('date').val();
            var time_reminder_fetch = snap.child('time').val();
            var id = snap.key;
            // var id = snap.val();
            // var id_id = Object.elements(id);
            
            var tableRef = document.getElementById('remindertable').getElementsByTagName('tbody')[0];
            
            // Insert a row in the table at the last row
            var newRow   = tableRef.insertRow(tableRef.rows.length);
            
            // Insert a cell in the row at index 0
            var title_cell = newRow.insertCell(0);
            var date_cell = newRow.insertCell(1);
            var time_cell = newRow.insertCell(2);
            var more_details_cell = newRow.insertCell(3);
            //var remove_cell = newRow.insertCell(4);
            var id_cell = newRow.insertCell(4).hidden;
            // Append a text node to the cell
            var title_value_cell = document.createTextNode(title_reminder_fetch);
            var date_value_cell = document.createTextNode(date_reminder_fetch);
            var time_value_cell = document.createTextNode(time_reminder_fetch);
            var id_value_cell = document.createTextNode(id);
            
            
            var alink_more_details = document.createElement("a");
            var alink_more_details_text = document.createTextNode('');
            alink_more_details.appendChild(alink_more_details_text);
            // alink.setAttribute("href","http://index.html");
            alink_more_details.setAttribute('class',"btn btn-primary")
            alink_more_details.setAttribute('class',"fa fa-info")
            
            //alink_more_details.href = "more-detail.html?id="+id;
            
            alink_more_details.href = "more-detail.html?id="+id+"&type=reminders";
            // d18354b4120a4ec1e9021823058e823e27b0b7ce
            
            // alink_more_details.href = "more-detail.html?id="+id+"?type=reminders";
            // d18354b4120a4ec1e9021823058e823e27b0b7ce
            
            // alink_more_details.href = "more-detail.html?id="+id;
            // f5c169c91bad0dc0780cb9bf7c61705dfeccf8
            
            
            //REMOVEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE is still left
            
            //REMOVEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE is still left
            // var alink_remove = document.createElement("a");
            // var alink_remove_text = document.createTextNode('');
            // alink_remove.appendChild(alink_remove_text);
            // // alink.setAttribute("href","http://index.html");
            // alink_remove.setAttribute('class',"btn btn-primary");
            // alink_remove.setAttribute('class',"fa fa-trash");
            // alink_remove.href = "http://index.html?id="+id;
            
            
            title_cell.appendChild(title_value_cell);
            date_cell.appendChild(date_value_cell);
            time_cell.appendChild(time_value_cell);
            more_details_cell.appendChild(alink_more_details);
            //remove_cell.appendChild(alink_remove);
            id_cell = appendChild(id_value_cell);
            
            
        },function(error){
            alert('There was some error! Please Try Again');
            document.location.reload(true);
        });
        
        //fetch event details
        eventRef2 = eventRef2.child(user.uid).child('events');
        
        eventRef2.on('child_added', function(snap){
            var title_reminder_fetch = snap.child('title').val();
            var date_reminder_fetch =  snap.child('date').val();
            var time_reminder_fetch = snap.child('time').val();
            var id = snap.key;
            // var id = snap.val();
            // var id_id = Object.elements(id);
            
            var tableEventRef = document.getElementById('eventtable').getElementsByTagName('tbody')[0];
            
            // Insert a row in the table at the last row
            var newRow   = tableEventRef.insertRow(tableEventRef.rows.length);
            
            // Insert a cell in the row at index 0
            var title_cell = newRow.insertCell(0);
            var date_cell = newRow.insertCell(1);
            var time_cell = newRow.insertCell(2);
            var more_details_cell = newRow.insertCell(3);
            //var remove_cell = newRow.insertCell(4);
            var id_cell = newRow.insertCell(4).hidden;
            // Append a text node to the cell
            var title_value_cell = document.createTextNode(title_reminder_fetch);
            var date_value_cell = document.createTextNode(date_reminder_fetch);
            var time_value_cell = document.createTextNode(time_reminder_fetch);
            var id_value_cell = document.createTextNode(id);
            
            
            var alink_more_details = document.createElement("a");
            var alink_more_details_text = document.createTextNode('');
            alink_more_details.appendChild(alink_more_details_text);
            // alink.setAttribute("href","http://index.html");
            alink_more_details.setAttribute('class',"btn btn-primary")
            alink_more_details.setAttribute('class',"fa fa-info")
            
            //alink_more_details.href = "more-detail.html?id="+id;
            
            alink_more_details.href = "more-detail.html?id="+id+"&type=events";
            // d18354b4120a4ec1e9021823058e823e27b0b7ce
            
            // alink_more_details.href = "more-detail.html?id="+id+"?type=reminders";
            // d18354b4120a4ec1e9021823058e823e27b0b7ce
            
            // alink_more_details.href = "more-detail.html?id="+id;
            // f5c169c91bad0dc0780cb9bf7c61705dfeccf8
            
            
            //REMOVEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE is still left
            
            //REMOVEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE is still left
            // var alink_remove = document.createElement("a");
            // var alink_remove_text = document.createTextNode('');
            // alink_remove.appendChild(alink_remove_text);
            // // alink.setAttribute("href","http://index.html");
            // alink_remove.setAttribute('class',"btn btn-primary");
            // alink_remove.setAttribute('class',"fa fa-trash");
            // alink_remove.href = "http://index.html?id="+id;
            
            
            title_cell.appendChild(title_value_cell);
            date_cell.appendChild(date_value_cell);
            time_cell.appendChild(time_value_cell);
            more_details_cell.appendChild(alink_more_details);
            //remove_cell.appendChild(alink_remove);
            id_cell = appendChild(id_value_cell);
            
            
        },function(error){
            alert('There was some error');
            document.location.reload(true);
        });
        
        //fetch group name
        groupRef.on('value',function(snapshot){
            var groupIDs = snapshot.val();
            var keys = Object.keys(groupIDs);
            
            for(var i=0;i<keys.length;i++)
            {
                groupRef.child(keys[i]).on('value',function(snapshot_gn){
                    console.log(keys[i]);
                    var groupname = snapshot_gn.val();
                    var keysgroupname = Object.keys(groupname);
                    groupRef.child(keys[i]).child(keysgroupname[0]).child('members').on('value',function(snapshot_mem){
                        var members_id = snapshot_mem.val();
                        var keysmembers_id = Object.keys(members_id);
                        for(var j=0;j<keysmembers_id.length;j++){
                            console.log(keysmembers_id[j]);
                            groupRef.child(keys[i]).child(keysgroupname[0]).child('members').child(keysmembers_id[j]).on('value',function(email_snapshot){
                                var emails = email_snapshot.val();
                                console.log(emails.member);
                                if(emails.member == user.email)
                                {
                                    console.log('Match Found' + keysgroupname[0]);
                                    var table = document.getElementById('group_table');
                                    var row = table.insertRow(1);
                                    var cell1 = row.insertCell(0);
                                    
                                    var alink_group_name = document.createElement('a');
                                    alink_group_name_text = document.createTextNode(keysgroupname[0]);
                                    alink_group_name.appendChild(alink_group_name_text);
                                    alink_group_name.setAttribute('href','group.html?name='+keysgroupname[0]+'&id='+keys[i]);
                                    
                                    cell1.appendChild(alink_group_name);
                                }
                            });
                        }
                    });
                }); 
            }
        },function(error){
            alert('There was some error');
            document.location.reload(true);
        });
        
        var img = document.getElementById('loading_gif');
        img.style.visibility = 'hidden';
        // store reminder
        document.getElementById('btn_reminder_add').onclick = function(){
            var reminder_title_val = document.getElementById('reminder_title').value;
            var reminder_content_val = document.getElementById('reminder_content').value;
            var reminder_category_val = document.getElementById('reminder_category').value;
            var reminder_datetime_val = document.getElementById('reminder_datetime').value;
            var reminder_datetime_split = reminder_datetime_val.split(" ");
            var reminder_date_only = reminder_datetime_split[0];
            var reminder_time_only = reminder_datetime_split[1];
            var reminder_ampm_only = reminder_datetime_split[2];
            var reminder_fulltime_only = reminder_time_only + " " + reminder_ampm_only;
            
            if(reminder_title_val == ""){
                eventRef.preventDefault();
            }

            eventRef.child(user.uid).child('reminders').push({
                title : reminder_title_val,
                content : reminder_content_val,
                category : reminder_category_val,
                date : reminder_date_only,
                time : reminder_fulltime_only
            });
            
            console.log('Done');
        };
        
        //store event
        document.getElementById('btn_event_add').onclick = function(){
            var event_title_val = document.getElementById('event_title').value;
            var event_content_val = document.getElementById('event_content').value;
            var event_category_val = document.getElementById('event_category').value;
            var event_datetime_val = document.getElementById('event_datetime').value;
            var event_datetime_split = event_datetime_val.split(" ");
            var event_date_only = event_datetime_split[0];
            var event_time_only = event_datetime_split[1];
            var event_ampm_only = event_datetime_split[2];
            var event_fulltime_only = event_time_only + " " + event_ampm_only;
            
            if(event_title_val == ""){
                eventRef.preventDefault();
            }
            
            eventRef.child(user.uid).child('events').push({
                title : event_title_val,
                content : event_content_val,
                category : event_category_val,
                date : event_date_only,
                time : event_fulltime_only
            });
            
            console.log('Done');
        };
        
    } else {
        // No user is signed in.
        window.alert('Sorry! No user has been signed in. Please try logging in again');
        window.location = 'login.html';
    }
});




// function addeventdata(){
//     var event_title_val = document.getElementById('event_title').value;
//     var event_content_val = document.getElementById('event_content').value;
//     var event_category_val = document.getElementById('event_category').value;
//     var event_datetime_val = document.getElementById('event_datetime').value;
// }