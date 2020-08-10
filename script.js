
$(document).ready(function () {
    $("#search").on("click", function () {
        var searchedCity = $(".search-input").val();
        console.log(searchedCity)
        //clear input value
        $("#search").val("");
        ///call the function for our first API call
        dailyWeatherSearch(searchedCity);
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=5d42ef869834f474f1536b24a805c605&units=imperial",
            method: "GET"
        }).then(function (response) {
            $(".current-temp").text(response.main.temp);
            
            //humidity
            $(".current-humidity").text(response.main.humidity);
            //wind speed
            $(".current-windspeed").text(response.wind.speed);
            //weather icon
            var img = $("<img>").attr("src", "http://openweathermap.org//img/w/" + response.weather[0].icon + ".png");
            $("weather-image").append(img);
            function getUxIndex(lat,lon){
                $.ajax({
                    url: "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=5d42ef869834f474f1536b24a805c605&units=imperial",
                    method: "GET"
                }).then(function (response) {
                    console.log(response.value)
                    $(".current-uv-index").text(response.value);
                })
                
            }
            getUxIndex(response.coord.lat, response.coord.lon);
            // five day forcast
            getfivedayforcast(response.coord.lat, response.coord.lon);
        });
    });
    //are going to make buttons that contain the value searched by the user
});
//function for 5 day forcast
function getfivedayforcast(lat,lon) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon=" + lon+ "&appid=5d42ef869834f474f1536b24a805c605&units=imperial",
        method: "GET"
    }).then(function (response) {
        console.log(response.daily[0])
        var windspeed = response.daily[0].wind_speed;
        var humidity = response.daily[0].humidity;
        var uvi = response.daily[0].uvi;
        $(".getfivedayforcast").text(windspeed,humidity,uvi);
        for(let i =0; i< 5; i++){
        var daily = response.daily[i]
        var day = $("<div>").text(daily.humidity +" "+ daily.temp.day +" "+ daily.wind_speed)
        console.log(daily)
        $(".weather-forecast-area").append(day)
        }
        
    })
}
function dailyWeatherSearch(searchedCity){
console.log("dailyWeatherSearch")
}

