var databaseRef = firebase.database().ref('users');

function getusername(){
    
    
    var getvalue = document.getElementById('search_value').value;
    databaseRef.on('value',function(snap){
        
        var values = snap.val();
        var keys = Object.keys(values);        
        var flag = 0;
        for(i=0;i<keys.length;i++)
        {
            if(getvalue == keys[i])
            {
                var ulx = document.getElementById('myUL');
                ulx.setAttribute("class","list-group checked-list-box");
                var li = document.createElement('li');
                li.setAttribute("class","list-group-item");
                li.appendChild(document.createTextNode(keys[i]));
                ulx.appendChild(li);
                //document.getElementById('search_value').value = "Found";
                break;            
            }
            else
            {
             flag++;        
            }
        }
        if(flag==keys.length)
        {
            document.getElementById('search_value').value = "Not Found";  
        }
        
    });
    
    
    
}