//retrieve IMDb code from url query string
var getMovieId = function () {
  var queryString = document.location.search;
  var tempSplit = queryString.split("=")[1];
  var movieId = tempSplit.split("/")[2];
  generatePageElements(movieId);

};

generatePageElements = function(movieId) {
    // after we have IMDb code, use the title/get-details code to retrieve information for that specific movie
    fetch("https://imdb8.p.rapidapi.com/title/get-details?tconst=" +movieId, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "1882bd1ab5msh32b4cf8fc04add7p10f56bjsn503b97610e23",
            "x-rapidapi-host": "imdb8.p.rapidapi.com"
        }
    })
    .then(response => {
        response.json()
        .then(function(movieInfo) {

            //create movie image
            let movieImgEl = $("#movie-image")
                    .width(225)
                    .height(300)
                    .addClass("")
            
            //checks for movie picture and assigns source
            if(movieInfo.hasOwnProperty('image')) {
                movieImgEl.attr("src", movieInfo.image.url);
            } else {movieImgEl.attr("src","")}

            //creat movie details
            $("#movie-details").html(
                "<li> Title: " + movieInfo.title + "</li>" +
                "<li> Release Date: " + movieInfo.year + "</li>" +
                "<li> Type: " + movieInfo.titleType + "</li>"
            )

        });
    })
    .catch(err => {
        console.error(err);
    });


    // fetch the soundtrack information
    fetch("https://imdb8.p.rapidapi.com/title/get-sound-tracks?tconst=" +movieId, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "1882bd1ab5msh32b4cf8fc04add7p10f56bjsn503b97610e23",
            "x-rapidapi-host": "imdb8.p.rapidapi.com"
        }
    })
    .then(response => {
        response.json()
        .then(function(movieSoundtrack){

            //loop function to cycle through soundtrack list and attach
            for(var i=0; i<movieSoundtrack.soundtracks.length; i++) {
                var trackNumber = i + 1;

                var trackDiv = $("<div>")
                .text(trackNumber + ". " +  movieSoundtrack.soundtracks[i].name);

                var trackLinks = $("<ul>")
                .attr("id", "LinksFor"+trackNumber);

                $("#track-list").append(trackDiv,trackLinks);

            }

            //fill out links and info for first track and attach
            $("#LinksFor1").html(
            "<li>" + "Insert Lyrics Link Here" + "</li>" +
            "<li>" + "Insert Video Link Here" + "</li>"
            )
        
            var trackImg = $("<img>")
            .width(171)
            .height(228);

            var trackInfo = $("<ul>")
            .html(
                "<li>"+ "track info" +"</li>" +
                "<li>"+ "more track info" +"</li>" +
                "<li>"+ "even more track info" +"</li>"
            );
            
            $("#track-details").append(trackImg,trackInfo);


        })
    })
    .catch(err => {
        console.error(err);
    });
}
getMovieId();