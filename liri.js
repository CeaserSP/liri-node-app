require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var res = process.argv[3];
// console.log("THis is an issue" +res)
var event = process.argv[2];
// console.log("THis is an issue" +event)
var spotify = new Spotify(keys.spotify);
// switch statment to take in a three functions
function doIt(event, res) {
    switch (event) {
        case "spotify-this-song":
            // if (res === undefined){

            // }
            spotifyThis(res);
            break;
        case "concert-this":
            concertThis(res);
            break;
        case "movie-this":
            movieThis(res);
            break;
        case "do-what-it-says":
            doThis();
            break;

        default:
            console.log("Invalid Command");
    }
}// fs read. retrieve parse
function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var data = data.split(",");
        var songDef = data[1];
        console.log(songDef);
        if (error) {
            return console.log(error)
        }
        spotifyThis(songDef);
    })
}
// concert-this Function
function concertThis(artist) {
    if (artist === '') {
        artist = "celine dion";
    }
    var bQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    // console.log(bQueryUrl);
    // retrieve URL
    axios.get(bQueryUrl).then(
        function (response) {
            console.log(artist);
            console.log("Artist: " + artist +
                " | " + "Venue: " + response.data[0].venue.name +
                " ( " + "Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + " | " + response.data[0].venue.country + " )" +
                " | " + "Date: " + moment().format(response.data[0].datetime));
        })
}
// spotify-this-song Function
function spotifyThis(song) {
    if (song === '') {
        song = "The Sign";
        // console.log(song);
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log("Oops something went wrong... " + err);
        }
        var song = data.tracks.items[0];
        console.log("Artist: " + song.artists[0].name +
            " | " + "Song: " + song.name +
            " | " + "Preview: " + song.external_urls.spotify +
            " | " + "Album: " + song.album.name)
    })
}
// movie-this Function
function movieThis(movie) {
    if (!movie) {
        movie = "Mr. Nobody."
    }
    // console.log(movie);
    var mQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    // console.log(mQueryUrl);
    axios.get(mQueryUrl).then(
        function (response) {
            if (!movie) {
                movie = "Mr. Nobody."
            }
            console.log("Title: " + response.data.Title +
                " | " + "Year: " + response.data.Year +
                " | " + "Rated: " + response.data.Rated +
                " | " + "Rotten Tomato Score: " + response.data.Ratings[2].Value +
                " | " + "Country: " + response.data.Country +
                " | " + "Language: " + response.data.Language +
                " | " + "Plot: " + response.data.Plot +
                " | " + "Actors: " + response.data.Actors)
            
        }
    )
}

doIt(event, res); 
