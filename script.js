$(document).ready(function () {

    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        //recognizing the html element hierarchy
        var value = $(this).siblings("#searchterm").val();

        usersearch(value);
    })

    //figure out how to append 5 day forecast to cards and display icons


    function usersearch(searchterm) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?APPID=ab6a4f4bdd7038705bd566a2f9249b85";

        queryURL = queryURL + "&q=" + searchterm;

        //    + "&units=imperial"

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


        //add previous searches to unordered sidebar/list
        var $CityList = $("<ul>");
        $CityList.addClass("list-group");

        $("#previouscities").append($CityList);

        var cityName = city.name;
        var $CityListItem = $("<li class='list-group-item cityName'>");

        if (cityName && city.name) {
            console.log(city.name);
            $CityListItem.append(
                "<ul class='list-group list-group-flush'>" +
                "<strong> " +
                city.name +
                "</strong>" + "</ul>"
            );
        }

        // $CityListItem.append("<a href='" + city.web_url + "'>" + city.web_url + "</a>");
        // console.log(city.web_url);


        $cityList.append($CityListItem);
    }

    //save info from previously searched cities in local storage


});
