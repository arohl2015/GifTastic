// Start of Game
$(document).ready(function () {
    //Create topic array to hold my initial button variables

    var topics = [
        "Aladdin", "Toy Story", "The Little Mermaid", "The Lion King", "Finding Nemo",
        "Mickey Mouse", "Olaf", "Maleficent", "Cinderella", "Mary Poppins"];

    //Create the buttons within my webpage

    function renderButton() {
        $("#gifButtons").empty();
        //loop through the array I created
        for (var i = 0; i < topics.length; i++) {
            var g = $("<button>");
            g.addClass("disney");
            g.attr("data-name", topics[i]);
            g.text(topics[i]);
            $("#gifButtons").append(g);
        }
    }
    //extra line to call the render function
    renderButton();

    // Going to add click function for any disney related item the user enters
    $("#submitButton").on("click", function () {
        //Per class, we add event.preventDefault() to prevent the form from trying to submit itself.
        event.preventDefault();
        var disney = $("#user-search").val().trim();
        topics.push(disney);
        renderButton();
        return;
    });

    //Need a click function to display the gifs and limit to 10
    $("button").on("click", function () {
        var disney = $(this).attr("data-name");
        //adding in the queryURL to call my topics
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + disney
            + "&api_key=XkBUwWsWZbjJd8jPjMS74rwU2bvbhlat&limit=10"

        // AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
            //Per research: always prefer .then() so code is compatible with the open promise standard
        }).then(function (response) {
            //logging my responses and queryURL
            console.log(queryURL);
            console.log(response);
            //class review - this stores the data from our AJAX
            var result = response.data;
            $("#displayImgs").empty();
            //loops through the results var created
            for (var i = 0; i < result.length; i++) {
                // create new div's, p's, and img's
                var disneyDiv = $("<div>");
                var p = $("<p>").text("Rating: " + result[i].rating);
                var disneyImg = $("<img>");
                // creating general image src for all images to be able to animate
                // and pause them - cannot pull each random image separately
                disneyImg.attr("src", result[i].images.original_still.url);
                disneyImg.attr("data-pause", result[i].images.original_still.url);
                disneyImg.attr("data-animate", result[i].images.original.url);
                disneyImg.attr("data-state", "pause");
                disneyImg.attr("class", "gif");
                disneyDiv.append(p);
                disneyDiv.append(disneyImg);
                $("#displayImgs").append(disneyDiv);
            }
        });

    });

    function changeGif() {
        var state = $(this).attr("data-state");
        var animateImg = $(this).attr("data-animate");
        var pauseImg = $(this).attr("data-pause");
        // from class -if  the clicked image's state is still, need to update to show what it is if animated
        // Add in if/else statements to show what would happen based on whether its paused or animated
        if (state === "pause") {
            $(this).attr("src", animateImg);
            $(this).attr("data-state", "animate");
        }
        else if (state === "animate") {
            $(this).attr("src", pauseImg);
            $(this).attr("data-state", "pause")
        }
    }

    $(document).on("click", ".gif", changeGif);

});



