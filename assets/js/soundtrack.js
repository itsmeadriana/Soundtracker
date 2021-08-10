let movieId = "";
let searchTermSpace = "";
let searchTermPlus = "";

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
            console.log(movieSoundtrack);
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

            
            //fetch commands for lyrics and video
            searchTermPlus = searchTermSpace.replaceAll(" ", +);

            //fill out links for track 1
            $("#LinksFor1").html(
            "<li>" + "Insert Lyrics Link Here" + "</li>" +
            "<li>" + "Insert Video Link Here" + "</li>"
            )
   
            //Generate track 1 image and info and append to div
            var trackImg = $("<img>")
            .width(171)
            .height(228)

            var trackInfo = $("<ul>")
             
            //check to see if api info is presented clearly with "products" with artist and song
            //"if" handles the not clearly presented info and else handles the clear format
            if(!movieSoundtrack.soundtracks[0].products){
                console.log("No picture for track 1 was found/placeholders here.");
                trackImg.attr("src","")
                trackInfo.html(
                    "<li>Song Title: "+ movieSoundtrack.soundtracks[0].name +"</li>" +
                    "<li>"+ movieSoundtrack.soundtracks[0].comment +"</li>" 
                );
                //set search term for links
                searchTermSpace = movieSoundtrack.soundtracks[0].name + " " + movieSoundtrack.soundtracks[0].comment;

            } else{

                trackImg.attr("src",movieSoundtrack.soundtracks[0].products[0].image.url);

                trackInfo.html(
                    "<li> Song Title: "+ movieSoundtrack.soundtracks[0].name +"</li>" +
                    "<li> Artist: "+ movieSoundtrack.soundtracks[0].products[0].artist +"</li>" 
                );

                //set searchTerm for links
                searchTermSpace = movieSoundtrack.soundtracks[0].name + " " + movieSoundtrack.soundtracks[0].products[0].artist
            }    
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
            

            //first fix the links
            //empty out all the link divs
            for (i = 0; i<movieSoundtrack.soundtracks.length; i++) {
                let tempDiv = "#LinksFor" + (i+1);
                $(tempDiv).html("");
            }
            
            //fetch commands for lyrics and video
            searchTermPlus = searchTermSpace.replaceAll(" ", +);

            //fill the links out
            currentTextDiv
            .next(".clickLink")
            .html(
                "<li>" + "Insert Lyrics Link Here" + "</li>" +
                "<li>" + "Insert Video Link Here" + "</li>"
            );

            let divIndex = parseInt(currentTextDiv.next(".clickLink").attr("id").replace("LinksFor","")-1);


            //second part fixes the track information
            //empty out track information
            $("#track-details").html("");

            //fill in track information of clicked
            var trackImg = $("<img>")
            .width(171)
            .height(228)

            var trackInfo = $("<ul>")
           
            //check to see if api info is presented clearly with "products" with artist and song
            //"if" handles the not clearly presented info and else handles the clear format
            if(!movieSoundtrack.soundtracks[divIndex].products){
                console.log("No picture for current track was found/placeholders here.");
                trackImg.attr("src","")
                trackInfo.html(
                    "<li>Song Title: "+ movieSoundtrack.soundtracks[divIndex].name +"</li>" +
                    "<li>"+ movieSoundtrack.soundtracks[divIndex].comment +"</li>"
                );

                searchTermSpace = movieSoundtrack.soundtracks[divIndex].name + " " + movieSoundtrack.soundtracks[divIndex].comment;

            } else{

                trackImg.attr("src",movieSoundtrack.soundtracks[divIndex].products[0].image.url);

                trackInfo.html(
                    "<li> Song Title: "+ movieSoundtrack.soundtracks[divIndex].name +"</li>" +
                    "<li> Artist: "+ movieSoundtrack.soundtracks[divIndex].products[0].artist +"</li>"        
                );

                searchTermSpace = movieSoundtrack.soundtracks[divIndex].name + " " + movieSoundtrack.soundtracks[divIndex].products[0].artist;
            }    
                $("#track-details").append(trackImg,trackInfo);        

        })
    })
});


//calls function to retrieve ID and then starts page generator
getMovieId();