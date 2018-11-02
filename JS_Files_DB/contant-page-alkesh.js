var databaseRef = firebase.database();

function getusername(){

    var input_value = document.getElementById('search_value').value;

    databaseRef = databaseRef.ref('users/'+input_value);
    
    databaseRef.on('value',function(snap){

        var table = document.getElementById("table_searchresults");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.innerHTML = snap.key;
        cell2.innerHTML = "ADD - Temporary Text";


    });
    
    
}