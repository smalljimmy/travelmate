var map;

var blueDot = {
    url: 'images/blue_dot.png',
    size: new google.maps.Size(20, 20),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(10, 10)
};

var greenDot = {
    url: 'images/green_dot.png',
    size: new google.maps.Size(20, 20),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(10, 10)
};

$(document).ready(function () {
    var pos = $("#map-canvas").position();
    $("#map-canvas").height($(window).height() -pos.top);
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
});

var onSuccess = function(position) {
    var myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    var mapOptions = {
        zoom: 16,
        center: myPos
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    setCurrentPositionMarker(myPos);
    GetOtherMarkers(myPos);
};

function setCurrentPositionMarker(myPos) {
    var marker = new google.maps.Marker({
        position: myPos,
        map: map,
        icon: blueDot,
    });    
}

function GetOtherMarkers(myPos) {
    for (var i = 0; i < 5; i++) {
        var lat =  Math.floor((Math.random() * 2) + 1) / 1000 * (Math.floor(Math.random()*2) == 1 ? 1 : -1); 
        var lng =   Math.floor((Math.random() * 2) + 1) / 1000 * (Math.floor(Math.random()*2) == 1 ? 1 : -1); 
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(myPos.lat() + lat, myPos.lng() + lng),
            map: map,
            icon: greenDot,
        }); 
    }
}

function onError(error) {
    alert("Error code: " + error.code + "message: " + error.message);
}