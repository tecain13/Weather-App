function usersearch() {
    var searchterm = $(this).attr("searchterm");
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=ab6a4f4bdd7038705bd566a2f9249b85";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    }
    )
};
usersearch()


function buildQueryURL() {
    var searchterm = $("#searchterm").val().trim();
    console.log(searchterm);

    var APIkey = "ab6a4f4bdd7038705bd566a2f9249b85";
    var OpenWeather = "https://api.openweathermap.org/data/2.5/forecast?"
    var URL = OpenWeather + "q=" + searchterm + "&APPID=" + APIkey
    console.log(URL);

    return URL;

};


function updatePage(OpenWeatherData) {
    console.log(OpenWeatherData);

    var searchresult = OpenWeatherData.response.docs[i];

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


//figure out how to append 5 day forecast to cards and display icons


$("#run-search").on("click", function (event) {
    event.preventDefault();
    var indivsearchURL = buildQueryURL();

    $.ajax({
        url: indivsearchURL,
        method: "GET"
    }).then(updatePage);
});
