export function requestNotificationPermission(){

if(
"Notification" in window
){

Notification.requestPermission();

}

}



export function showNotification(title,message){


if(Notification.permission==="granted"){

new Notification(title,{

body:message

});

}


}