// var profPicRef = firebase.database().ref('users');
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var selectedFile;
        //profpicRef = profpicRef.child(user.uid).child('data_sharing');
        document.getElementById('add_photo_to_storage').onclick = function(event){
            selectedFile = event.target.files[0];
            
            var filename = selectedFile.name;
            var storageRef = firebase.storage().ref('/usersProfPic/'+user.uid+'/'+filename);
            var uploadTask = storageRef.put(selectedFile);
            
            uploadTask.on('state_changed',function(snapshot){
                console.log('Uploaded');
            },function(error){
                
            },function(){
                var caption = document.getElementById('caption').value;
                var currentDate = new Date();
                currentDate = currentDate.getDate() + "/" + currentDate.getMonth() + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes();
                // if(caption == ""){
                //     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                //         profpicRef.push({
                //             imageURL : downloadURL,
                //             caption : ""
                //         });
                //         ;
                //     } );
                // }
                
                console.log(currentDate + caption);
                
                window.alert('Uploaded');
                

            
                //document.getElementById('put_image').src = imgsrc;
                //window.alert(imgsrc);
            });

            return false;
        };
    } else {
        // No user is signed in.
    }
});