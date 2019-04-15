require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const Axios = require('axios');
const FS = require('fs');
const moment = require('moment')
var command = process.argv[2];
var datas = process.argv[3];
moment().format()

function movie() {

    datas = datas || "Mr. Nobody";

    let url = "http://www.omdbapi.com/?apikey=trilogy&t=" + datas;
    Axios.get(url)
        .then(function (res) {
            console.log("Movie Title : " + res.data.Title)
            console.log("Year of the Movie : " + res.data.Year)
            console.log("Movie imbdRating : " + res.data.imdbRating)
            console.log("Movie Country : " + res.data.Country)
            console.log("Movie Languages : " + res.data.Language)
            console.log("Movie Plot : " + res.data.Plot)
            console.log("Movie Actors : " + res.data.Actors)
            for (var i = 0; i < res.data.Ratings.length; i++) {
                if (res.data.Ratings[i].Source === "Rotten Tomatoes") {
                    console.log("Movie Rotten Tomatoes Rating : " + res.data.Ratings[i].Value)

                }
            }
        })
}

function concert() {

    datas = datas || ("drake")
    var bandUrl = "https://rest.bandsintown.com/artists/" + datas + "/events?app_id=codingbootcamp";
    Axios.get(bandUrl)
        .then(function (resp) {
            console.log("Nmae of the Venue : " + resp.data[1].venue.name)
            console.log("City of the Venue : " + resp.data[1].venue.city)
            var time = resp.data[1].datetime

            console.log("Time of the Venue : " + moment(time).format("MM/DD/YYYY"))

        })
}

function song() {
    console.log("running spotity this song ", data);
    data = data || "the sign";
    spotify
        .search({ type: 'track', query: data })
        .then(function (response) {
            var song = response.tracks.items[0];
            console.log("Artist Name : " + song.artists[0].name);
            console.log("Song Name : " + song.name);
            console.log("Song Url : " + song.preview_url);
            console.log("Song Album : " + song.album.name)
        })
        .catch(function (err) {
            console.log(err);
        });
}

function doWhat() {
    FS.readFile("random.txt", "utf8", function (err, song) {
        song = song.split(",");
        console.log(song);

        command = song[0];
        data = song[1];
        liri();

    })
}


function liri() {
    switch (command) {
        case "concert-this":
            concert();
            break;
        case "spotify-this-song":
            song();
            break;
        case "movie-this":
            movie()
            break;
        case "do-what-it-says":
            doWhat()
            break;
        default:
            console.log("Liri does not understand your command")
            break;
    }
}

liri();


