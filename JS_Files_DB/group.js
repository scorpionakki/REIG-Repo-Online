var url_string = window.location.href;
var url = new URL(url_string);
var grp_name = url.searchParams.get("name");
var grp_id = url.searchParams.get("id");

var chatRef = firebase.database().ref();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
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
                    cell_row2.innerHTML =  message_content.sent_by;
                    cell2_row2.innerHTML = " - ";
                    cell3_row2.innerHTML = message_content.content;
                    table.deleteRow(messageskey.length);
                });
                
            }
        });
        // User is signed in.
        document.getElementById('send_message').onclick =  function(){
            var chat_message = document.getElementById('chat_message').value;
            chatRef.child('groups').child(grp_id).child(grp_name).child('messages').push({
                content : chat_message,
                sent_by : user.email
            });
            
            document.getElementById('chat_message').value = "";
        }
    } else {
        // No user is signed in.
    }
});


