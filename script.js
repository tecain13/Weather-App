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
            var li = $("<li>")
            var button = $("<button>");
            button.text(city);
            button.attr("data-index", i);
            li.append(button)
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
            getforecast(searchterm);
        }
        )
    };

    function getforecast(searchterm) {
        var indivsearchURL = buildQueryURL();

        $.ajax({
            url: indivsearchURL,
            method: "GET"
        }).then(updatePage);

    };





    //fetch API data from user searchterm
    function buildQueryURL() {
        var searchterm = $("#searchterm").val().trim();
        console.log(searchterm);


        var APIkey = "ab6a4f4bdd7038705bd566a2f9249b85";
        var OpenWeather = "https://api.openweathermap.org/data/2.5/forecast?"
        var URL = OpenWeather + "q=" + searchterm + "&APPID=" + APIkey
        // url = url + "&units=imperial";
        console.log(URL);

        return URL;

    };

    //current weather day main section



    //five day weather forecast data tailored to each city
    function updatePage(OpenWeatherData) {
        console.log(OpenWeatherData);

        // var searchresult = OpenWeatherData.response.list[i];
        for (var i = 0; i < OpenWeatherData.list.length; i++) {

            var item = OpenWeatherData.list[i];
            var icon = item.weather[0].icon;
            var temp = item.main.temp_max;

            var humidity = item.main.humidity;

            var col = $("<div>").addClass("col-md-2")
            var card = $("<div>").addClass("card")
            var body = $("<div>").addClass("card-body p-2")
            var title = $("<h5>").addClass("card-title").text(new Date(item.dt_txt).toLocaleDateString())
            var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + icon + ".png")

            var p1 = $("<p>").addClass("card-text").text("temp:" + temp + "F")
            var p2 = $("<p>").addClass("card-text").text("humidity" + humidity + "%")

            col.append(card.append(body.append(title, img, p1, p2)));

            $("#forecastcards").append(col);

        }

    }




});


