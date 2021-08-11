let movieId = "";
let searchTermSpace = "";
let searchTermWeird = "";
let artistLyrics = "";
let titleLyrics = "";
let videoURL = "";
const lyricUrl = 'https://api.happi.dev/v1/music';

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
            "x-rapidapi-key": "b07fe43eb6msh25d2ec5ffee67dbp1a8cccjsn93e33dff7b9f",
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
            "x-rapidapi-key": "b07fe43eb6msh25d2ec5ffee67dbp1a8cccjsn93e33dff7b9f",
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
                artistLyrics = movieSoundtrack.soundtracks[0].comment;
                titleLyrics = movieSoundtrack.soundtracks[0].name;
                searchTermSpace = movieSoundtrack.soundtracks[0].name + " " + movieSoundtrack.soundtracks[0].comment;

            } else{

                trackImg.attr("src",movieSoundtrack.soundtracks[0].products[0].image.url);

                trackInfo.html(
                    "<li> Song Title: "+ movieSoundtrack.soundtracks[0].name +"</li>" +
                    "<li> Artist: "+ movieSoundtrack.soundtracks[0].products[0].artist +"</li>" 
                );

                //set searchTerm for links
                artistLyrics = movieSoundtrack.soundtracks[0].products[0].artist;
                titleLyrics = movieSoundtrack.soundtracks[0].name;
                searchTermSpace = movieSoundtrack.soundtracks[0].name + " " + movieSoundtrack.soundtracks[0].products[0].artist;
            }    
            
            $("#track-details").append(trackImg,trackInfo);
            
            //fetch commands for lyrics and video
            searchTermWeird = searchTermSpace.replaceAll(" ", "%2B");

            //Lyric API fetch function
            fetch(`${lyricUrl}?q=${titleLyrics}&limit=&apikey=de0e3806cGECAUNtppSHBG9PYGKL91ld3MmJH1I12jCQfzU3zIILKL5s&type=${artistLyrics}&lyrics=1`)
                    .then(response => {
                        return response.json();
                    })
                    .then(responseJSON => {
                        const trackId = responseJSON.result[0].id_track;
                        const albumId = responseJSON.result[0].id_album;
                        const artistId = responseJSON.result[0].id_artist;
                        
                        fetch(`${lyricUrl}/artists/${artistId}/albums/${albumId}/tracks/${trackId}/lyrics?apikey=de0e3806cGECAUNtppSHBG9PYGKL91ld3MmJH1I12jCQfzU3zIILKL5s`)
                            .then(response => {
                                return response.json();
                            })
                            .then(responseJSON => {
                                const songLyrics = responseJSON.result.lyrics;
                                    //fetch video API
                                    fetch("https://youtube-search-results.p.rapidapi.com/youtube-search/?q=" + searchTermWeird, {
                                    "method": "GET",
                                    "headers": {
                                        "x-rapidapi-key": "1882bd1ab5msh32b4cf8fc04add7p10f56bjsn503b97610e23",
                                        "x-rapidapi-host": "youtube-search-results.p.rapidapi.com"
                                    }
                                    })
                                    .then(response => {
                                    return response.json()
                                    .then( responseJSON => {
                                        videoURL = responseJSON.items[0].url;
                                        videoURL = videoURL.replace("watch?v=","embed/")
                                        console.log(videoURL);
                                            //fill out links for track 1
                                            $("#LinksFor1").html(
                                                "<li>" + 
                                                "<iframe width='280' height='157' src='"+ videoURL + "' frameborder='0' allowfullscreen></iframe>" 
                                                + "</li>" +
                                                "<li>" + songLyrics + "</li>"
                                                )
                                    })
                                    })
                                    .catch(err => {
                                        console.error(err);
                                    });
                                    
                                })
                                                    
                            })   
                    })
    })
    .catch(err => {
        console.error(err);
    });
};



// This is what happens when you click on the Track title
$("#track-list").on("click",".clickText", function(event){
    event.preventDefault();
    let currentTextDiv = $(this);

    //fetch soundtrack info
    fetch("https://imdb8.p.rapidapi.com/title/get-sound-tracks?tconst=" +movieId, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "b07fe43eb6msh25d2ec5ffee67dbp1a8cccjsn93e33dff7b9f",
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
                
                artistLyrics = movieSoundtrack.soundtracks[divIndex].comment;
                titleLyrics = movieSoundtrack.soundtracks[divIndex].name;
                searchTermSpace = movieSoundtrack.soundtracks[divIndex].name + " " + movieSoundtrack.soundtracks[divIndex].comment;

            } else{

                trackImg.attr("src",movieSoundtrack.soundtracks[divIndex].products[0].image.url);

                trackInfo.html(
                    "<li> Song Title: "+ movieSoundtrack.soundtracks[divIndex].name +"</li>" +
                    "<li> Artist: "+ movieSoundtrack.soundtracks[divIndex].products[0].artist +"</li>"        
                );
                
                artistLyrics = movieSoundtrack.soundtracks[divIndex].products[0].artist;
                titleLyrics = movieSoundtrack.soundtracks[divIndex].name;
                searchTermSpace = movieSoundtrack.soundtracks[divIndex].name + " " + movieSoundtrack.soundtracks[divIndex].products[0].artist;
            }    

            $("#track-details").append(trackImg,trackInfo);  

            //fetch commands for lyrics and video
            searchTermWeird = searchTermSpace.replaceAll(" ", "%2B");

            //Lyric API fetch function
            fetch(`${lyricUrl}?q=${titleLyrics}&limit=&apikey=de0e3806cGECAUNtppSHBG9PYGKL91ld3MmJH1I12jCQfzU3zIILKL5s&type=${artistLyrics}&lyrics=1`)
                    .then(response => {
                        return response.json();
                    })
                    .then(responseJSON => {
                        const trackId = responseJSON.result[0].id_track;
                        const albumId = responseJSON.result[0].id_album;
                        const artistId = responseJSON.result[0].id_artist;
                        
                        fetch(`${lyricUrl}/artists/${artistId}/albums/${albumId}/tracks/${trackId}/lyrics?apikey=de0e3806cGECAUNtppSHBG9PYGKL91ld3MmJH1I12jCQfzU3zIILKL5s`)
                            .then(response => {
                                return response.json();
                            })
                            .then(responseJSON => {
                                const songLyrics = responseJSON.result.lyrics;
                                    //fetch video API
                                    fetch("https://youtube-search-results.p.rapidapi.com/youtube-search/?q=" + searchTermWeird, {
                                    "method": "GET",
                                    "headers": {
                                        "x-rapidapi-key": "1882bd1ab5msh32b4cf8fc04add7p10f56bjsn503b97610e23",
                                        "x-rapidapi-host": "youtube-search-results.p.rapidapi.com"
                                    }
                                    })
                                    .then(response => {
                                    return response.json()
                                    .then( responseJSON => {
                                        videoURL = responseJSON.items[0].url;
                                        videoURL = videoURL.replace("watch?v=","embed/")
                                        console.log(videoURL);
                                        //fill the links out
                                        currentTextDiv
                                        .next(".clickLink")
                                        .html(
                                            "<li>" + 
                                            "<iframe width='280' height='157' src='"+ videoURL + "' frameborder='0' allowfullscreen></iframe>" 
                                            + "</li>" +
                                            "<li>" + songLyrics + "</li>"
                                        );
                                    })
                                    })
                                    .catch(err => {
                                        console.error(err);
                                    });
                                    
                            })
                                                    
                    })   
                  
        })
    })
});


//calls function to retrieve ID and then starts page generator
getMovieId();