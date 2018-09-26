$(document).ready(function () {

    var searchOptions = ["the office", "arrested development", "stranger things", "parks and recreation", "30 rock", "archer", "bobs burgers"];
    var gifRating = "";
    var gifAnimateURL = "";
    var gifStillURL = "";


    // renders button from Search Options loop
    function renderButtons() {
        $("#buttons").empty();
        for (var i = 0; i < searchOptions.length; i++) {
            var a = $("<button>");
            a.addClass("search-button");
            a.addClass("col");
            a.attr('id', searchOptions[i])
            a.attr("data-name", searchOptions[i]);
            a.text(searchOptions[i]);
            $("#buttons").append(a);
        }
    };


    function displayGifs() {
        var search = $(this).attr("data-name");
        var APIkey = "JKBLfP36MCmRu0GOW0fX0txrpxwZn9ue";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + APIkey + "&limit=10";
        console.log(queryURL); // displays the constructed url
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            console.log(search);
            console.log(response);
            $("#gifs").empty();
            for (let j = 0; j < response.data.length; j++) {
                var gifDiv = $("<div>");
                var gifImage = $("<img>");
                gifAnimateURL = response.data[j].images.original.url
                gifStillURL = response.data[j].images.original_still.url
                gifRating = response.data[j].rating.toUpperCase()
                gifImage.attr("src", gifAnimateURL);
                gifImage.attr("data-still", gifStillURL); // still image
                gifImage.attr("data-animate", gifAnimateURL); // animated image
                gifImage.attr("data-state", "animate"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
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



