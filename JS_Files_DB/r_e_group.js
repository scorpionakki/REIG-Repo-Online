var firebaseRef = firebase.database().ref('groups');
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var url_string = window.location.href;
        var url = new URL(url_string);
        var grp_name = url.searchParams.get("name");
        var grp_id = url.searchParams.get("id");
        document.getElementById('group_main').href = "group.html?id="+grp_id+"&name="+grp_name;
        //document.getElementById('group_main_2').href = "group.html?id="+grp_id+"&name="+grp_name;
        document.getElementById('group_details_a').href = "group-details.html?id="+grp_id+"&name="+grp_name;
        document.getElementById('group_members_a').href = "group-members.html?id="+grp_id+"&name="+grp_name;
        document.getElementById('group_re').href = "r_e_group.html?id="+grp_id+"&name="+grp_name;
        document.getElementById('redirect_group').href = "group.html?id="+grp_id+"&name="+grp_name;
        
        
        firebaseRef.child(grp_id).child(grp_name).child('reminders').on('child_added', function(snap){
            var title_reminder_fetch = snap.child('title').val();
            var date_reminder_fetch =  snap.child('date').val();
            var time_reminder_fetch = snap.child('time').val();
            var id = snap.key;
            // var id = snap.val();
            // var id_id = Object.elements(id);
            
            var tableRef = document.getElementById('reminder_table_group').getElementsByTagName('tbody')[0];
            
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
            //alink_more_details.setAttribute('class',"btn btn-primary")
            alink_more_details.setAttribute('class',"fa fa-info")
            
            //alink_more_details.href = "more-detail.html?id="+id;
            
            alink_more_details.href = "more-detail.html?id="+id+"&type=reminders&grpid="+grp_id+"&grpname="+grp_name;
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
            
            
            
        });
        
        firebaseRef.child(grp_id).child(grp_name).child('events').on('child_added', function(snap){
            var title_reminder_fetch = snap.child('title').val();
            var date_reminder_fetch =  snap.child('date').val();
            var time_reminder_fetch = snap.child('time').val();
            var id = snap.key;
            // var id = snap.val();
            // var id_id = Object.elements(id);
            
            var tableRef = document.getElementById('event_group_table').getElementsByTagName('tbody')[0];
            
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
            
            alink_more_details.href = "more-detail.html?id="+id+"&type=events&grpid="+grp_id+"&grpname="+grp_name;
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
            
            
        });
        
        var img = document.getElementById('loading_gif');
        img.style.visibility = 'hidden';
        
        document.getElementById('reminder_add_group').onclick =  function(){
            var title = document.getElementById('reminder_title').value;
            var content = document.getElementById('reminder_content').value;
            var category = document.getElementById('reminder_category').value;
            var date = document.getElementById('reminder_date').value;
            var time = document.getElementById('reminder_time').value;
            
            firebaseRef.child(grp_id).child(grp_name).child('reminders').push({
                title : title,
                content : content,
                category : category,
                date : date,
                time : time
            });
            alert('Reminder Added');
            document.getElementById('reminder_title').value = "";
            document.getElementById('reminder_content').value = "";
            document.getElementById('reminder_category').value = "Default";
            document.getElementById('reminder_date').value = "";
            document.getElementById('reminder_time').value = "";
            document.getElementById('btn_modal_reminder_close').click();
        };
        
        document.getElementById('event_add_group').onclick =  function(){
            var title = document.getElementById('event_title').value;
            var content = document.getElementById('event_content').value;
            var category = document.getElementById('event_category').value;
            var date = document.getElementById('event_date').value;
            var time = document.getElementById('event_time').value;
            
            firebaseRef.child(grp_id).child(grp_name).child('events').push({
                title : title,
                content : content,
                category : category,
                date : date,
                time : time
            });
            
            alert('Event Added');
            document.getElementById('event_title').value = "";
            document.getElementById('event_content').value = "";
            document.getElementById('event_category').value = "Default";
            document.getElementById('event_date').value = "";
            document.getElementById('event_time').value = "";
            document.getElementById('btn_modal_event_close').click();
        };
        
        
        
    } else {
        // No user is signed in.
        alert('No user currently signed in');
        window.location = "login.html";
    }
});