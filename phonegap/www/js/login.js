function login() {
    
    if ($("#name").val() == "") {
        alert("Please enter a username")
        return;
    }
    
    $.ajax({
        type: "POST",
        url: "http://travelmateserver-21360.onmodulus.net/api/guests",
        data: { name: $("#name").val(), gender: $("#gender_male").prop("checked") },
        dataType: "json",
        cache: false,
        success: function(data) {
            if (data.message == "guest exists.") {
                alert("Username already exists.");
            } else if (data.message == "guest created!") {
                window.localStorage.setItem("loginname", $("#name").val());
                window.localStorage.setItem("loginid", data.id);
                alert("Please wait, as we update your GPS location...");
                navigator.geolocation.getCurrentPosition(setLocation, onError);
            } else {
                alert("Return message unknown: " + data.message);
            }
        },
        error: function(data, status) {
            alert("The login did not work, please try again later."); 
        }
    });
}

var setLocation = function(position) {
    $.ajax({
        type: "PUT",
        url: "http://travelmateserver-21360.onmodulus.net/api/guests/" + window.localStorage.getItem("loginid"),
        data: { longitude: position.coords.longitude, latitude: position.coords.latitude },
        dataType: "json",
        cache: false,
        success: function(data) {
            if (data.message == "Guest updated!") {
                window.location.href = "index.html";
            } else {
                alert("Setting the location did not work: " + data.message);
            }
        },
        error: function(data, status) {
            alert("Setting the location did not work."); 
        }
    });
}

function onError(error) {
    alert("Error code: " + error.code + "message: " + error.message);
}