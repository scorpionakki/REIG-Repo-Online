var url_string = window.location.href;
var url = new URL(url_string);
var grp_name = url.searchParams.get("name");
var grp_id = url.searchParams.get("id");


// User is signed in.

var chatRef = firebase.database().ref();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById('group_details_a').href = "group-details.html?id="+grp_id+"&name="+grp_name;
        document.getElementById('group_members_a').href = "group-members.html?id="+grp_id+"&name="+grp_name;
        document.getElementById('group_re').href = "r_e_group.html?id="+grp_id+"&name="+grp_name;
        document.getElementById('group_saved_images').href = "group-saved-images.html?id="+grp_id+"&name="+grp_name;
        //check if the current user is member of that group if somehow he directly pastes the url.
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
        
        
        var table = document.getElementById('chat_table');
        
        chatRef.child('groups').child(grp_id).child(grp_name).child('messages').on('value',function(messages_snapshot){
            var messages = messages_snapshot.val();
            messageskey = Object.keys(messages);
            
            for(var i=0;i<messageskey.length;i++){
                chatRef.child('groups').child(grp_id).child(grp_name).child('messages').child(messageskey[i]).on('value',function(message_content_snapshot){
                    
                    
                    var message_content = message_content_snapshot.val();
                    // var row = table.insertRow(0);
                    // var cell_row = row.insertCell(0);
                    // cell_row.innerHTML =  message_content.sent_by;
                    var row2 = table.insertRow(0);
                    
                    var cell_row2 = row2.insertCell(0);
                    
                    var cell2_row2 = row2.insertCell(1);
                    var cell3_row2 = row2.insertCell(2);
                    //var cell3_row2 = row2.insertCell(2);
                    
                    var div_creation = document.createElement('div');
                    // div_creation.setAttribute('class','chat-message-content clearfix');
                    row2.appendChild(div_creation);
                    var p_creation = document.createElement('p');
                    var p_creation_text = document.createTextNode(message_content.sent_by);
                    p_creation.appendChild(p_creation_text);
                    cell_row2.appendChild(p_creation);

                    if(message_content_snapshot.child('type').val() == 'image'){
                        var aimageCellValue = document.createElement('a');
                        
                        aimageCellValue.setAttribute('class','example-image-link');
                        
                        aimageCellValue.setAttribute('href',message_content_snapshot.child('imageURL').val());
                        
                        aimageCellValue.setAttribute('data-lightbox','example-1');
                        
                        
                        
                        
                        
                        
                        
                        var imageCellValue = document.createElement('img');
                        
                        imageCellValue.setAttribute('src',message_content_snapshot.child('imageURL').val());
                        
                        //imageCellValue.setAttribute('class','example-image');
                        
                        //imageCellValue.style.borderRadius = "50%";
                        
                        // imageCellValue.setAttribute('border-radius','50%');
                        
                        //imageCellValue.setAttribute('height','50% !important');
                        imageCellValue.setAttribute ('height','130px');
                        imageCellValue.setAttribute('width','100px');
                        
                        // imageCellValue.setAttribute('max-width','50%');
                        
                        aimageCellValue.appendChild(imageCellValue);
                        
                        cell_row2.appendChild(aimageCellValue);
                    }
                    else if(message_content_snapshot.child('type').val() == 'file'){
                        var docImageCell = document.createElement('img');
                        docImageCell.setAttribute('src','assets/img/doc_logo.png');
                        docImageCell.setAttribute('height','40px');
                        docImageCell.setAttribute('width','30px');

                        cell_row2.appendChild(docImageCell);

                        var textDocCell = document.createElement('a');
                        textDocCell.setAttribute('href',message_content_snapshot.child('imageURL').val());
                        var textDocCellValue = document.createTextNode(message_content_snapshot.child('name').val());
                        textDocCell.appendChild(textDocCellValue);
                        cell_row2.appendChild(textDocCell);
                    }
                    else
                    {
                        var h5_creation = document.createElement('h6');
                        var decrypted = CryptoJS.AES.decrypt(message_content.content, "Secret Passphrase");
                        var h5_creation_text = document.createTextNode(decrypted.toString(CryptoJS.enc.Utf8));
                        h5_creation.appendChild(h5_creation_text);
                        
                        cell_row2.appendChild(h5_creation);
                    }
                    
                    
                    
                    
                    
                    
                    // var div_message = document.createElement('div');
                    // div_message.setAttribute('class','col-md-12');
                    
                    // var div_sentby = document.createElement('div');
                    // div_sentby.setAttribute('class','col-md-12');
                    
                    //cell3_row2.appendChild(p_creation);
                    // div_sentby.appendChild(cell_row2);
                    // div_sentby.appendChild(cell3_row2);
                    // cell_row2.innerHTML =  message_content.sent_by;
                    //cell2_row2.innerHTML = " - ";
                    //cell3_row2.innerHTML = message_content.content;
                    table.deleteRow(messageskey.length);
                });
                
            }
        },function(error){
            alert('Error! Please try again');
            window.location = "index.html";
        });
        
        var img = document.getElementById('loading_gif');
        img.style.visibility = 'hidden';
        // User is signed in.
        
        document.getElementById('upload-docx').onchange = function(event){
            selectedFile = event.target.files[0];
            var filename = selectedFile.name;
            var storageRef = firebase.storage().ref('/'+grp_id+'/'+grp_name+'/'+filename);
            var uploadTask = storageRef.put(selectedFile);
            uploadTask.on('state_changed',function(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                alert('Upload Progress : '+progress+'%');
            },function(error){
                alert('error');
            },function(){
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                    chatRef.child('groups').child(grp_id).child(grp_name).child('messages').push({
                        imageURL : downloadURL,
                        type : 'file',
                        sent_by : user.email,
                        name : filename
                    });
                });
                
                alert('Uploaded');
            });
        }
        
        document.getElementById('upload').onchange = function(event){
            selectedFile = event.target.files[0];
            var filename = selectedFile.name;
            var storageRef = firebase.storage().ref('/'+grp_id+'/'+grp_name+'/'+filename);
            var uploadTask = storageRef.put(selectedFile);
            uploadTask.on('state_changed',function(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                alert('Upload Progress : '+progress+'%');
            },function(error){
                alert('error');
            },function(){
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                    chatRef.child('groups').child(grp_id).child(grp_name).child('messages').push({
                        imageURL : downloadURL,
                        type : 'image',
                        sent_by : user.email
                    });
                });
                
                alert('Uploaded');
            });
        }
        
        // document.getElementById('btn_upload_image').onclick = function(){
        //     var filename = selectedFile.name;
        //     var storageRef = firebase.storage().ref('/BRUH/'+filename);
        //     var uploadTask = storageRef.put(selectedFile);
        //     uploadTask.on('state_changed',function(snapshot){
        //             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //             alert('Upload Progress : '+progress+'%');
        //         },function(error){
        
        //         });
        // }   
        
        // uploadTask.on('state_changed',function(snapshot){
        //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     alert('Upload Progress : '+progress+'%');
        // },function(error){
        
        // },function(){
        //     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
        //         profpicRef.push({
        //             imageURL : downloadURL,
        //             caption : caption,
        //             date : final_date_to_be_stored,
        //             type : file
        //         });
        //     });
        
        //     alert('Uploaded');
        
        //     // document.getElementById('remove_photo').click();
        //     // document.getElementById('caption_value').value = "";
        // });
        
        
        
        document.getElementById('btn_add_reminder').onclick =  function(){
            
            
            var reminder_title = document.getElementById('reminder_title').value;
            var reminder_content = document.getElementById('reminder_content').value;
            var reminder_category = document.getElementById('reminder_category').value;
            var reminder_date = document.getElementById('reminder_date').value;
            var reminder_time = document.getElementById('reminder_time').value;
            
            chatRef.child('groups').child(grp_id).child(grp_name).child('reminders').push({
                title : reminder_title,
                content : reminder_content,
                category : reminder_category,
                date : reminder_date,
                time : reminder_time
            });
            
            alert('Reminder Added');
            document.getElementById('reminder_title').value = "";
            document.getElementById('reminder_content').value = "";
            document.getElementById('reminder_category').value = "Default";
            document.getElementById('reminder_date').value = "";
            document.getElementById('reminder_time').value = "";
            document.getElementById('btn_modal_reminder_close').click();
            document.getElementById('chat_message').value = "Reminder - Titled : "+reminder_title+" has been added by : "+user.email;
            document.getElementById('send_message').click();
            
        }
        
        document.getElementById('btn_add_event').onclick =  function(){
            var event_title = document.getElementById('event_title').value;
            var event_content = document.getElementById('event_content').value;
            var event_category = document.getElementById('event_category').value;
            var event_date = document.getElementById('event_date').value;
            var event_time = document.getElementById('event_time').value;
            
            chatRef.child('groups').child(grp_id).child(grp_name).child('events').push({
                title : event_title,
                content : event_content,
                category : event_category,
                date : event_date,
                time : event_time
            });
            
            alert('Event Added');
            document.getElementById('event_title').value = "";
            document.getElementById('event_content').value = "";
            document.getElementById('event_category').value = "Default";
            document.getElementById('event_date').value = "";
            document.getElementById('event_time').value = "";
            document.getElementById('btn_modal_event_close').click();
            document.getElementById('chat_message').value = "Event - Titled : "+event_title+" has been added by : "+user.email;
            document.getElementById('send_message').click();
        }
        
        
        document.getElementById('send_message').onclick =  function(){
            var chat_message = document.getElementById('chat_message').value;
            
            if(chat_message == ""){
                chatRef.preventDefault();
            }
            var encrypted = CryptoJS.AES.encrypt(chat_message, "Secret Passphrase");
            chatRef.child('groups').child(grp_id).child(grp_name).child('messages').push({
                content : encrypted.toString(),
                sent_by : user.email
            });
            document.getElementById('chat_message').value = "";
        }
        
        
        document.getElementById('exit_group').onclick = function(){
            chatRef.child('groups').child(grp_id).child(grp_name).child('members').on('value',function(snapshot_members){
                var members_value = snapshot_members.val();
                var members_value_keys = Object.keys(members_value);
                
                for(var j=0;j<=members_value_keys.length;j++){
                    chatRef.child('groups').child(grp_id).child(grp_name).child('members').child(members_value_keys[j]).on('value',function(member_snapshot){
                        if(member_snapshot.val().member == user.email){
                            chatRef.child('groups').child(grp_id).child(grp_name).child('members').child(members_value_keys[j]).remove(function(){
                                alert('Group Exit Successful');
                            })
                        }
                    });
                    
                }
            });
        }
    } else {
        // No user is signed in.
        alert('No user has been signed in');
        window.location = "index.html";
    }
});








