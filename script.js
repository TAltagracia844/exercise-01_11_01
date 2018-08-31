/*  Exercise 01_11_01

    Whole Spectrum Energy Solutions
    Author: Tiffany Altagracia
    Date:   8.27.18

    Filename: script.js
*/

"use strict";

// global variables
var selectedCity = "Tucson, AZ";
var weatherReport = null; // sets 
// http request global variable
var httpRequest = false; //XHR Object
//Function to instantiate XHR object
function getRequestObject() {
    // Instaniate an XHR object
    try {
        httpRequest = new XMLHttpRequest;

    } catch (errorMessage) {
        document.querySelector("p.error").innerHTML = "Forecast not supported by your browser.";
        document.querySelector("p.error").style.display = "block";
        return false;
    }
    return httpRequest;
}
// Function is an event handler for onreadystatechange
//get the weather data if sucessful
function fillWeather() {
    // check the readyState for 4 - done
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        weatherReport = JSON.parse(httpRequest.responseText);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var dateValue = new Date(weatherReport.daily.data[0].time);
        var dayOfWeek = dateValue.getDay();
        var rows = document.querySelectorAll("section.week table tbody tr");
        document.querySelector("section.week table caption").innerHTML = selectedCity;
        document.querySelector("section.week table caption").style.display = "block";
        document.querySelector("section.week table").style.display = "inline-block";
    }
}
// getWeather called on load event for default city (Tucson)
// or button clicked to selected city
function getWeather(evt) {
    var latitude;
    var longitude;
    if (evt.type !== "load") {
        if (evt.target) {
            selectedCity = evt.target.innerHTML;
        } else if (evt.srcElement) {
            selectedCity = evt.srcElement.innerHTML;
        }
    }
    if (selectedCity === "Tucson, AZ") {
        latitude = 37.7577;
        longitude = -122.4376;
    } else if (selectedCity === "Chicago, IL") {
        latitude = 41.8337329;
        longitude = -87.7321555;
    } else if (selectedCity === "Montreal, QC") {
        latitude = 45.5601062;
        longitude = -73.7120832;
    }
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    // Protect against an open request
    httpRequest.abort();

    //Target request
    httpRequest.open("get", "solar.php?" + "lat=" + latitude + "&lng=" + longitude, true);
    httpRequest.send(null);
    // event listenr for onreadystatechange
    httpRequest.onreadystatechange = fillWeather;
}
// Retrieve location of cities form the page
var locations = document.querySelectorAll("section ul li");
// Add click event listeners to <li> (cities)
for (var i = 0; i < locations.length; i++) {
    if (locations[i].addEventListener) {
        locations[i].addEventListener("click", getWeather, false);
    } else if (locations[i].attachEvent) {
        locations[i].attachEvent("onclick", getWeather);
    }
}

// event listeners on load - call getWeather();
if (window.addEventListener) {
    window.addEventListener("load", getWeather, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", getWeather);
}