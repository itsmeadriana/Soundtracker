let movieId = "";
let searchTermSpace = "";
let searchTermWeird = "";
let artistLyrics = "";
let titleLyrics = "";
let videoURL = "";
let songLyrics = "";
const lyricUrl = 'https://api.happi.dev/v1/music';
let videoLink ="";

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
            "x-rapidapi-key": "d464b868e4msh9d0771b8ee731f1p177ca2jsn0b2e85610ca3",
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
                    .addClass("image")
            
            //checks for movie picture and assigns source
            if(movieInfo.hasOwnProperty('image')) {
                movieImgEl.attr("src", movieInfo.image.url);
            } else {movieImgEl.attr("src","")}

            //creat movie details
            $("#movie-details").html(
                "<li>" + movieInfo.title + "</li>" +
                "<li>" + movieInfo.year + "</li>" 
                // + "<li> Type: " + movieInfo.titleType + "</li>"
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
            "x-rapidapi-key": "d464b868e4msh9d0771b8ee731f1p177ca2jsn0b2e85610ca3",
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
            .addClass("track-image")

            var trackInfo = $("<ul>")
             
            //check to see if api info is presented clearly with "products" with artist and song
            //"if" handles the not clearly presented info and else handles the clear format
            if(!movieSoundtrack.soundtracks[0].products){
                console.log("No picture for track 1 was found/placeholders here.");
                trackImg.attr("src","")
                trackInfo.html(
                    "'" + movieSoundtrack.soundtracks[0].name +"'" +
                     movieSoundtrack.soundtracks[0].comment 
                );
                
                //set search term for links
                artistLyrics = movieSoundtrack.soundtracks[0].comment;
                titleLyrics = movieSoundtrack.soundtracks[0].name;
                searchTermSpace = movieSoundtrack.soundtracks[0].name + " " + movieSoundtrack.soundtracks[0].comment;

            } else{

                trackImg.attr("src",movieSoundtrack.soundtracks[0].products[0].image.url);

                trackInfo.html(
                    "'"+ movieSoundtrack.soundtracks[0].name +"'" +
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
            searchTermWeirdest = searchTermSpace.replaceAll(" ", "%20");

            //Lyric API fetch function
            fetch(lyricUrl+"?q=" +searchTermWeirdest+ "&limit=&apikey=de0e3806cGECAUNtppSHBG9PYGKL91ld3MmJH1I12jCQfzU3zIILKL5s&lyrics=1")
                    .then(response => {
                        return response.json();
                    })
                    .then(responseJSON => {
                        if(!responseJSON.hasOwnProperty('result')){
                            songLyrics = "No Lyrics Available.";
                        }
                        else if(!responseJSON.result[0]) {
                            songLyrics ="No Lyrics Available.";
                        }
                        else{
                        let trackId = responseJSON.result[0].id_track;
                        let albumId = responseJSON.result[0].id_album;
                        let artistId = responseJSON.result[0].id_artist;
              
                                fetch(`${lyricUrl}/artists/${artistId}/albums/${albumId}/tracks/${trackId}/lyrics?apikey=de0e3806cGECAUNtppSHBG9PYGKL91ld3MmJH1I12jCQfzU3zIILKL5s`)
                                    .then(response => {
                                        return response.json();
                                    })
                                    .then(responseJSON => {
                    
                                        songLyrics = responseJSON.result.lyrics;
                                    })
                        }
                                    //fetch video API
                                    fetch("https://youtube-search-results.p.rapidapi.com/youtube-search/?q=" + searchTermWeird, {
                                    "method": "GET",
                                    "headers": {
                                        "x-rapidapi-key": "6212ed38a3msh126850d76d11ec4p12e1e8jsnb9c6aae314dc",
                                        "x-rapidapi-host": "youtube-search-results.p.rapidapi.com"
                                    }
                                    })
                                    .then(response => {
                                    return response.json()
                                    .then( responseJSON => {
                                        if(!responseJSON.items) {
                                            videoURL = "";
                                            videoLink = "<img src = 'https://via.placeholder.com/280x157?text=Sorry,no+video+found.'>";
                                        }
                                        else{
                                        videoURL = responseJSON.items[0].url;
                                        videoURL = videoURL.replace("watch?v=","embed/");
                                        videoLink = "<iframe width='280' height='157' src='"+ videoURL + "' frameborder='0' allowfullscreen></iframe>";
                                        }
                                        
                                            //fill out links for track 1
                                            $("#LinksFor1").html(
                                                "<li>" + 
                                                videoLink + 
                                                "</li>" +
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
    .catch(err => {
        console.error(err);
    });
};



// This is what happens when you click on the Track title
$("#track-list").on("click",".clickText", function(event){
    console.log("something")
    event.preventDefault();
    let currentTextDiv = $(this);

    //fetch soundtrack info
    fetch("https://imdb8.p.rapidapi.com/title/get-sound-tracks?tconst=" +movieId, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "d464b868e4msh9d0771b8ee731f1p177ca2jsn0b2e85610ca3",
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
            console.log(searchTermSpace);
            searchTermWeird = searchTermSpace.replaceAll(" ", "%2B");
            searchTermWeirdest = searchTermSpace.replaceAll(" ", "%20");

            //Lyric API fetch function
            fetch(lyricUrl+"?q=" +searchTermWeirdest+ "&limit=&apikey=de0e3806cGECAUNtppSHBG9PYGKL91ld3MmJH1I12jCQfzU3zIILKL5s&lyrics=1")
            .then(response => {
                return response.json();
            })
            .then(responseJSON => { 
                if(!responseJSON.hasOwnProperty('result')){
                    songLyrics = "No Lyrics Available."
                }
                else if(!responseJSON.result[0]) {
                    songLyrics ="No Lyrics Available.";                
                }
                else{
                let trackId = responseJSON.result[0].id_track;
                let albumId = responseJSON.result[0].id_album;
                let artistId = responseJSON.result[0].id_artist;
      
                        fetch(`${lyricUrl}/artists/${artistId}/albums/${albumId}/tracks/${trackId}/lyrics?apikey=de0e3806cGECAUNtppSHBG9PYGKL91ld3MmJH1I12jCQfzU3zIILKL5s`)
                            .then(response => {
                                return response.json();
                            })
                            .then(responseJSON => {
            
                                songLyrics = responseJSON.result.lyrics;
                            })
                }
                                    //fetch video API
                                    fetch("https://youtube-search-results.p.rapidapi.com/youtube-search/?q=" + searchTermWeird, {
                                    "method": "GET",
                                    "headers": {
                                        "x-rapidapi-key": "6212ed38a3msh126850d76d11ec4p12e1e8jsnb9c6aae314dc",
                                        "x-rapidapi-host": "youtube-search-results.p.rapidapi.com"
                                    }
                                    })
                                    .then(response => {
                                    return response.json()
                                    .then( responseJSON => {
                                        if(!responseJSON.items) {
                                            videoURL = "";
                                            videoLink = "<img src = 'https://via.placeholder.com/280x157?text=Sorry,no+video+found.'>";
                                        }
                                        else{
                                        videoURL = responseJSON.items[0].url;
                                        videoURL = videoURL.replace("watch?v=","embed/");
                                        videoLink = "<iframe width='280' height='157' src='"+ videoURL + "' frameborder='0' allowfullscreen></iframe>"
                                        }
                                        
                                        //fill the links out
                                       ;
                                        currentTextDiv
                                        .next(".clickLink")
                                        .html(
                                            "<li>" + 
                                            videoLink +
                                            "</li>" +
                                            "<li>" + songLyrics + "</li>"
                                        );
                                        $("#video-lyrics").append(videoLink, songLyrics);
                                    })
                                    })
                                    .catch(err => {
                                        console.error(err);
                                    });
                                    
                            
                                                    
                        })   
                  
        })
    })
});


//calls function to retrieve ID and then starts page generator
getMovieId();
