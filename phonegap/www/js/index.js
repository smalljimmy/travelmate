$(document).ready(function () {
    var loginid = window.localStorage.getItem("loginid");
    if (loginid == null) {
        window.location.href = "login.html";
    } else {
        var loginname = window.localStorage.getItem("loginname");
        $("#username").html(loginname);    
    }
});