angular.module('myApp', []).controller('PoiEditorController', function($scope){
	var poisStorage = "pois";
	$scope.pois = getStoredPois();
	$scope.editorEnabled = false;
	$scope.addPoi = function() {
        if ($scope.poiName === "") {
            return false;
        }

        $scope.pois.push({
            name: $scope.poiName,
            latitude: $scope.poiLatitude,
            longitude: $scope.poiLongitude
        });

        $scope.poiName = '';
        $scope.poiLatitude = '';
		$scope.poiLongitude = '';
    }
	$scope.enableEditor = function() {
        $scope.editorEnabled = true;

        $scope.poiName = $scope.poi.name;
        $scope.poiLatitude = $scope.poi.latitude;
		$scope.poiLongitude = $scope.poi.longitude;
    }
	$scope.disableEditor = function() {
        $scope.editorEnabled = false;
    }
	$scope.save = function() {
        if ($scope.poiName === "") {
            return false;
        }

        $scope.poi.name = $scope.poiName;
        $scope.poi.latitude = $scope.poiLatitude;
		$scope.poi.longitude = $scope.poiLongitude;

        $scope.disableEditor();
		savePois($scope.pois);
    }

});


function savePois(pois) {
	window.localStorage.setItem(poisStorage, JSON
			.stringify(this.pois));
}

function getStoredPois() {
	var poiString = window.localStorage.getItem(poisStorage);
	if (poiString != null) {
		return JSON.parse(poiString);
	}
	
	//default 
	return [{
        name: "Standford Shopping Center",
        latitude: 37.4629307,
        longitude: -122.1748693},
    {
		name: "West Menlo Park",
        latitude: 37.4329499,
        longitude: -122.202576}];
}
