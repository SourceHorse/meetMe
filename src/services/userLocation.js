function getUserLocation() {
    navigator.geolocation 
    ? navigator.geolocation.getCurrentPosition(showPosition)
    : console.log("Unable to locate user.");
}