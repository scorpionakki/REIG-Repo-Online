function appendmessage(){
    var message = document.getElementById('get_message').value;

    var table = document.getElementById('appendmessagetable');
    var row1 = table.insertRow(table.rows.length);
    var row2 = table.insertRow(table.rows.length);
    var cell1_row1 = row1.insertCell(0);
    var cell1_row2 = row2.insertCell(0);

    cell1_row1.innerHTML = "Testing_Reig";
    cell1_row2.innerHTML = message;
    //window.alert(message);
}