var map;

$(document).ready(function () {
    var pos = $("#map-canvas").position();
    $("#map-canvas").height($(window).height() -pos.top);
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
});

// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    
        var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


