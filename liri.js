require("dotenv").config();

var keys = require('./keys.js');
var request = require("request");
var fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function myTweets () {
	var params = {screen_name: 'nodeJS'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(error) throw error;
		
		for (var i = 0; i < tweets.length; i++) {
			console.log(tweets[i].text + "\n\n");
		}

	})
}

function spotifyThisSong (songName) {

	if (songName == undefined) {
			songName = "The Sign";
		}

	var songName;

	var nodeArgs = process.argv;
	// get song name from user input
	for (var i = 3; i < nodeArgs.length; i++) {
		if (i > 3 && i < nodeArgs.length) {

			songName += " " + nodeArgs[i];
		} 
	}

	//search spotify API, display song info to user
	spotify.search(
		{type: "track",
		 query: songName,
		 limit: 1
		 }, 
		function (err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
		}

		songs = data.tracks.items;


		for (var i = 0;i < songs.length; i++) {

			console.log("Artist: " + songs[i].album.artists[0].name);
			console.log("Song: " + songs[i].name);
			console.log("Preview: " + songs[i].preview_url);
			console.log("Album: " + songs[i].album.name);
			console.log("--------------------------------")

		}

	})

} 

function movieThis (movieName) {

	var nodeArgs = process.argv;

	if (movieName === undefined) {
			movieName = "Back to the Future";
		}

	var movieName;

	//get movie name from user
	for (var i = 3; i < nodeArgs.length; i++) {
		if (i > 3 && i < nodeArgs.length) {

			movieName += "+" + nodeArgs[i];

		} else {

			movieName += nodeArgs[i];
		}
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

	//searches omdb API with queryUrl
	request(queryUrl, function(error, response, body) {

  		// If the request is successful (i.e. if the response status code is 200)
	  	if (!error && response.statusCode === 200) {
		  	//makes JSON readable
		  	var jsonData = JSON.parse(body);

		    // Parse the body of the site and recover data
		    console.log("Title: " + jsonData.Title);
		    console.log("Year Released: " + jsonData.Year);
		    console.log("IMDB Rating: " + jsonData.imdbRating);
		    console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
		    console.log("Made in: " + jsonData.Country);
		    console.log("Language: " + jsonData.Language);
		    console.log("Plot: " + jsonData.Plot);
		    console.log("Actors: " + jsonData.Actors);
	 	}

	});

}

function doWhatItSays () {
	//reads random.txt file
	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
			return console.log(error);
		}

		var dataArr = data.split(",");	
		//read user input for command/functiondata
		if (dataArr.length === 2) {
			pick(dataArr[0], dataArr[1]);
		//if user only puts in command
		} else if (dataArr.length === 1) {
			pick(dataArr[0]);
		}

	})

}

var pick = function(command, functionData) {
	switch(command) {
		case("my-tweets"):
			myTweets();
			break;

		case("spotify-this-song"):
			spotifyThisSong(functionData);
			break;

		case("movie-this"):
			movieThis(functionData);
			break;

		case("do-what-it-says"):
			doWhatItSays();
			break;
		default:
			console.log("LIRI doesn't know how to do that");
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
}

runThis(process.argv[2], process.argv[3]);