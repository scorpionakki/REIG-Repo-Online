var databaseRef = firebase.database().ref('users');
databaseRef.on('value',function(snap){

    var values = snap.val();
    var keys = Object.keys(values);        
    var table = document.getElementById('myTable');
    var tr = table.getElementsByTagName("tr");
    for(var i=0;i<keys.length;i++)
    {
        td = tr[i].getElementsByTagName("td")[i];
        if(td){
            td.innerHTML = keys;
        }
    }
});
function getusername(){

    var valueblah = document.getElementById('search_value').value;
    
    



}