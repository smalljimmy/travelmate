$(document).ready(function() {
	var userLeader = window.localStorage.getItem("usertype_leader");
	if (userLeader == "true") {
		showPOITab();
	}
});

function showPOITab() {
	$("#tabs .tab").addClass("tab_leader");
	$("#poi_tab").show();
}