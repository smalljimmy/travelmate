function logout() {
    
    $.ajax({
        type: "DELETE",
        url: "http://travelmateserver-21360.onmodulus.net/api/guests/" + window.localStorage.getItem("loginid"),
        dataType: "json",
        cache: false,
        success: function(data) {
            if (data.message == "Successfully deleted") {
                window.localStorage.clear();
                window.location.href = "login.html";
            } else {
                alert("Could not logout: " + data.message);
            }
        },
        error: function(data, status) {
            alert("The logout did not work, please try again later."); 
        }
    });
}