$(document).ready(function () {


    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        //recognizing the html element hierarchy
        var value = $(this).siblings("#searchterm").val();

        usersearch(value);
    })

    //add previous searches to unordered sidebar/list
    var CityList = $("#previous-city-list");
    var cities = []
    initialize();

    //save info from previously searched cities in local storage

    function initialize() {
        $("#previous-city-list").empty();
        var storedCities = JSON.parse(localStorage.getItem("cities"));

        if (storedCities !== null) {
            cities = storedCities;
        }

        previousSearches();
    }


    function previousSearches() {
        for (var i = 0; i < cities.length; i++) {

            var city = cities[i];
            var li = $("<li>").addClass("list-group-item list-group-item-action").text(city);
            $("#previous-city-list").append(li)
        }

    };



    $("#submitBtn").on("click", function (event) {
        event.preventDefault();

        var searchHistory = $("#searchterm").val().trim();
        console.log(searchHistory)
        cities.push(searchHistory)
        localStorage.setItem("cities", JSON.stringify(cities));

    });



    //Recover previous searcbes
    $(".history").on("click", "li", function (event) {
        usersearch($(this).text())
    })

    //ajax call for user search
    function usersearch(searchterm) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?APPID=ab6a4f4bdd7038705bd566a2f9249b85";

        queryURL = queryURL + "&q=" + searchterm

            + "&units=imperial";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log("humidity: " + response.main.humidity);
            currentWeather(response);
            getforecast(searchterm);
        }
        )


    };

    function getforecast(searchterm) {
        var indivsearchURL = buildQueryURL(searchterm);

        $.ajax({
            url: indivsearchURL,
            method: "GET"
        }).then(updatePage);

    };





    //fetch API data from user searchterm
    function buildQueryURL(searchterm) {
        // var searchterm = $("#searchterm").val().trim();
        console.log(searchterm);

        var APIkey = "ab6a4f4bdd7038705bd566a2f9249b85";
        var OpenWeather = "https://api.openweathermap.org/data/2.5/forecast?"
        var URL = OpenWeather + "q=" + searchterm + "&APPID=" + APIkey
        URL = URL + "&units=imperial";
        console.log(URL);

        return URL;

    };

    //current weather day main section
    function currentWeather(data) {
        console.log(data);

        var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        var icon = data.weather[0].icon;
        var temp = data.main.temp_max;
        var humidity = data.main.humidity;
        var windspeed = data.wind.speed;

        var col = $("<div>").addClass("col-md-2")
        var card = $("<div>").addClass("card")
        var body = $("<div>").addClass("card-body")

        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + icon + ".png")

        var p1 = $("<p>").addClass("card-text").text("Temperature: " + temp + "F")
        var p2 = $("<p>").addClass("card-text").text("Humidity: " + humidity + "%")
        var p3 = $("<p>").addClass("card-text").text("Windspeed: " + windspeed + "mph")

        title.append(img);
        body.append(title, p1, p2, p3)
        card.append(body);
        $("#currentcity").append(card);

    }



    //separate AJAX call for UVIndex
    function UVindex(lat, lon) {
        console.log(lat, lon);


        var APIkey = "ab6a4f4bdd7038705bd566a2f9249b85";
        var uvIndex;
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?" + "lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&APPID=" + APIkey

        buildCurrentWeatherCardHist();
        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {
            uvIndex = response.value;
            uvIndexDisplay = $("<p>").text("UV Index: " + uvIndexDisplay);
            $("#currentcity").append(uvIndexDisplay);
        })



    };



    //five day weather forecast data tailored to each city
    function updatePage(OpenWeatherData) {
        console.log(OpenWeatherData);
        $("#forecastcards").html("");
        // var searchresult = OpenWeatherData.response.list[i];
        for (var i = 0; i < OpenWeatherData.list.length; i++) {

            var item = OpenWeatherData.list[i];
            if (item.dt_txt.indexOf("15:00:00") >= 0) {
                var icon = item.weather[0].icon;
                var temp = item.main.temp_max;
                var humidity = item.main.humidity;

                var col = $("<div>").addClass("col-md-2")
                var card = $("<div>").addClass("card weather-card col-lg bg-info text-white mr-md-2 mb-3")
                var body = $("<div>").addClass("card-body p-2")
                var title = $("<h5>").addClass("card-title").text(new Date(item.dt_txt).toLocaleDateString())
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + icon + ".png")

                var p1 = $("<p>").addClass("card-text").text("Temperature: " + temp + "F")
                var p2 = $("<p>").addClass("card-text").text("Humidity: " + humidity + "%")

                col.append(card.append(body.append(title, img, p1, p2)));

                $("#forecastcards").append(col);
            }


        }

    }




});


