$(document).ready(function () {

    var searchOptions = ["Candy", "Pretzels", "Trail Mix", "Crackers", "Chips", "Energy Drink", "Soda", "Water"];
    var gifRating = "";
    var gifAnimateURL = "";
    var gifStillURL = "";
   // var gifTitle = "";
    var downloadButton = "";

    // renders button from Search Options loop
    function renderButtons() {
       // $("#buttons").empty();
        for (var i = 0; i < searchOptions.length; i++) {
            var a = $("<button>");
            a.addClass("search-button");
            a.addClass("col");
            a.addClass("btn");
            a.addClass("btn-primary");
            a.attr('id', searchOptions[i])
            a.attr("data-name", searchOptions[i]);
            a.text(searchOptions[i]);
            $("#buttons").prepend(a);
        }
    };


    function displayGifs() {
        var search = $(this).attr("data-name");
        var APIkey = "JKBLfP36MCmRu0GOW0fX0txrpxwZn9ue";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + APIkey + "&limit=12";
        console.log(queryURL); // displays the constructed url
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            console.log(search);
            console.log(response);
            $("#gifs").empty();
            for (let j = 0; j < response.data.length; j++) {
                gifAnimateURL = response.data[j].images.fixed_width.url
                gifStillURL = response.data[j].images.original_still.url
                gifRating = response.data[j].rating.toUpperCase()
                var gifSlug = response.data[j].slug
                //gifTitle = response.data[j].title
                var gifDiv = $("<div>");
               // gifDiv.addClass("container");
                gifDiv.addClass("gifImage");
                gifRating = $("<p>").text("Rating: " + gifRating);
                //gifTitle = $("<p>").text("Title: " + gifTitle);
               // gifDiv.append(gifTitle);
                gifDiv.addClass("col-3")
                gifDiv.append(gifRating);
                // var downloadButtonA = $("<a>");
                // downloadButtonA.attr("download");
                // downloadButtonA.attr("href", gifAnimateURL);
                // downloadButtonA.attr("title", gifSlug);
                // gifDiv.append(downloadButtonA);
                // downloadButton = $("<button>");
                // downloadButton.addClass("btn");
                // downloadButton.addClass("btn-primary");
                // downloadButton.attr("type", "button");
                // downloadButton.attr("value", "download");
                // downloadButton.html("Download");
                // downloadButtonA.html(downloadButton);
                // var downloadButton = $("<div>");
                // downloadButton.html("<a download href=" + gifStillURL + "> <button class='btn btn-primary' type='submit'>Download</button> </a>");
                // gifDiv.append(downloadButton);
                var gifImage = $("<img>");
                gifImage.attr("src", gifAnimateURL);
                gifImage.attr("data-still", gifStillURL); // still image
                gifImage.attr("data-animate", gifAnimateURL); // animated image
                gifImage.attr("data-state", "animate"); // set the image state
                gifImage.addClass("image");
                gifImage.addClass("img-fluid");
                gifDiv.prepend(gifImage);
                $("#gifs").prepend(gifDiv);
            }
        });
    };

    function addNewButton() {
        $("#addGif").on("click", function () {
            var input = $("#user-input").val().trim();
            if (input == "") {
                return false; // added so user cannot add a blank button
            }
            searchOptions.push(input);

            renderButtons();
            return false;
        });
    }



    $(document).on("click", ".search-button", displayGifs);
    renderButtons();
    addNewButton();


    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        gifStillURL = $(this).attr("data-animate")
        gifAnimateURL = $(this).attr("data-still")
        if (state == 'animate') {
            $(this).attr('src', gifStillURL);
            $(this).attr('data-state', 'still');
        }
        if (state == 'still') {
            $(this).attr('src', gifAnimateURL);
            $(this).attr('data-state', 'animate');
        }

    });

    //closes page
});



