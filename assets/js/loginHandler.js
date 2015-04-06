var loggedIn = 1;


var lb = document.getElementById("loginButton"); // lb = Login Button
var la = document.getElementById("loginAjax"); // la = Login Ajax tag
lb.addEventListener('click', function () {
    var page = document.getElementById("login_page");// input field's parent for a more accurate element search
    var usernameField = page.querySelector("[name=login_username]");
    var passwordField = page.querySelector("[name=login_password]");
    var u = usernameField.value, // u = username
        p = passwordField.value; // p = password
    la.params = '{"username": "' + u + '", "password": "' + p + '"}';  // what to send: Username & Password
    la.go();
    la.addEventListener('core-complete', function () {
        console.log(la.response);

    }); // Ajax request is complete

});


/*
 document.addEventListener('readystatechange',function(){
 if(document.readyState === "complete"){

 // The document has finished loading


 if(loggedIn === 1){
 var cs = document.getElementById("pageList"); // CS = Current Script

 removeElement(cs); // Remove the old script tag
 var bl = document.getElementsByClassName("navItem"); // bl = Button list in the navigation bar

 for(var i=bl.length;i--;){
 removeElement(bl[i]);
 }
 }  // End of logged in check
 }
 });
 */


function removeElement(e) {
    e.parentNode.removeChild(e);
}