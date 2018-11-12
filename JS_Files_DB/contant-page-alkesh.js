window.alert('Just trying commit');

function getusername(){
    
    var input_value = document.getElementById('search_value').value;
    
    var databaseRef = firebase.database().ref('users/'+input_value);
    
    var table_rows = document.getElementById('table_addedmembers');
    
    for(var i = 0;i< table_rows.rows.length;i++)
    {
        if(table_rows.rows[i].cells[0].innerHTML == input_value){
            document.getElementById('add_member_btn').disabled= true;
            
            break;
        }
        
    }
    
    
    
    databaseRef.on('value',function(snap){
        
        
        if(snap.val() == null){
            window.alert("No such user exist");
        }
        else
        {
            var table = document.getElementById("table_searchresults");
            // if(document.getElementById('table_searchresults').rows.length > 1){
            //     for(var i = 1;i<=document.getElementById('table_searchresults').table.rows.length;i++){
            //         document.getElementById('table_searchresults').deleteRow(i);
            //     }
            // }
            // else
            // {
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            
            
            
            var alink_more_details = document.createElement("button");
            var alink_more_details_text = document.createTextNode('ADD');
            alink_more_details.appendChild(alink_more_details_text);
            // alink.setAttribute("href","http://index.html");
            //alink_more_details.setAttribute('value',"ADD")
            
            alink_more_details.setAttribute('onclick',"add_member_in_table_addedmembers(); return false");
            alink_more_details.setAttribute('id',"add_member_btn");
            //alink_more_details.href = "more-detail.html?id="+id;
            
            // alink_more_details.href = "#table_addedmembers?id="+id;
            
            
            cell1.innerHTML = snap.key;
            cell2.appendChild(alink_more_details);
            
            var hidden_field = document.createElement("INPUT");
            hidden_field.setAttribute("type","hidden");
            hidden_field.setAttribute("id","hidden_value");
            document.body.appendChild(hidden_field);
            
            
            document.getElementById('hidden_value').value = snap.key;
            
            // }
            //document.getElementById('table_searchresults').deleteRow(table.rows.length - 1);
        }
        
        
        
        
    });
    
    //window.alert(databaseRef);
    
    
    
}



function add_member_in_table_addedmembers(){
    var table = document.getElementById("table_addedmembers");
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = document.getElementById('hidden_value').value;
    
    
    
    
    // document.getElementById('add_member_btn').disabled= true;
    var table = document.getElementById("table_searchresults");
    table.deleteRow(1);
}

var databaseRef = firebase.database().ref('groups');

function creategroup(){
    
   
    var username = sessionStorage.getItem('username');
    var group_pic = document.getElementById('group_pic').value;
    var group_name = document.getElementById('group_name').value;
    var group_description = document.getElementById('group_description').value;
    
    databaseRef.child(group_name).child('details').set({
            description : group_description,
            created_by : username
    });
    
    var table = document.getElementById('table_addedmembers');
    for(var i=1;i<table.rows.length;i++){
        var value = table.rows[i].cells[0].innerHTML;
        var member = "member"+i;
        databaseRef.child(group_name).child('members').push({
           member : value 
        });
    }

   
    
}
