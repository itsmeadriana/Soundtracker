createMovieList = function (movieTitle) {
    //fetch movie info using the IMDb title/find
    fetch("https://imdb8.p.rapidapi.com/title/find?q=" + movieTitle, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "26912c0d0bmsh1a9a0bf389afa2bp184927jsnfe71f43ae2f4",
            "x-rapidapi-host": "imdb8.p.rapidapi.com"
        }
    })
        .then(response => {
            response.json()
                .then(function (titleData) {

                    //Typing gibberish or nothing will return error modal
                    if (!titleData.results) {
                        console.log("searching")
                        console.log("modal error here");
                    } else {
                        // For loop to cycle through the movie results
                        for (var i = 0; i < titleData.results.length; i++) {

                            //checks to see if it has a name property, which indicates NOT a movie, so do nothing
                            // console.log(titleData.results[i])

                            if (titleData.results[i].hasOwnProperty('name')) {

                            } else {
                                // Create the elements for the verified movie
                                //
                                // var movieImgEl = document.createElement("img")
                                // movieImgEl.className = "image is-2by4"
            
                                // movieImgEl.setAttribute("src", "")


                                let movieImgEl = $("<img>")
                                    .width(225)
                                    .height(300)
                                    .addClass("actual-image card")
                                    .attr("src", "")

                                // movieImgEl = document.createElement("img")
                                // movieImgEl.className = "image is-2by4"
                                // movieImgEl.setAttribute("src", "")

                                if (titleData.results[i].hasOwnProperty('image')) {
                                    movieImgEl.attr("src", titleData.results[i].image.url);
                                } else {
                                    imageNotAvailable = true
                                    movieImgEl.attr("src", "");
                                }

                                // console.log("building html")
                                var returnResults = document.createElement("section")
                                returnResults.className = "return-results box list"

                                var cardWrapper = document.createElement("div")
                                cardWrapper.className = "card-wrapper box"
                                cardWrapper.setAttribute("id", "wrap")

                                var resultsCard = document.createElement("div")
                                resultsCard.className = "image-container"
                                resultsCard.setAttribute("id", "results-card")

                                var cardImage = document.createElement("div")
                                cardImage.className = "card-image is-flex-shrink-0"

                                // var figure = document.createElement("figure")
                                // figure.className = "figure"

                                // var movieImgEl = document.createElement("img")
                                // movieImgEl.className = "image is-2by4"
                                // movieImgEl.setAttribute("src", "")

                                var noImage = document.createElement("div")
                                noImage.className = "missing-movie-poster-placeholder"

                                var imageNotAvailable = false

                                if (titleData.results[i].hasOwnProperty('image')) {
                                    movieImgEl.attr("src", titleData.results[i].image.url);
                                } else {
                                    imageNotAvailable = true
                                    movieImgEl.attr("src", "");
                                }

                                var toSoundtrack = document.createElement("button")
                                toSoundtrack.innerHTML = "Soundtrack";
                                toSoundtrack.addEventListener("click", function () {
                                    location.href = "./soundtrack-index.html"
                                })

                                let movieDetails = $("<ul>").html(
                                    "<li> Title: " + titleData.results[i].title + "</li>" +
                                    "<li> Release Date: " + titleData.results[i].year + "</li>" +
                                    "<li> Type: " + titleData.results[i].titleType + "</li>"
                                )

                                let linkToSoundtrack = $("<a>")
                                    .attr("href", "./soundtrack-index.html?movie=" + titleData.results[i].id)
                                    .append(movieImgEl, movieDetails);

                                let movieContainerEl = $("<div>")
                                    .addClass("card")
                                    .append(linkToSoundtrack)
                                    .attr("id", titleData.results[i].id);
                                $("#movie-list").append(movieContainerEl);



                                // document.body.appendChild(toSoundtrack);

                                var cardContent = document.createElement("div")
                                cardContent.className = "card-content"
                                cardContent.setAttribute("id", "details-card")

                                cardContent.appendChild(toSoundtrack)

                                // 

                                // var cardFooterItem = createElement("button")
                                // cardFooterItem.className = "card-footer-item"
                                // cardFooterItem.setAttribute("src", "")

                                // footer.append(cardFooterItem)
                                // cardContent.append(footer)

                                cardContent.innerHTML = "<h4>" + titleData.results[i].title
                                    + "</h4><h5>" + titleData.results[i].year + "</h5>"


                                // .replace("&lt;", "<").replace("&gt;", ">")
                                // var imageHTML = movieImgEl.prop('outerHTML')
                                // figure.append(imageHTML)
                                // console.log("poster: " + imageHTML)

                                // if (imageNotAvailable === true) {
                                //     figure.append(noImage)
                                // } else {
                                //     figure.append(movieImgEl)
                                // }

                                
                                // cardImage.appendTo(figure)
                                resultsCard.append(cardImage)
                                cardWrapper.append(resultsCard, cardContent)
                                // console.log(cardWrapper)

                                $(".return-results").append(cardWrapper, linkToSoundtrack)
                                // toSoundtrack)
                            }
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        })
}

$("#submit-button").on("click", function () {
    let currentMovieTitle = $("#movie-title-input").val().trim();
    createMovieList(currentMovieTitle);
    $("#movie-title-input").val("");
    
}
);

createMovieList("Moana");
