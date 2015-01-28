/*
var MOB = MOB || {};

MOB.title = "Wuthu";

console.log(MOB.title);
*/

////////////////////////////////////////////////////////////////////////////////
//
$( "#lookup" ).on( "click", function( event ) {
    var address = $( "#address" ).val();
    console.log("hello?" + address);

    if(!address.trim()) {
        return;
    }

    // Call Google and look up the address.
    $.ajax({
        url:  "//maps.googleapis.com/maps/api/geocode/json",
        data: {
            sensor: false,
            address: address
        },
        success: function( data ) {
            $( "#results" ).empty();
            $( "#weather" ).hide();
            $( data.results ).each ( function (idx, result) {
                $( "#results" ).append(
                    $( "<li class=result>" )
                        .data( "lat", result.geometry.location.lat )
                        .data( "lng", result.geometry.location.lng )
                        .text( result.formatted_address)
                        .on( "click", function() { showWeather ( $(this) ) })
                );
            });
        }
    });

});


////////////////////////////////////////////////////////////////////////////////
// Fetch, format, and display the weather data.
//
function showWeather( obj ) {
    //$( "#weather" ).hide();
    $( ".result" ).removeClass( "result-hilite" );
    obj.addClass( "result-hilite" );
    getWeather( obj.data("lat"), obj.data("lng") );
};


////////////////////////////////////////////////////////////////////////////////
// Ajax the weather data from forecase.io with latitude and longitude.
//
function getWeather( lat, lng ) {
    $.ajax({
        dataType: "jsonp",
        url:      "https://api.forecast.io/forecast/47a948d362300db9b8856629bd4700ac/"
                    + encodeURIComponent( lat + "," + lng ),
        success:  function( data ) {
            console.log( data );
            displayWeather( data );
        }
    });
};


////////////////////////////////////////////////////////////////////////////////
// Format, and display the weather data.
//
function displayWeather( weather ) {
    $( "#weather" ).show();
    $( "#weather" ).html(
        $( "<div class=temperature id=weather-temp>" ).text( weather.currently.temperature.toFixed() + "°F" )
    );
    $( "#weather" ).append(
        $( "<div class=details id=weather-details>" )
    );
    $( "#weather-details" ).append(
        $( "<p class=weather-summary>" ).text( weather.currently.summary )
    );
    $( "#weather-details" ).append(
        $( "<ul class=weather-items id=weather-list>" )
    );
    $( "#weather-list" ).append(
        $( "<li class=weather-item>" ).text( weather.hourly.summary )
    );
    $( "#weather-list" ).append(
        $( "<li class=weather-item>" ).text( weather.daily.summary )
    );
    $( "#weather-list" ).append(
        $( "<li class=weather-item>" ).text( "Wind speed: " + weather.currently.windSpeed )
    );
    $( "#weather-list" ).append(
        $( "<li class=weather-item>" ).text( "Humidity: " + weather.currently.humidity )
    );
};


//$("#addresses").on("click"), ".individual-address", function () {}
//    var $this = $(this);      // handy trick to get jquery collection - the actual click address
