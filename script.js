var pastSearches = [];
var apiData;
var uvqueryURL;
var latVar;
var lonVar;
var x;
var previousSearches = JSON.parse(localStorage.getItem("previous")) || [];
var APIKey = "92ce17e1323ad237fdf4a085b335d5bf";
var fivedayqueryURL;
var glResponse;

renderButtons();

function renderButtons() {
    
    $("#pastLocations").empty();
        // previousSearches = JSON.parse(localStorage.getItem("previous"));
        console.log("previous searches ", previousSearches);
       
        if (previousSearches){
            for (var i = 0; i < previousSearches.length; i++) {           
                var a = $("<button>");
                a.addClass("pastSearches btn btn-info mr-1 mt-1");
                a.attr("data-name", previousSearches[i]);
                a.text(previousSearches[i]);
                $("#pastLocations").append(a);
            }
        }
}

// cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1); 

$("#searchButton").on("click", function (event) {
    setCurrentInfo($("#search-input").val().trim());
    setFiveDayForecast();
    renderButtons();
    $("#data").empty();
    $("#search-input").empty();
});

// $(document).on("click", ".pastSearches", function (event) {
//     setCurrentInfo();
// })

$(document).on("click", ".pastSearches", function () {
    setCurrentInfo($(this).text());
    // setFiveDayForecast();
});

function setCurrentInfo(city) {
    event.preventDefault();

    // var APIKey = localStorage.getItem("APIKey");

    var userSearchLocation = city;
        previousSearches = JSON.parse(localStorage.getItem("previous")) || [];
        
        if (!previousSearches.includes(userSearchLocation)) {
            previousSearches.push(userSearchLocation);
            localStorage.setItem("previous", JSON.stringify(previousSearches))
        }

    console.log(userSearchLocation);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearchLocation + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        apiData = response;
        console.log(queryURL);
        console.log(response);

        $("#current").html(`<h1>${response.name}</h1>`)
        let m = moment().format("MM" + " /DD" + " /YY");
        var x = document.getElementById("date").textContent = (m)
        $("#data").html(`<img id="forecastIcon" src="http://openweathermap.org/img/w/${response.weather[0].icon}.png">
            <div><h4>Temperature: ${response.main.temp}ºF</h4></div>
            <h4>Humidity: ${response.main.humidity}%</h4>
            <h4>Wind: ${response.wind.speed}mph</h4>`)

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" +
            response.coord.lat +
            "&lon=" + response.coord.lon + "&appid=" + APIKey;

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            var uvValue = response.value;
            var uvDisplay = $("#uvIndex");
            uvDisplay.text("UV Index: " + uvValue);
            uvValue = parseFloat(uvValue);
            if (uvValue < 3) {
                $("#uvIndex").attr("class", "p-1 bg-success text-white");
            }
            else if (uvValue < 8) {
                $("#uvIndex").attr("class", "p-1 bg-warning text-dark");
            }
            else if (uvValue >= 8) {
                $("#uvIndex").attr("class", "p-1 bg-danger text-white");
            }
        })

        // convert to farenheit
        // var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        //     $(".tempF").text("Temperature (Kelvin) " + tempF);
    });
}

function setPastInfo() {
    event.preventDefault();

    // var APIKey = localStorage.getItem("APIKey");

    var buttonText = $('.pastSearches').text();
    console.log(userSearchLocation);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + buttonText + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        apiData = response;
        console.log(queryURL);
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

function setFiveDayForecast() {
    // to only get one piece of data per day
    //    var APIKey = localStorage.getItem("APIKey");

    var userSearchLocation = $("#search-input").val().trim();
    fivedayqueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSearchLocation + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: fivedayqueryURL,
        method: "GET"
    }).then(function (response) {
        apiData = response;
        //console.log(fivedayqueryURL);
        console.log(response);
        glResponse = response
        $('.card-deck').empty()
        for (let i = 0; i < response.list.length; i++) {
            var res = response.list[i];
            if (res.dt_txt.indexOf("15:00:00") !== -1) {
                var card = `<div class="card col-sm-6 col-md-4 col-lg-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${res.dt_txt.slice(5,5)}</h5>
                    <img id="forecastIcon" src="http://openweathermap.org/img/w/${res.weather[0].icon}.png">
                    <h5 id="forecastData"></h5> 
                    <div><h5>Temp: ${res.main.temp}ºF</h5></div>
                    <h5>Humidity: ${res.main.humidity}%<h5>
                    </div>
                </div>` 
                $('.card-deck').append(card)
            }
        }
    })
}

// 
// $('#forecastIcon').append(res.weather.id)