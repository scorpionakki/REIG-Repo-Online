
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
                databaseRef.child(data_sharing_keys[i]).on('value',function(snapshot_imageURL){
                    var newRow   = tableRef.insertRow(0);
                    
                    var aimageCell = newRow.insertCell(0);
                    
                    
                    
                    var aimageCellValue = document.createElement('a');
                    
                    aimageCellValue.setAttribute('class','example-image-link');
                    
                    aimageCellValue.setAttribute('href',snapshot_imageURL.child('imageURL').val());
                    
                    aimageCellValue.setAttribute('data-lightbox','example-1');
                    
                    
                    
                    
                    
                    
                    
                    var imageCellValue = document.createElement('img');
                    
                    imageCellValue.setAttribute('src',snapshot_imageURL.child('imageURL').val());
                    
                    imageCellValue.setAttribute('class','example-image');
                    
                    imageCellValue.style.borderRadius = "50%";
                    
                    // imageCellValue.setAttribute('border-radius','50%');
                    
                    imageCellValue.setAttribute('height','100px');
                    
                    imageCellValue.setAttribute('width','100px');
                    
                    // imageCellValue.setAttribute('max-width','50%');
                    
                    aimageCellValue.appendChild(imageCellValue);
                    
                    aimageCell.appendChild(aimageCellValue);
                    
                    //aimageCell.appendChild(imageCell);
                    
                    
                    
                    var captionCell = newRow.insertCell(1);
                    var captionCell_value = document.createTextNode(snapshot_imageURL.child('caption').val());
                    captionCell.appendChild(captionCell_value);
                    
                    var dateCell = newRow.insertCell(2);
                    var dateCell_value = document.createTextNode(snapshot_imageURL.child('date').val());
                    dateCell.appendChild(dateCell_value);
                    tableRef.deleteRow(data_sharing_keys.length);
                    
                })
                
            }
        });
        var img = document.getElementById('loading_gif');
        img.style.visibility = 'hidden';
        document.getElementById('file').onchange = function(event){
            selectedFile = event.target.files[0];
        }
        var profpicRef = firebase.database().ref('users/'+user.uid+'/data_sharing');
        document.getElementById('upload_btn').onclick = function(){
            
            
            var caption = document.getElementById('caption_value').value;
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            var final_date_to_be_stored = dd+"-"+mm+"-"+yyyy;
            
            var filename = selectedFile.name;
            var storageRef = firebase.storage().ref('/'+user.uid+'/'+filename);
            var uploadTask = storageRef.put(selectedFile);
            uploadTask.on('state_changed',function(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                alert('Upload Progress : '+progress+'%');
            },function(error){
                
            },function(){
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                    profpicRef.push({
                        imageURL : downloadURL,
                        caption : caption,
                        date : final_date_to_be_stored
                    });
                });
                
                alert('Uploaded');
                
                document.getElementById('remove_photo').click();
                document.getElementById('caption_value').value = "";
            });
            
            
        }
        
    } else {
        // No user is signed in.
        alert('No user is currently signed in');
        window.location = "login.html";
    }
});


