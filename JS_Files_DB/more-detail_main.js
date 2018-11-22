firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        var type = url.searchParams.get("type");
        
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
            more_detail_category.options[4] = new Option('Wishlist', 'Wishlist');
        }
        else 
        {
            window.alert('Error');
            window.location = 'index.html';
        }
        
        var fetchreminderRef = firebase.database().ref('users').child(user.uid).child(type).child(id);
        
        fetchreminderRef.on('value',function(snap){
            document.getElementById('more_detail_title').value = snap.child('title').val();
            document.getElementById('more_detail_description').value = snap.child('content').val();
            document.getElementById('more_detail_date').value = snap.child('date').val();
            document.getElementById('more_detail_time').value = snap.child('time').val();
            document.getElementById('more_detail_category').value = snap.child('category').val();
            console.log(snap.child('category').val());
        });
        
        
        function updatevalues(){
            
            var title_updated = document.getElementById('more_detail_title').value;
            var description_updated = document.getElementById('more_detail_description').value;
            var date_updated = document.getElementById('more_detail_date').value;
            var time_updated = document.getElementById('more_detail_time').value;
            var category_updated = document.getElementById('more_detail_category').value;
            
            fetchreminderRef.set({
                title : title_updated,
                content : description_updated,
                date : date_updated,
                time : time_updated,
                category : category_updated
            });
            
            redirect();
        }
        
        function deletevalues(){
            fetchreminderRef.remove();
            
            redirect();
        }
        
        function redirect(){
            window.location = "index.html";
        }
        
    } else {
        // No user is signed in.
        alert('No user has been signed in');
        window.location = 'login.html';
    }
});



