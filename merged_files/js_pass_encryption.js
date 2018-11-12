function encrypt(){
    var value = document.getElementById('value').value;
    var hash = CryptoJS.SHA1(value);
    document.getElementById('see_value').innerHTML=hash;
}