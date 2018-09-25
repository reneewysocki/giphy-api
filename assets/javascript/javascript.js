$( document ).ready(function() {

    var searchOptions = ["horse", "dog", "squirrel", "parrot", "duck", "pig", "fish", "whale"];
    var gifRating = "";
    var gifURL = "";

    
    
    // renders button from Search Options loop
    function renderButtons() {
        $("#buttons").empty();
        for (var i = 0; i < searchOptions.length; i++) {
          var a = $("<button>");
          a.addClass("search-button");
          a.attr('id', searchOptions[i])
          a.attr("data-name", searchOptions[i]);
          a.text(searchOptions[i]);
          $("#buttons").append(a);
        }
    };
    

    function displayGifs () {
        var search = $(this).attr("data-name");
        var APIkey = "JKBLfP36MCmRu0GOW0fX0txrpxwZn9ue";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key="+ APIkey + "&limit=10";
        console.log(queryURL); // displays the constructed url
        $.ajax({
            url: queryURL,
            method: 'GET'
        }) .done(function(response) {
            console.log(search);
            console.log(response);
            $("#gifs").empty();
            for (let j = 0; j < response.data.length; j++) {
                gifURL = response.data[j].images.original.url
                gifRating = response.data[j].rating
                console.log(gifURL);
                console.log(gifRating);
                $("#gifs").append("<img src='" + gifURL + "'>")
            }
        });
    };


    
    $(document).on("click", ".search-button", displayGifs);
    renderButtons();
    
//closes page
});

    

