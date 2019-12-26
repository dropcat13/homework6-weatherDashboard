// save place to local storage and append to the table in the card.
var pastSearches = [];
var apiData;
var uvqueryURL; 
var latVar;
var lonVar;
var x;

var storedCities = localStorage.getItem("weatherCities"); 
console.log(storedCities); 
if (storedCities === null) { 
    weatherCities = ["Raleigh"];      
}
else { 
    weatherCities = JSON.parse(storedCities); 
    lastCityIndex = localStorage.getItem("lastCityIndex"); 
}

function renderButtons() {
    $("#pastLocations").empty();

    for (var i = 0; i < pastSearches.length; i++) {
        var a = $("<button>");
        a.addClass("pastSearches");
        a.attr("data-name", pastSearches[i]);
        a.text(pastSearches[i]);
        $("#pastLocations").append(a);
    }
}

// cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1); 

$("#searchButton").on("click", function (event) {
    setCurrentInfo();
    renderButtons();
    $("#data").empty();
    $("#search-input").empty();
});

$(".pastSearches").on("click", function (event){ 
    setPastInfo();
})

$(document).on("click", ".pastSearches", function () {
    setPastInfo($(this).text());
});

function setCurrentInfo() {
    event.preventDefault();

    var APIKey = localStorage.getItem("APIKey");
    var MapAPIKey = "AIzaSyBhZv5uJpsqNdH9Eq0MGHrvYAPeVYSpHcQ";

    var userSearchLocation = $("#search-input").val().trim();
    pastSearches.push(userSearchLocation);

    console.log(userSearchLocation);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearchLocation + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        apiData = response;
        console.log(queryURL);
        console.log(response);

        var iconSrc = 'https://openweathermap.org/img/wn/10d@2x.png';
        // 'https://openweathermap.org/img/wn/' + response.weather[0].iconCode + "@2x.png"; 

        $("#current").html(`<h1>${response.name}</h1>`)
        let m = moment().format("MM" + " /DD" + " /YY");
        var x = document.getElementById("date").textContent = (m)
        $("#icon").html(iconSrc)
        $("#data").html(`<div><h4>Temperature: ${response.main.temp}ºF</h4></div>
            <h4>Humidity: ${response.main.humidity}%</h4>
            <h4>Wind: ${response.wind.speed}mph</h4>`)  
  
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + 
        response.coord.lat + 
        "&lon=" +  response.coord.lon + "&appid=" + APIKey;

        $.ajax({
            url: uvURL,
            method: "GET" 
        }).then(function (response) { 
            var uvValue = response.value;
            var uvDisplay = $("#uvIndex");  
            uvDisplay.text("UV Index: " + uvValue); 
            uvValue = parseFloat(uvValue); 
            if (uvValue < 3) {
                $("#uvIndex").attr("class","p-1 bg-success text-white"); 
            }
            else if (uvValue < 8) {
                    $("#uvIndex").attr("class","p-1 bg-warning text-dark"); 
                }
                else if (uvValue >= 8) { 
                    $("#uvIndex").attr("class","p-1 bg-danger text-white"); 
                }
        })
    
        // convert to farenheit
        // var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        //     $(".tempF").text("Temperature (Kelvin) " + tempF);
    });
}

function setPastInfo() {
    event.preventDefault();

    var APIKey = localStorage.getItem("APIKey");

    var buttonText = $('.pastSearches').text();
    console.log(userSearchLocation);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + buttonText + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        apiData = response;
        // Create CODE HERE to Log the queryURL
        console.log(queryURL);
        // Create CODE HERE to log the resulting object
        console.log(response);

        $("#current").html(`<h1>${response.name}</h1>`)
        let m = moment().format("MM" + " /DD" + " /YY");
        var x = document.getElementById("date").textContent = (m)
        $("#icon").html
        $("#data").append(`<div><h4>Temperature: ${response.main.temp}ºF</h4></div>
            <h4>Humidity: ${response.main.humidity}%</h4>
            <h4>Wind: ${response.wind.speed}mph</h4>
            <h4>UV Index: ${response.main.visibility}</h4>`)  
    
        // convert to farenheit
        // var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        //     $(".tempF").text("Temperature (Kelvin) " + tempF);
    });
}


// $("#city").on("change keyup", function() {
//     var city = $(this).val()
//     $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+encodeURIComponent(city), function(val) {
//       if(val.results.length) {
//         var location = val.results[0].geometry.location
//         $("#lat").val(location.lat)
//         $("#lon").val(location.lng)
//       }
//     })
//   })

// /* <span><img id="weather-icon" src="https://openweathermap.org/img/wn/02d@2x.png"></span> */

// to only get one piece of data per day:
// if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {