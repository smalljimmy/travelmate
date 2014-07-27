var map;

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
        
    var marker = new google.maps.Marker({
      position: myPos,
      map: map
    });    
};

function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}


