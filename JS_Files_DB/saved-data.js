var profpicRef = firebase.database().ref();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        
        var tableRef = document.getElementById('img_table').getElementsByTagName('tbody')[0];
        // Insert a row in the table at the last row
        
        
        profpicRef.child('users').child(user.uid).child('data_sharing').child('files').on('value',function(snapshot_data_sharing){
            var data_sharing = snapshot_data_sharing.val();
            var data_sharing_keys = Object.keys(data_sharing);
            for(var i=0;i<data_sharing_keys.length;i++){
                profpicRef.child('users').child(user.uid).child('data_sharing').child('files').child(data_sharing_keys[i]).on('value',function(snapshot_imageURL){
                    var newRow   = tableRef.insertRow(0);
                    var cell_row2 = newRow.insertCell(0);

                    var textDocCell = document.createElement('a');
                    var decrypted = CryptoJS.AES.decrypt(snapshot_imageURL.child('imageURL').val(), "Secret Passphrase");
                    textDocCell.setAttribute('href',decrypted.toString(CryptoJS.enc.Utf8));
                    var textDocCellValue = document.createTextNode(snapshot_imageURL.child('name').val());
                    textDocCell.appendChild(textDocCellValue);
                    cell_row2.appendChild(textDocCell);
                    


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
        

        document.getElementById('upload-docx').onchange = function(event){
            selectedFile = event.target.files[0];
            alert('File Selected! Proceed');
            document.getElementById('filename').innerHTML = selectedFile.name;
        }
        
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
                    var encrypted = CryptoJS.AES.encrypt(downloadURL, "Secret Passphrase");
                    profpicRef.child('users').child(user.uid).child('data_sharing').child('files').push({
                        imageURL : encrypted.toString(),
                        caption : caption,
                        name : filename,
                        date : final_date_to_be_stored
                    });

                    alert('Uploaded');
                    
                });
                
                
                
                
                
            });
            
            document.getElementById('filename').innerHTML = "Select Another File or Re-Upload this";
            document.getElementById('caption_value').value = "";
        }
        
    } else {
        // No user is signed in.
        alert('No user is currently signed in');
        window.location = "login.html";
    }
});


