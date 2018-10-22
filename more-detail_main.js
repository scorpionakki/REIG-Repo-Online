var fetch_url = window.location.href;
var url_split = fetch_url.split("?");
var full_id_and_reminder = url_split[1];
var full_id_split = full_id_and_reminder.split("=");
var final_id = full_id_split[1];
var full_type = url_split[2];
var full_type_split = full_type.split("=");
var final_type = full_type_split[1];

var fetchreminderRef = firebase.database().ref('users').child('testing_reig').child(final_type).child(final_id);

fetchreminderRef.on('value',function(snap){

    document.getElementById('more_detail_title').value = snap.child('title').val();
    document.getElementById('more_detail_description').value = snap.child('content').val();
    document.getElementById('more_detail_date').value = snap.child('date').val();
    document.getElementById('more_detail_time').value = snap.child('time').val();
    document.getElementById('more_detail_category').value = snap.child('category').val();
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

}