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

                    //Typing gibberish or nothing will return error modal
                    if (!titleData.results) {
                        console.log("searching")
                        console.log("modal error here");
                    } else {
                        // For loop to cycle through the movie results
                        for (var i = 0; i < titleData.results.length; i++) {

                            //checks to see if it has a name property, which indicates NOT a movie, so do nothing
                            console.log(titleData.results[i])

                            if (titleData.results[i].hasOwnProperty('name')) {

                            } else {
                                // Create the elements for the verified movie
                                let movieImgEl = $("<img>")
                                    .width(225)
                                    .height(300)
                                    .addClass("")


                                console.log("building html")
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

                                var figure = document.createElement("figure")
                                figure.className = "figure"

                                var actualImage = document.createElement("img")
                                actualImage.className = "image is-2by4"
                                actualImage.setAttribute("src", "")

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
                                    location.href = "../soundtrack-index.html"
                                })

                                let movieDetails = $("<ul>").html(
                                    "<li> Title: " + titleData.results[i].title + "</li>" +
                                    "<li> Release Date: " + titleData.results[i].year + "</li>" +
                                    "<li> Type: " + titleData.results[i].titleType + "</li>"
                                )

                                let linkToSoundtrack = $("<a>")
                                    .attr("href", "./soundtrack.html?movie=" + titleData.results[i].id)
                                    .append(movieImgEl, movieDetails);

                                let movieContainerEl = $("<div>")
                                    .addClass("")
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


                                if (imageNotAvailable === true) {
                                    figure.append(noImage)
                                } else {
                                    figure.append(actualImage)
                                }

                                cardImage.append(figure)
                                resultsCard.append(cardImage)
                                cardWrapper.append(resultsCard, cardContent)
                                console.log(cardWrapper)

                                $(".return-results").append(cardWrapper, toSoundtrack)
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
