firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        var type = url.searchParams.get("type");
        var grpid = url.searchParams.get("grpid");
        var grpname = url.searchParams.get("grpname");
        if(url_string == "http://localhost:8010/REIG-Repo-Online/more-detail.html" || url_string == "http://localhost/REIG-Repo-Online/more-detail.html" || url_string == "http://localhost/REIG-Repo-Online/more-detail.html?" || url_string == "http://localhost:8010/REIG-Repo-Online/more-detail.html?"){
        alert('Redirecting to Index');
        window.location = 'index.html';
    }
    if(type == "events"){
        var more_detail_category = document.getElementById('more_detail_category');
        more_detail_category.options[0] = new Option('Default', 'Default');
        more_detail_category.options[1] = new Option('Birthday', 'Birthday');
        more_detail_category.options[2] = new Option('Anniversary', 'Anniversary');
        more_detail_category.options[3] = new Option('Fest', 'Fest');
    }
    else if(type == "reminders"){
        var more_detail_category = document.getElementById('more_detail_category');
        more_detail_category.options[0] = new Option('Default', 'Default');
        more_detail_category.options[1] = new Option('Personal', 'Personal');
        more_detail_category.options[2] = new Option('Shopping', 'Shopping');
        more_detail_category.options[3] = new Option('Work', 'Work');
        more_detail_category.options[4] = new Option('Whishlist', 'Whishlist');
    }
    var img = document.getElementById('loading_gif');
    img.style.visibility = 'hidden';
    
    if(id == "" || type== ""){
        alert('Redirecting to Index');
        window.location = 'index.html';
    }
    
    else if(grpid == null || grpname== null){
        var fetchreminderRef = firebase.database().ref('users').child(user.uid).child(type).child(id);
        
        fetchreminderRef.on('value',function(snap){
            document.getElementById('more_detail_title').value = snap.child('title').val();
            document.getElementById('more_detail_description').value = snap.child('content').val();
            var full_date = snap.child('date').val();
            var full_date_split = full_date.split("-");
            var actual_date = full_date_split[1];
            var month = full_date_split[0];
            var year = full_date_split[2];
            
            document.getElementById('more_detail_date').value = full_date;
            
            var full_time = snap.child('time').val();
            var full_time_split = full_time.split(" ");
            var only_time = full_time_split[0];            
            document.getElementById('more_detail_time').value = only_time;
            document.getElementById('more_detail_category').value = snap.child('category').val();
            //console.log(snap.child('category').val());
        },function(error){
            if(error){
                alert('Error! Please Try Again');
                window.location = 'index.html';
            }
        });
        
        document.getElementById('btn_update_RE').onclick = function()
        {
            var title_updated = document.getElementById('more_detail_title').value;
            var description_updated = document.getElementById('more_detail_description').value;
            var date_updated = document.getElementById('more_detail_date').value;
            var time_updated = document.getElementById('more_detail_time').value;
            var category_updated = document.getElementById('more_detail_category').value;
            
            if(title_updated == ""){
                alert('Please provide a title');
                window.location = "index.html";
                fetchreminderRef.preventDefault();
                
            }
            
            fetchreminderRef.set({
                title : title_updated,
                content : description_updated,
                date : date_updated,
                time : time_updated,
                category : category_updated
            });
            
            location.reload();
        }
        
        document.getElementById('btn_delete_RE').onclick = function(){
            
            fetchreminderRef.remove(function(){
                alert('Removed');
                
            });
            
            window.location = "index.html";
        }
    }
    else
    {
        var fetchreminderRef = firebase.database().ref('groups').child(grpid).child(grpname).child(type).child(id);
        
        fetchreminderRef.on('value',function(snap){
            document.getElementById('more_detail_title').value = snap.child('title').val();
            document.getElementById('more_detail_description').value = snap.child('content').val();
            var full_date = snap.child('date').val();
            var full_date_split = full_date.split("-");
            var actual_date = full_date_split[1];
            var month = full_date_split[0];
            var year = full_date_split[2];
            
            document.getElementById('more_detail_date').value = full_date;
            
            var full_time = snap.child('time').val();
            var full_time_split = full_time.split(" ");
            var only_time = full_time_split[0];            
            document.getElementById('more_detail_time').value = only_time;
            document.getElementById('more_detail_category').value = snap.child('category').val();
            //console.log(snap.child('category').val());
        },function(error){
            if(error){
                alert('Error! Please Try Again');
                window.location = 'index.html';
            }
        });
        
        document.getElementById('btn_update_RE').onclick = function()
        {
            var title_updated = document.getElementById('more_detail_title').value;
            var description_updated = document.getElementById('more_detail_description').value;
            var date_updated = document.getElementById('more_detail_date').value;
            var time_updated = document.getElementById('more_detail_time').value;
            var category_updated = document.getElementById('more_detail_category').value;
            
            if(title_updated == ""){
                alert('Please provide a title');
                window.location = "index.html";
                fetchreminderRef.preventDefault();
                
            }
            
            fetchreminderRef.set({
                title : title_updated,
                content : description_updated,
                date : date_updated,
                time : time_updated,
                category : category_updated
            });
            
            location.reload();
        }
        
        document.getElementById('btn_delete_RE').onclick = function(){
            
            fetchreminderRef.remove(function(){
                alert('Removed');
                
            });
            
            window.location = "index.html";
        }
    }
    
    
    
    
    
    // document.getElementById('btn_update_RE').onclick = function()
    // {
    //     var title_updated = document.getElementById('more_detail_title').value;
    //     var description_updated = document.getElementById('more_detail_description').value;
    //     var date_updated = document.getElementById('more_detail_date').value;
    //     var time_updated = document.getElementById('more_detail_time').value;
    //     var category_updated = document.getElementById('more_detail_category').value;
    
    //     if(title_updated == ""){
    //         alert('Please provide a title');
    //         window.location = "index.html";
    //         fetchreminderRef.preventDefault();
    
    //     }
    
    //     fetchreminderRef.set({
    //         title : title_updated,
    //         content : description_updated,
    //         date : date_updated,
    //         time : time_updated,
    //         category : category_updated
    //     });
    
    //     location.reload();
    // }
    
    // document.getElementById('btn_delete_RE').onclick = function(){
    
    //     fetchreminderRef.remove(function(){
    //         alert('Removed');
    
    //     });
    
    //     window.location = "index.html";
    
    // }
    
} else {
    // No user is signed in.
    alert('No user has been signed in');
    window.location = 'login.html';
}
});



