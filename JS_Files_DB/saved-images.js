var selectedFile;
function getFile(event){
    selectedFile = event.target.files[0];
}
// document.getElementById('add_photo_to_storage').addEventListener('click',function(){
//     alert('Hello');
//     // var filename = selectedFile.name;
//     // var storageRef = firebase.storage().ref('/REIG/'+filename);
//     // var uploadTask = storageRef.put(selectedFile);

//     // uploadTask.on('state_changed',function(snapshot){

//     // },function(error){

//     // },function(){
//     //     var downloadURL = uploadTask.snapshot.downloadURL;
//     //     console.log(downloadURL);
//     // });

//     return false;
// },false);

function uploadFile(){
    var filename = selectedFile.name;
    var storageRef = firebase.storage().ref('/REIG/'+filename);
    var uploadTask = storageRef.put(selectedFile);
    
    uploadTask.on('state_changed',function(snapshot){
        
    },function(error){
        
    },function(){
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log(downloadURL);
    });

}