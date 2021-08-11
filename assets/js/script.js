createMovieList = function(movieTitle) {
    //fetch movie info using the IMDb title/find
    fetch("https://imdb8.p.rapidapi.com/title/find?q=" + movieTitle, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "b07fe43eb6msh25d2ec5ffee67dbp1a8cccjsn93e33dff7b9f",
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
                        .addClass("")
                        
                        //checks for picture content and assigns source value
                        if(titleData.results[i].hasOwnProperty('image')){
                            movieImgEl.attr("src",titleData.results[i].image.url);
                        } else {
                            movieImgEl.attr("src","");
                        }
                        
                        let movieDetails = $("<ul>")
                        .html( 
                        "<li> Title: " + titleData.results[i].title + "</li>" +
                        "<li> Release Date: " + titleData.results[i].year + "</li>" +
                        "<li> Type: " + titleData.results[i].titleType + "</li>"
                        )
                        
                        let linkToSoundtrack = $("<a>")
                        .attr("href","./soundtrack.html?movie=" + titleData.results[i].id)
                        .append(movieImgEl,movieDetails);

                        let movieContainerEl = $("<div>")
                        .addClass("")
                        .append(linkToSoundtrack)
                        .attr("id",titleData.results[i].id);

                        $("#movie-list").append(movieContainerEl);
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