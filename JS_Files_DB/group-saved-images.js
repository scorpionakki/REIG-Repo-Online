var profpicRef = firebase.database().ref();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var url_string = window.location.href;
        var url = new URL(url_string);
        var grp_name = url.searchParams.get("name");
        var grp_id = url.searchParams.get("id");
        document.getElementById('group_redirect').href = "group.html?id="+grp_id+"&name="+grp_name;
        var tableRef = document.getElementById('img_table').getElementsByTagName('tbody')[0];
        // Insert a row in the table at the last row
        
        var databaseRef = firebase.database().ref('groups').child(grp_id).child(grp_name).child('data_sharing').child('images');
        databaseRef.on('value',function(snapshot_data_sharing){
            var data_sharing = snapshot_data_sharing.val();
            var data_sharing_keys = Object.keys(data_sharing);
            for(var i=0;i<data_sharing_keys.length;i++){
                databaseRef.child(data_sharing_keys[i]).on('value',function(snapshot_imageURL){
                    var newRow   = tableRef.insertRow(0);
                    
                    var aimageCell = newRow.insertCell(0);
                    
                    
                    
                    var aimageCellValue = document.createElement('a');
                    
                    aimageCellValue.setAttribute('class','example-image-link');
                    var decrypted = CryptoJS.AES.decrypt(snapshot_imageURL.child('imageURL').val(), "Secret Passphrase");
                    aimageCellValue.setAttribute('href',decrypted.toString(CryptoJS.enc.Utf8));
                    
                    aimageCellValue.setAttribute('data-lightbox','example-1');
                    
                    
                    
                    
                    
                    
                    
                    var imageCellValue = document.createElement('img');
                    
                    imageCellValue.setAttribute('src',decrypted.toString(CryptoJS.enc.Utf8));
                    
                    imageCellValue.setAttribute('class','example-image');
                    
                    imageCellValue.style.borderRadius = "50%";
                    
                    // imageCellValue.setAttribute('border-radius','50%');
                    
                    imageCellValue.setAttribute('height','100px');
                    
                    imageCellValue.setAttribute('width','100px');
                    
                    // imageCellValue.setAttribute('max-width','50%');
                    
                    aimageCellValue.appendChild(imageCellValue);
                    
                    aimageCell.appendChild(aimageCellValue);
                    
                    
                    var captionCell = newRow.insertCell(1);
                    var captionCell_value = document.createTextNode(snapshot_imageURL.child('caption').val());
                    captionCell.appendChild(captionCell_value);
                    
                    var dateCell = newRow.insertCell(2);
                    var dateCell_value = document.createTextNode(snapshot_imageURL.child('date').val());
                    dateCell.appendChild(dateCell_value);
                    
                    var uploadedby = newRow.insertCell(3);
                    var uploadedby_value = document.createTextNode(snapshot_imageURL.child('uploaded_by').val());
                    uploadedby.appendChild(uploadedby_value);
                    tableRef.deleteRow(data_sharing_keys.length);
                    
                })
                
            }
        });
        var img = document.getElementById('loading_gif');
        img.style.visibility = 'hidden';
        document.getElementById('file').onchange = function(event){
            selectedFile = event.target.files[0];
        }
        
        document.getElementById('upload_btn').onclick = function(){
            
            
            var caption = document.getElementById('caption_value').value;
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            var final_date_to_be_stored = dd+"-"+mm+"-"+yyyy;
            
            var filename = selectedFile.name;
            var storageRef = firebase.storage().ref('/'+grp_id+'/'+grp_name+'/'+filename);
            var uploadTask = storageRef.put(selectedFile);
            uploadTask.on('state_changed',function(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                alert('Upload Progress : '+progress+'%');
            },function(error){
                
            },function(){
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                    var encrypted = CryptoJS.AES.encrypt(downloadURL, "Secret Passphrase");
                    profpicRef.child('groups').child(grp_id).child(grp_name).child('data_sharing').child('images').push({
                        imageURL : encrypted.toString(),
                        caption : caption,
                        date : final_date_to_be_stored,
                        uploaded_by : user.email
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


