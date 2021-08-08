// createMovieList = function(movieTitle) {
//     //fetch movie info using the IMDb title/find
//     fetch("https://imdb8.p.rapidapi.com/title/find?q=" + movieTitle, {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "1882bd1ab5msh32b4cf8fc04add7p10f56bjsn503b97610e23",
// 		"x-rapidapi-host": "imdb8.p.rapidapi.com"
// 	}
//     })
//     .then(response => {
//         response.json()
//         .then(function(titleData){

//             //For loop to cycle through the movie results
//             for (var i=0; i < titleData.results.length; i++){

//                 //checks to see if it has a name property, which indicates NOT a movie, so do nothing
//                 if(titleData.results[i].hasOwnProperty('name')){

//                 } else {
//                     // Create the elements for the verified movie
//                     let movieImgEl = $("<img>")
//                     .width(225)
//                     .height(300)
//                     .addClass("")
                    
//                     //checks for picture content and assigns source value
//                     if(titleData.results[i].hasOwnProperty('image')){
//                         movieImgEl.attr("src",titleData.results[i].image.url)
//                     } else {
//                         movieImgEl.attr("src","")
//                     }
                    
//                     let movieDetails = $("<ul>")
//                     .html( 
//                     "<li> Movie Title: " + titleData.results[i].title + "</li>" +
//                     "<li> Release Date: " + titleData.results[i].year + "</li>")
                    
//                     let movieContainerEl = $("<div>")
//                     .addClass("")
//                     .append(movieImgEl,movieDetails)
//                     .attr("id",titleData.results[i].id);

//                     $("#movie-list").append(movieContainerEl);
//                 }
//             }
//         })
    
//     })
//     .catch(err => {
//         console.error(err);
//     });
    
// }

// $("#submit-button").on("click", function(){
//     let currentMovieTitle = $("#movie-title-input").val().trim();
//     createMovieList(currentMovieTitle);
//     $("#movie-title-input").val("");
// });

createMovieList = function(movieTitle) {
    //fetch movie info using the IMDb title/find
    fetch("https://imdb8.p.rapidapi.com/title/find?q=" + movieTitle, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "1882bd1ab5msh32b4cf8fc04add7p10f56bjsn503b97610e23",
		"x-rapidapi-host": "imdb8.p.rapidapi.com"
	}
    })
    .then(response => {
        response.json()
        .then(function(titleData){

            //For loop to cycle through the movie results
            for (var i=0; i < titleData.results.length; i++){

                //checks to see if it has a name property, which indicates NOT a movie, so do nothing
                if(titleData.results[i].hasOwnProperty('name')){

                } else {

                var resultsCard = document.createElement("div")
                    resultsCard.className = "card moviePosterCard"

                var cardImage = document.createElement("div")
                    cardImage.className = "card-image"

                var cardFigure = document.createElement("figure")
                    cardFigure.className = "image"

                var resultsImage = document.createElement("img")
                    resultsImage.setAttribute("alt","placeholder image");

                    if(titleData.results[i].hasOwnProperty('image')){
                        resultsImage.setAttribute("src",titleData.results[i].image.url)
                    } else {
                        resultsImage.setAttribute("src","")
                    }

                cardFigure.appendChild(resultsImage)
                cardImage.appendChild(cardFigure)
                resultsCard.appendChild(cardImage)
                console.log(resultsCard); 

                     
                    let movieDetails = $("<ul>")
                    .html( 
                    "<li> Movie Title: " + titleData.results[i].title + "</li>" +
                    "<li> Release Date: " + titleData.results[i].year + "</li>")
                    $("#movie-list").append(resultsCard, movieDetails)
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
    createMovieList(currentMovieTitle);
    $("#movie-title-input").val("");
});

createMovieList("Shrek");
