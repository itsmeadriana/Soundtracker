createMovieList = function(movieTitle) {
    //fetch movie info using the IMDb title/find
    fetch("https://imdb8.p.rapidapi.com/title/find?q=" + movieTitle, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "d464b868e4msh9d0771b8ee731f1p177ca2jsn0b2e85610ca3",
		"x-rapidapi-host": "imdb8.p.rapidapi.com"
	}
    })
    .then(response => {
        response.json()
        .then(function(titleData){

            //Typing gibberish or nothing will return error modal
            if(!titleData.results) {
                console.log("modal error here");
            } else{
                //For loop to cycle through the movie results
                for (var i=0; i < titleData.results.length; i++){

                    //checks to see if it has a name property, which indicates NOT a movie, so do nothing
                    if(titleData.results[i].hasOwnProperty('name')){

                    } else {
                        // Create the elements for the verified movie
                        let movieImgEl = $("<img>")
                        .width(225)
                        .height(300)
                        .addClass("image is-centered")
                       
                        
                        //checks for picture content and assigns source value
                        if(titleData.results[i].hasOwnProperty('image')){
                            movieImgEl.attr("src",titleData.results[i].image.url);
                        } else {
                            movieImgEl.attr("src","");
                        }
                        
                        let movieDetails = $("<ul>")
                        .html( 
                        titleData.results[i].title + "<p>" +
                        titleData.results[i].year
                        // + "<li> Type: " + titleData.results[i].titleType + "</li>"
                        )
                        .addClass("title is-6")

                        

                        let cardImage = $("<div>")
                        .width(225)
                        .addClass("imagewrapper")
                        .append(movieImgEl);

                        let cardContent = $("<div>")
                        .width(225)
                     
                        .addClass("card-content")
                        .append(movieDetails);
                                     
                        let resultsCard = $("<div>")
                        .addClass("card-wrapper")
                        .append(cardImage, cardContent);

                        let linkToSoundtrack = $("<a>")
                        .addClass("link")
                        .attr("href","./soundtrack.html?movie=" + titleData.results[i].id)
                        .append(resultsCard);

                        let movieContainerEl = $("<div>")
                        .addClass("card")
                        .append(linkToSoundtrack)
                        .attr("id",titleData.results[i].id);

                        $(".return-results").append(movieContainerEl);
                    }    
                }
            }
        })
    
    })
    .catch(err => {
        console.error(err);
    });
    
}

$("#submit-button").on("click", function(){
    let currentMovieTitle = $("#movie-title-input").val().trim();    
    $("#movie-list").html("");
    createMovieList(currentMovieTitle);
    $("#movie-title-input").val("");  
    
});

// createMovieList("moana");