require("dotenv").config();

var keys = require('./keys');
console.log('keys');

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');


var spotify = new Spotify(keys.spotify);
var client =  new Twitter(keys.twitter);

var nodeArgs = process.argv;

var request = require("request");

var movieName = "";

var fs = require("fs");

var method = process.argv[2];
var type = process.argv[3];
var query = process.argv[4];

function callMethod(method, query) {

  switch(method){
    case("spotify-this-song"):
      spotifySong(type,query)
break;
    case("my-tweets"):
    twittermeth()
break;
    case("movie-this"):
    omdpa(type)
break;
    case("do-what-it-says"):
    readthis()
break;
  }

}


function spotifySong(type,query) {
  spotify.search({type, query}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  console.log(data[type+"s"].items);
  });
}

function twittermeth() {
  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      // console.log(tweets);
      for ( var i = 0; i <tweets.length;i++){
        console.log(tweets[i].text);
      }
    }
  });

}

function omdpa(movieName) {

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  console.log(queryUrl);
  request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("Ttile of the Movie: " + JSON.parse(body).Title);
    console.log("Rated: " + JSON.parse(body).Rated);
    console.log("Ratings: " + JSON.parse(body).Ratings);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);

    }
    else {
  request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy")
  }
  });


}

function readthis(){

  fs.readFile("random.txt", "utf8", function(error, data) {
  if (error) {
      return console.log(error);
    }
    console.log(data);
  var dataArr = data.split(",");
    console.log(dataArr);

callMethod(dataArr[0],dataArr[1])
  });
}


callMethod(method, query);
