# LIRI

![Demo](https://user-images.githubusercontent.com/30732917/38844198-a1818504-41af-11e8-95bd-c444a7307f9e.gif)

## How it Works

A node application similar to iPhone's SIRI, only LIRI is a Language Interpretation and Recognition Interface (instead of speech). LIRI takes in commands and gives back data. 

Commands:

	- node liri.js my-tweets
		-- This will show the last 20 tweets for node.js

	- node liri.js spotify-this-song '<song name here>'
		-- This will show the Artist, song name, preview link, and album the song is from
		-- no user song input = search for 'The Sign'

	- node liri.js movie-this '<movie name here>'
		-- This will return the following movie info:
			- Title
			- Year the movie came out 
			- IMDB Rating of the movie
			- Rotten Tomatoes Rating of the movie
			- Country movie was produced
			- Language of movie
			- Plot
			- Actors
		-- no user input for movie = search for 'Back to the Future'

	- node liri.js do-what-it-says 
		-- using fs Node package, LIRI will take text inside of random.txt and then use it to call onf of LIRI's commands

## Technologies/Software
	- Javascript/jQuery
	- Node.js
	- NPM packages:
		- dotenv
		- request
		- fs
		- node-env-file
		- node-spotify-api
		- twitter

## Author(s)
	- Kate Birmingham