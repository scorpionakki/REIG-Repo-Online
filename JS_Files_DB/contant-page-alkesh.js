var databaseRef = firebase.database();

function getusername(){
    
    var input_value = document.getElementById('search_value').value;
    
    databaseRef = databaseRef.ref('users/'+input_value);
    
    databaseRef.on('value',function(snap){
        
        var table = document.getElementById("table_searchresults");
        var row = table.insertRow(table.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        
        var alink_more_details = document.createElement("button");
        var alink_more_details_text = document.createTextNode('ADD');
        alink_more_details.appendChild(alink_more_details_text);
        // alink.setAttribute("href","http://index.html");
        //alink_more_details.setAttribute('value',"ADD")

        var key = snap.key;
        alink_more_details.setAttribute('onclick',"add_member_in_table_addedmembers(key);");
        
        //alink_more_details.href = "more-detail.html?id="+id;
        
        // alink_more_details.href = "#table_addedmembers?id="+id;
        
        
        cell1.innerHTML = snap.key;
        cell2.appendChild(alink_more_details);
        
        
        
        
        
    });
    
    
}

function add_member_in_table_addedmembers(key){
    var table = document.getElementById("table_addedmembers");
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = key;
}