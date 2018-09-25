$( document ).ready(function() {

    var searchOptions = ["horse", "dog", "squirrel", "parrot", "duck", "pig", "fish", "whale"];
    var APIkey = "JKBLfP36MCmRu0GOW0fX0txrpxwZn9ue";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key="+ APIkey + "&limit=10";
    var search = "";
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
        search = $(this).attr("data-name");
        console.log(queryURL); // displays the constructed url
        $.ajax({
            url: queryURL,
            method: 'GET'
        }) .done(function(response) {
            console.log(search);
            console.log(response);
        });
    };


    
    $(document).on("click", ".search-button", displayGifs);
    renderButtons();
    
//closes page
});

    

