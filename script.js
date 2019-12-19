// save place to local storage and append to the table in the card.
var pastSearches = [];
var apiData;
function renderButtons() {
    $("#pastLocations").empty();

    // Looping through the array of movies
    for (var i = 0; i < pastSearches.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("pastSearches");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", pastSearches[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(pastSearches[i]);
        // Adding the button to the HTML
        $("#pastLocations").append(a);
    }
}

$("#searchButton").on("click", function (event) {
    event.preventDefault();

    var APIKey = localStorage.getItem("APIKey");

    var userSearchLocation = $("#search-input").val().trim();
    pastSearches.push(userSearchLocation);

    console.log(userSearchLocation);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearchLocation + "&units=imperial&appid=" + APIKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        apiData = response;
        // Create CODE HERE to Log the queryURL
        console.log(queryURL);
        // Create CODE HERE to log the resulting object
        console.log(response);

        $("#current").html(`<h1>${response.name}</h1>
            <div><h4>Temperature: ${response.main.temp}ºF</h4></div>
            <h4>Humidity: ${response.main.humidity}%</h4>
            <h4>Wind: ${response.wind.speed}mph</h4>
            <h4>UV Index: ${response.main.visibility}</h4>`)
            

        // convert to farenheit
        // var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        //     $(".tempF").text("Temperature (Kelvin) " + tempF);
    });

    // save search to local storage
    // append search to table
});
renderButtons();


//  icon url = "http://openweathermap.org/img/wn/" + weathericonid ( whaever ive decided to call that ) + "@2x.png"

// do an ajax call to get five day forecast of date, icon, temp in farenheit and humidity

// /* <span><img id="weather-icon" src="https://openweathermap.org/img/wn/02d@2x.png"></span> */

// to only get one piece of data per day:
// if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {