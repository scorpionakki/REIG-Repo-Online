var fetchreminderRef = firebase.database().ref('users');
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        // console.log(user.uid);
        // console.log(user.email);
        var img = document.getElementById('loading_gif');
        img.style.visibility = 'hidden';
        //display reminders
        fetchreminderRef = fetchreminderRef.child(user.uid).child('events');
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
            
            var tableRef = document.getElementById('table_event_user').getElementsByTagName('tbody')[0];
            
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
    }
    else
    {
        alert('No user currently signed in');
        window.location = "login.html";
    }
});

