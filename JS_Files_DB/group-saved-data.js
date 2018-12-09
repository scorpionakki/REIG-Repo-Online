var url_string = window.location.href;
var url = new URL(url_string);
var grp_name = url.searchParams.get("name");
var grp_id = url.searchParams.get("id");


// User is signed in.

var profpicRef = firebase.database().ref();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        document.getElementById('redirect_group').href = "group.html?id="+grp_id+"&name="+grp_name;
        var tableRef = document.getElementById('img_table').getElementsByTagName('tbody')[0];
        // Insert a row in the table at the last row
        var groupRef = firebase.database().ref('groups');
        groupRef.on('value',function(groupids_snapshot){
            var groupids = groupids_snapshot.val();
            var groupidskey = Object.keys(groupids);
            
            for(var i=0;i<groupidskey.length;i++){
                if(grp_id == groupidskey[i]){
                    groupRef.child(groupidskey[i]).on('value',function(groupname_snapshot){
                        var groupname = groupname_snapshot.val();
                        var groupnamekeys = Object.keys(groupname);
                        if(grp_name != groupnamekeys[0]){
                            alert('Problem with the Name');
                            window.location = "index.html";
                        }
                        else
                        {
                            groupRef.child(groupidskey[i]).child(groupnamekeys[0]).child('members').on('value',function(memberids_snapshot){
                                var membersids = memberids_snapshot.val();
                                var membersidskeys = Object.keys(membersids);
                                flag = 0;
                                for(var j=0;j<membersidskeys.length;j++){
                                    groupRef.child(groupidskey[i]).child(groupnamekeys[0]).child('members').child(membersidskeys[j]).on('value',function(membersemail_snapshot){
                                        var membersemail = membersemail_snapshot.val();
                                        
                                        if(user.email != membersemail.member){
                                            flag = flag + 1; 
                                            
                                        }
                                        
                                        //console.log(membersemail.member);
                                        // if(user.email == membersemail.member){
                                        //     flag == 1;
                                        // }
                                        // console.log(membersemail.member);
                                        // console.log(user.email);
                                        // console.log(flag);
                                        // if(flag != 1){
                                        //     alert('Not a current member');
                                        // }
                                    });
                                }
                                console.log(flag);
                                flag_call(flag,membersidskeys.length);
                                function flag_call(flag,membersidskeysvalue){
                                    if(flag == membersidskeysvalue){
                                        alert('Not a member');
                                        window.location = "index.html";
                                    }
                                }
                                // for(var j=0;j<membersidskeys.length;j++){
                                //     if(user.email == membersidskeys[i].member){
                                //         flag == 1;
                                //     }
                                // }
                                
                                // if(flag != 1){
                                //     alert('Not current member of this group');
                                
                                // }
                            });
                        }
                    });
                }
            }
            
        });
        
        profpicRef.child('groups').child(grp_id).child(grp_name).child('data_sharing').child('files').on('value',function(snapshot_data_sharing){
            var data_sharing = snapshot_data_sharing.val();
            var data_sharing_keys = Object.keys(data_sharing);
            for(var i=0;i<data_sharing_keys.length;i++){
                profpicRef.child('groups').child(grp_id).child(grp_name).child('data_sharing').child('files').child(data_sharing_keys[i]).on('value',function(snapshot_imageURL){
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
                    
                    var uploadedBy = newRow.insertCell(3);
                    var uploadedBy_value = document.createTextNode(snapshot_imageURL.child('uploaded_by').val());
                    uploadedBy.appendChild(uploadedBy_value);
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
                    profpicRef.child('groups').child(grp_id).child(grp_name).child('data_sharing').child('files').push({
                        imageURL : encrypted.toString(),
                        caption : caption,
                        name : filename,
                        date : final_date_to_be_stored,
                        uploaded_by : user.email
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

