var url_string = window.location.href;
var url = new URL(url_string);
var grp_name = url.searchParams.get("name");
var grp_id = url.searchParams.get("id");

firebase.auth().onAuthStateChanged(function(user) {
    
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
                        
                        var h5_creation = document.createElement('h5');
                        var decrypted = CryptoJS.AES.decrypt(message_content.content, "Secret Passphrase");
                        var h5_creation_text = document.createTextNode(decrypted.toString(CryptoJS.enc.Utf8));
                        h5_creation.appendChild(h5_creation_text);
                        
                        cell_row2.appendChild(h5_creation);
                        
                        cell2_row2.innerHTML ="&nbsp; &nbsp;";
                        
                        var p_creation = document.createElement('p');
                        var p_creation_text = document.createTextNode(message_content.sent_by);
                        p_creation.appendChild(p_creation_text);
                        
                        // var div_message = document.createElement('div');
                        // div_message.setAttribute('class','col-md-12');
                        
                        // var div_sentby = document.createElement('div');
                        // div_sentby.setAttribute('class','col-md-12');
                        
                        cell3_row2.appendChild(p_creation);
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
        } else {
            // No user is signed in.
            alert('No user has been signed in');
            window.location = "index.html";
        }
    });
    
    
});





