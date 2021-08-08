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
		"x-rapidapi-key": "6b2242570bmshb1c48ae9a0c8442p1e0090jsnd66a0420891d",
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
                
                var cardWrapper = document.createElement("div")
                    cardWrapper.className = "card-wrapper"

                // creates div for search results
                var resultsCard = document.createElement("div")
                    resultsCard.className = "moviePosterCard card"
                    resultsCard.setAttribute("class","moviePosterCard card")
                    
                // creates div for card-image
                var cardImage = document.createElement("div")
                    cardImage.className = "card-image"
                    cardImage.setAttribute("class", "card-image")
                    
                
                // creates figure element for image
                var cardFigure = document.createElement("figure")
                    // cardFigure.className = "image"
                    cardFigure.setAttribute("class","image")
                            
                // creates img element for incoming image
                var resultsImage = document.createElement("img")
                    resultsImage.setAttribute("alt","placeholder image");
                
                // 
                var movieDetailsEl = document.createElement("div")
                    movieDetailsEl.className = "movieDetailsCard card";

                var movieDetailsCard = document.createElement("div")
                    movieDetailsCard.className = "card-content"

                var movieDetailsContent = document.createElement("div")
                    movieDetailsContent.className = "content";

                if(titleData.results[i].hasOwnProperty('image')){
                    resultsImage.setAttribute("src",titleData.results[i].image.url)
                } else {
                    resultsImage.setAttribute("src","")
                }
            
                cardFigure.appendChild(resultsImage)
                cardImage.appendChild(cardFigure)
                resultsCard.appendChild(cardImage)

                movieDetailsCard.appendChild(movieDetailsContent)
                movieDetailsEl.appendChild(movieDetailsCard);
                cardWrapper.append(movieDetailsEl)

                
                console.log(cardWrapper)

                let movieDetails = $("<ul>")
                .html( 
                "<li> Movie Title: " + titleData.results[i].title + "</li>" +
                "<li> Release Date: " + titleData.results[i].year + "</li>")
                 
                // $("#details-card").append(movieDetails)
                // movieDetails.i = ("<div class='content'")

                cardWrapper.append(resultsCard)
                cardWrapper.append(movieDetails)
                
                $("#movie-list").append(cardWrapper)
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
    console.log(currentMovieTitle);
    createMovieList(currentMovieTitle);
    $("#movie-title-input").val("");
}

);

// createMovieList("Rocky");
