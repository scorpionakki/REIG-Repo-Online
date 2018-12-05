firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        
        var tableRef = document.getElementById('img_table').getElementsByTagName('tbody')[0];
        // Insert a row in the table at the last row
        
        var databaseRef = firebase.database().ref('users').child(user.uid).child('data_sharing');
        databaseRef.on('value',function(snapshot_data_sharing){
            var data_sharing = snapshot_data_sharing.val();
            var data_sharing_keys = Object.keys(data_sharing);
            for(var i=0;i<data_sharing_keys.length;i++){
                databaseRef.child(data_sharing_keys[i]).child('imageURL').on('value',function(snapshot_imageURL){
                    var newRow   = tableRef.insertRow(0);
                    var imageCell = newRow.insertCell(0);
                    var imageCellValue = document.createElement('img');
                    imageCellValue.setAttribute('src',snapshot_imageURL.val());
                    imageCellValue.setAttribute('height','40%');
                    imageCellValue.setAttribute('width','40%');
                    imageCell.appendChild(imageCellValue);
                    tableRef.deleteRow(data_sharing_keys.length);
                    
                })
                
            }
        });
        document.getElementById('file').onchange = function(event){
            selectedFile = event.target.files[0];
        }
        
        var profpicRef = firebase.database().ref('users/'+user.uid+'/data_sharing');
        document.getElementById('upload_btn').onclick = function(){
            var filename = selectedFile.name;
            var storageRef = firebase.storage().ref('/'+user.uid+'/'+filename);
            var uploadTask = storageRef.put(selectedFile);
            
            uploadTask.on('state_changed',function(snapshot){
                
            },function(error){
                
            },function(){
                var imgsrc;
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                    profpicRef.push({
                        imageURL : downloadURL
                    });
                    imgsrc = downloadURL;
                    document.getElementById('put_image').src = imgsrc;
                } );
                
                window.alert('Uploaded');
                
                //document.getElementById('put_image').src = imgsrc;
                //window.alert(imgsrc);
            });
        }
        
    } else {
        // No user is signed in.
        alert('No user is currently signed in');
        window.location.replace = "/login.html";
    }
});


