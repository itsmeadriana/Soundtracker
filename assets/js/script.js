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

createMovieList = function (movieTitle) {
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
                .then(function (titleData) {
                    console.log("searching")
                    //For loop to cycle through the movie results
                    for (var i = 0; i < titleData.results.length; i++) {
                        //checks to see if it has a name property, which indicates NOT a movie, so do nothing
                        console.log(titleData.results[i])

                        if (titleData.results[i].hasOwnProperty('name')) {

                        } else {


                            console.log("building html")
                            var returnResults = document.createElement("section")
                            returnResults.className = "return-results"

                            var cardWrapper = document.createElement("div")
                            cardWrapper.className = "card-wrapper notification padding"

                            var resultsCard = document.createElement("div")
                            resultsCard.className = "card"
                            resultsCard.setAttribute("id", "results-card")

                            var cardImage = document.createElement("div")
                            cardImage.className = "card-image"

                            var figure = document.createElement("figure")
                            figure.className = "image is-2by3"

                            var actualImage = document.createElement("img")
                            actualImage.setAttribute("src", "")

                            var noImage = document.createElement("div")
                            noImage.className = "notification missing-movie-poster-placeholder"

                            var imageNotAvailable = false

                            if (titleData.results[i].hasOwnProperty('image')) {
                                actualImage.setAttribute("src", titleData.results[i].image.url)
                            } else {
                                imageNotAvailable = true
                            }

                            var cardContent = document.createElement("div")
                            cardContent.className = "card-content"
                            cardContent.setAttribute("id", "details-card")

                            cardContent.innerHTML = "<h4>" + titleData.results[i].title 
                            + "</h4><h5>" +  titleData.results[i].year + "</h5>"

                            if (imageNotAvailable === true) {
                                figure.append(noImage)
                            } else {
                               figure.append(actualImage)
                            }

                            cardImage.append(figure)
                            resultsCard.append(cardImage)
                            cardWrapper.append(resultsCard, cardContent)
                            console.log(cardWrapper)










                            // let movieDetails = $("<ul>")
                            //     .html(
                            //         "<li> Movie Title: " + titleData.results[i].title + "</li>" +
                            //         "<li> Release Date: " + titleData.results[i].year + "</li>")

                            $(".return-results").append(cardWrapper)
                        }
                    }
                })
        })
        .catch(err => {
            console.error(err);
        });
}

$("#submit-button").on("click", function () {
    let currentMovieTitle = $("#movie-title-input").val().trim();
    console.log(currentMovieTitle);
    createMovieList(currentMovieTitle);
    $("#movie-title-input").val("");
}

);

// createMovieList("Rocky");
