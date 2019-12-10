require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var res = process.argv[3]

var spotify = new Spotify(keys.spotify);

// concert-this Function
function concertThis(artist) {
    var bQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    // retrieve URL
    axios.get(bQueryUrl).then(
        function (response) {
            console.log("Artist: " + artist +
                " | " + "Venue: " + response.data[0].venue.name +
                " ( " + "Location: " + response.data[0].venue.country.region.city + ", " + response.data[0].venue.country.region + " | " + response.data[0].venue.country + " )" +
                " | " + "Date: " + moment().format(response.data[0].datetime));
        })
}
// spotify-this-song Function
function spotifyThis(song) {
    if (song === '') {
        song = "The Sign";
    }
    spotify.search({ type: "Song: ", res: song }, function (err, data) {
        if (err) {
            return ("Oops something went wrong... " + err)
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name +
            " | " + "Song: " + data.tracks.items[0].name +
            " | " + "Preview: " + data.tracks.items[0].external_urls.spotify +
            " | " + "Album: " + data.tracks.items[0].album.name)
    })
}
// movie-this Function
function movieThis(movie) {
    if (!movie) {
        movie = "Mr. Nobody."
    }
    var mQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(bQueryUrl).then(
        function (response) {
            if (!movie) {
                movie = "Mr. Nobody."
            }
            console.log("Title: " + response.data[0].Title +
                " | " + "Year: " + response.data[0].Year +
                " | " + "Rated: " + response.data[0].Rated +
                " | " + "Rotten Tomato Score: " + response.data[0].Ratings[2].Value +
                " | " + "Country: " + response.data[0].Country +
                " | " + "Language: " + response.data[0].Language +
                " | " + "Plot: " + response.data[0].Plot +
                " | " + "Actors: " + response.data[0].Actors)
        }
    )
}
// TO DO: do-what-it-says, Test
// switch statment to take in a three functions
switch (process.argv[2]) {
    case "spotify-this-song":
        spotifyThis(res);
        break;
    case "concert-this":
        concertThis(res);
        break;
    case "movie-this":
        movieThis(res);
        break;
// fs read. retrieve parse
default:
    fs.readFile("random.txt", "utf8", function(error, data){
        var data = data.split(",");
        var songDef = data[1];
        
    })
}