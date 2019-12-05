require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

// concert-this Command
function concert(artist){
    var bQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    // retrieve URL
    axios.get(bQueryUrl).then(
    function (response){
        console.log("Artist: " + artist + 
        " | " + "Venue: " + response.data[0].venue.name + 
        " ( " + "Location: " + response.data[0].venue.country.region.city + ", " + response.data[0].venue.country.region + " | " + response.data[0].venue.country + " )" +
        )
    }
    )
}