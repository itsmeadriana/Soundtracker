// [insert soundtrack api fetch thingy here]
let movieId = "";

//retrieve IMDb code from url query string
var getMovieId = function () {
  var queryString = document.location.search;
  var tempSplit = queryString.split("=")[1];
  movieId = tempSplit.split("/")[2];
  generatePageElements(movieId);
};

generatePageElements = function(movieId) {
    // after we have IMDb code, use the title/get-details code to retrieve information for that specific movie
    fetch("https://imdb8.p.rapidapi.com/title/get-details?tconst=" +movieId, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "6b2242570bmshb1c48ae9a0c8442p1e0090jsnd66a0420891d",
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
            "x-rapidapi-key": "6b2242570bmshb1c48ae9a0c8442p1e0090jsnd66a0420891d",
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
                .addClass("clickText")
                .text(trackNumber + ". " +  movieSoundtrack.soundtracks[i].name);

                var trackLinks = $("<ul>")
                .addClass("clickLink")
                .attr("id", "LinksFor"+trackNumber)
                .html("");

                $("#track-list").append(trackDiv,trackLinks);

            }

            //fetch the information for lyrics and videos
            //fill out links for track 1
            $("#LinksFor1").html(
            "<li>" + "Insert Lyrics Link Here" + "</li>" +
            "<li>" + "Insert Video Link Here" + "</li>"
            )
   
            //Generate track 1 image and info and append to div
            var trackImg = $("<img>")
            .width(171)
            .height(228);

            var trackInfo = $("<ul>")
            .html(
                "<li>"+ "track 1 info" +"</li>" +
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

// This is what happens when you click on the Track title
$("#track-list").on("click",".clickText", function(event){
    event.preventDefault();
    let currentTextDiv = $(this);

    //fetch soundtrack info
    fetch("https://imdb8.p.rapidapi.com/title/get-sound-tracks?tconst=" +movieId, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "6b2242570bmshb1c48ae9a0c8442p1e0090jsnd66a0420891d",
            "x-rapidapi-host": "imdb8.p.rapidapi.com"
        }
    })
    .then(response => {
        response.json()
        .then(function(movieSoundtrack){
            

            $(this).css("color","purple");
            //first fix the links
            //empty out all the link divs
            for (i = 0; i<movieSoundtrack.soundtracks.length; i++) {
                let tempDiv = "#LinksFor" + (i+1);
                $(tempDiv).html("");
            }
            
            //fill the links out
            currentTextDiv
            .next(".clickLink")
            .html(
                "<li>" + "Insert Lyrics Link Here" + "</li>" +
                "<li>" + "Insert Video Link Here" + "</li>"
            );

            //second part fixes the track information
            //empty out track information
            $("#track-details").html("");
            //fill in track information of clicked
            var trackImg = $("<img>")
                    .width(171)
                    .height(228);

            var trackInfo = $("<ul>")
            .html(
                "<li>"+ "track info" +"</li>" +
                "<li>"+ "more trackededed info" +"</li>" +
                "<li>"+ "even more track info" +"</li>"
            );
            
            $("#track-details").append(trackImg,trackInfo);

        })
    })
});


//calls function to retrieve ID and then starts page generator
getMovieId();
© 2021 GitHub, Inc.
