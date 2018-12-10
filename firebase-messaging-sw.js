importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': '76801264020'
})
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload){
    const title = 'Hello World';
    const options = {
        body: payload.data.status
    }
    return self.registration.showNotification(title,options);
});