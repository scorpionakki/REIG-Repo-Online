var userSettingRef = firebase.database().ref('users');
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        
      // User is signed in.
      var phone = document.getElementById('Phone');
     
      var description = document.getElementById('Description');
      userSettingRef = userSettingRef.child(user.uid).child('details');
      userSettingRef.on('value',function(snapshot_userdetails){
            var userdetails = snapshot_userdetails.val();
            // phone = userdetails.phone;
            // description = userdetails.description;
            // email = userdetails.email;
            document.getElementById('Email').value = userdetails.email;
            document.getElementById('Phone').value = userdetails.phone;
            document.getElementById('Description').value = userdetails.description;
      });
    } else {
      // No user is signed in.
      alert('No user is logged in');
      window.location = 'login.html';
    }
  });