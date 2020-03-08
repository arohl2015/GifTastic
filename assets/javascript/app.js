// Start of Game
//Create topic array to hold my initial button variables

var topics = [
    "Aladdin", "Toy Story", "The Little Mermaid", "The Lion King", "Finding Nemo",
    "Mickey Mouse", "Olaf", "Maleficent", "Cinderella", "Mary Poppins"
];
//Global variables for topic
var topicsSelected = "";
var topicsNew;

//Create the buttons within my webpage

function renderButton() {
    $("#gifButtons").empty();
    //loop through the array I created
    for (var i = 0; i < topics.length; i++) {
        var buttons = $("<button>");
        buttons.addClass("topics");
        buttons.addClass("btn btn-primary")
        buttons.attr("data-name", topics[i]);
        buttons.text(topics[i]);
        $("#gifButtons").append(buttons);
    }
}

//creating click event - once I click on the button the gifs display
$(".buttons").on("click", function() {
    ;


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })

