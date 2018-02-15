require("dotevn").config();

var importKeys = require('./keys.js');
var request = require("request");
var fs = require('file-system');

console.log(importKeys);
console.log("dotenv");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

const result= dotenv.config()
	
	if (result.error) {
		throw result.error
	}
console.log(result.parsed);

var command = process.argv[2];

switch(command) {
	case("my-tweets"):
		myTweets();
		console.log("mytweets");
		break;

	case("spotify-this-song"):
		spotifyThisSong();
		break;

	case("movie-this"):
		movieThis();
		break;

	case("do-what-it-says"):
		doWhatItSays();
		break;
}

function myTweets () {
	client.get('favorites/list', function(error, tweets, response) {
		if(error) throw error;
		console.log(tweets);
		console.log(response);
	})
} //END MY TWEETS FUNCTIOn

function spotifyThisSong () {

	var nodeArgs = process.argv;
	var songName = "";

	if (songName == "") {
			songname == "The Sign";
		}

	for (var i = 3; i < nodeArgs.length; i++) {
		if (i > 3 && i < nodeArgs.length) {
			songName+= "+" + nodeArgs[i];
		} else {
			songName += nodeArgs[i];
		}
	}

	spotify.search({type: 'track', query: songName }, function (err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}

	console.log("Artist(s)" + data.Artist);
	console.log("Artist(s)" + data.Title);
	console.log("Artist(s)" + data.URL);
	console.log("Artist(s)" + data.Album);

	}) 

} //END SPOTIFY THIS SONG FUNCTION

function movieThis () {

	var nodeArgs = process.argv;

	var movieName = "";

	if (songName == "") {
			songname == "The Sign";
		}

	for (var i = 3; i < nodeArgs.length; i++) {
		if (i > 3 && i < nodeArgs.length) {

			movieName+= "+" + nodeArgs[i];

		} else {

			movieName += nodeArgs[i];
		}
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year Released: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings.value);
    console.log("Made in: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }

  if (movieName == "") {
  	movieName == "Mr. Nobody";
  }

});


} //END MOVIE THIS FUNCTION

function doWhatItSays () {

	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
			return console.log(error);
		}
	})

	// put text read from random.text to songName variable 
	//run spotifyThisSong function

} //END DO WHAT IT SAYS FUNCTION