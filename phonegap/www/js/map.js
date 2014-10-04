var map;

var blueDot = {
	url : 'images/blue_dot.png',
	size : new google.maps.Size(20, 20),
	origin : new google.maps.Point(0, 0),
	anchor : new google.maps.Point(10, 10)
};

var greenDot = {
	url : 'images/green_dot.png',
	size : new google.maps.Size(20, 20),
	origin : new google.maps.Point(0, 0),
	anchor : new google.maps.Point(10, 10)
};

$(document).ready(function() {
	var pos = $("#map-canvas").position();
	$("#map-canvas").height($(window).height() - pos.top);
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
});

var onSuccess = function(position) {
	var myPos = new google.maps.LatLng(position.coords.latitude,
			position.coords.longitude);
	var mapOptions = {
		zoom : 16,
		center : myPos
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	createMarker(myPos.lat(), myPos.lng(), blueDot, window.localStorage
			.getItem("loginname"));
	getOtherMarkers(myPos);
};

function createMarker(lat, lng, dot, name) {
	var marker = new google.maps.Marker({
		position : new google.maps.LatLng(lat, lng),
		map : map,
		icon : dot,
		title : name
	});
	var infowindow = new google.maps.InfoWindow({
		content : marker.title
	});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});
	infowindow.open(map, marker);
}

function getOtherMarkers(myPos) {
	// getOtherMarksersFromServer();
	getOtherMarkersRandom(myPos);
}

function getOtherMarkersRandom(myPos) {
	var names = [ "John", "Marry", "Thomas", "Michael", "Sarah" ];
	for (var i = 0; i < 5; i++) {
		var lat = Math.floor((Math.random() * 2) + 1) / 1000
				* (Math.floor(Math.random() * 2) == 1 ? 1 : -1);
		var lng = Math.floor((Math.random() * 2) + 1) / 1000
				* (Math.floor(Math.random() * 2) == 1 ? 1 : -1);
		createMarker(myPos.lat() + lat, myPos.lng() + lng, greenDot, names[i]);
	}
}

function getOtherMarkersFromServer() {
	$.ajax({
		type : "GET",
		url : "http://travelmateserver-21360.onmodulus.net/api/guests",
		cache : false,
		success : function(data) {
			$.each(data, function(key, value) {
				createMarker(value.latitude, value.longitude, greenDot,
						value.name);
			});
		},
		error : function(data, status) {
			alert("Fetching others failed.");
		}
	});
}

function onError(error) {
	alert("Error code: " + error.code + "message: " + error.message);
}