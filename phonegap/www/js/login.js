function login() {
	if ($("#name").val() == "") {
		alert("Please enter a username");
		return;
	}
	// sendLoginToServer();
	saveLoginData(1);
	fetchGpsLocation();
}

function sendLoginToServer() {
	$.ajax({
		type : "POST",
		url : "http://travelmateserver-21360.onmodulus.net/api/guests",
		data : {
			name : $("#name").val(),
			gender : $("#gender_male").prop("checked")
		},
		dataType : "json",
		cache : false,
		success : function(data) {
			if (data.message == "guest exists.") {
				alert("Username already exists.");
			} else if (data.message == "guest created!") {
				saveLoginData(data.id);
				fetchGpsLocation();
			} else {
				alert("Return message unknown: " + data.message);
			}
		},
		error : function(data, status) {
			alert("The login did not work, please try again later.");
		}
	});
}

function saveLoginData(loginId) {
	window.localStorage.setItem("loginname", $("#name").val());
	window.localStorage.setItem("loginid", loginId);
}

function fetchGpsLocation() {
	alert("Fetching GPS location...");
	navigator.geolocation.getCurrentPosition(setLocation, onError);
}

var setLocation = function(position) {
	window.location.href = "index.html";
	// sendLocationToServer();
};

function onError(error) {
	alert("Error code: " + error.code + "message: " + error.message);
}

function sendLocationToServer() {
	$.ajax({
		type : "PUT",
		url : "http://travelmateserver-21360.onmodulus.net/api/guests/"
				+ window.localStorage.getItem("loginid"),
		data : {
			longitude : position.coords.longitude,
			latitude : position.coords.latitude
		},
		dataType : "json",
		cache : false,
		success : function(data) {
			if (data.message == "Guest updated!") {
				window.location.href = "index.html";
			} else {
				alert("Fetched failed: " + data.message);
			}
		},
		error : function(data, status) {
			alert("Fetching the location failed.");
		}
	});
}