// var storage = firebase.app().storage("gs://reig-1538140691138.appspot.com");
// var storageRef = storage.ref();

// var selectedFile;
// $("#file").on("change",function(event){

//     selectedFile = event.target.files[0];
//     alert("Hello");
// });
var selectedFile;
function getFile(event){
    selectedFile = event.target.files[0];
}
var profpicRef = firebase.database().ref('users/testing_reig/details');
function storefile(){

    
    var filename = selectedFile.name;
    var storageRef = firebase.storage().ref('/usersProfPic/'+filename);
    var uploadTask = storageRef.put(selectedFile);

    uploadTask.on('state_changed',function(snapshot){
        
    },function(error){

    },function(){
        var imgsrc;
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            profpicRef.update({
                profpic_FileName : downloadURL
            });
            imgsrc = downloadURL;
            document.getElementById('put_image').src = imgsrc;
        } );
        
        window.alert('Uploaded');
        
        //document.getElementById('put_image').src = imgsrc;
        //window.alert(imgsrc);
    });
}

