
// Initial array of characters of "friends" TV show
var topics = ["Joey Tribbiani", "Chandler Bing", "Phoebe Buffay", "Rachel Green", "Monica Geller", "Ross Geller", "Janice Hosenstein", "Ben Geller", "Mike Hannigan", "Judy Geller"];

// displaygif function re-renders the HTML to display the appropriate content
function displayGif() {
  
  // Here I construct my URL and with my unique api key for giphy, with the limit of 10
  var topic = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic +
  "&api_key=3bIERZ9pckEJHoWsjSHJ9ivyxQvdgOrh&limit=10";

  //making a url and get method to make a request to get the api information from server
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    
    
for (let i = 0; i < response.data.length; i++) {
  
  console.log(i);
  

    // Creating a div to hold the a gif 
    var gifDiv = $("<div class='gifRatingDiv'>");

    // Storing the rating data
    var rating = response.data[i].rating;

    // Creating an element to have the rating displayed
    var ratingHolder = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    gifDiv.append(ratingHolder);

    //?????
    // Storing the still state of the gif
    var stillGif = response.data[i].images.fixed_height_still.url;


    // Creating an element to hold the still type gif
    var gifStill = $("<img>").attr("src", stillGif).attr("data-still", response.data[i].images.fixed_height_still.url).attr("data-animate", response.data[i].images.fixed_height.url).attr("data-state", "still").addClass("gif");


    // Displaying still gif
    gifDiv.append(gifStill);


    // Storing the animated state of the gif
    // var animatedGif = response.data.user.images.fixed_height;


    // Creating an element to hold the animated gif
    // var gifAnimated = $("<img>").attr("src", animatedGif);


    // Appending the animated gif
    // gifDiv.append(gifAnimated);

    $("#gif-view").prepend(gifDiv);
}
});

}

// Function for displaying gif data
function renderButtons() {

  // Deleting the gifs prior to adding new gifs
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var x = $("<button>");

    // Adding a class of topic-btn to our button
    x.addClass("topic-btn");

    // Adding a data-attribute
    x.attr("data-name", topics[i]);

    // Providing the initial button text
    x.text(topics[i]);

    // Adding the button to the buttons-view div
    $("#buttons-view").append(x);
  }
}

// This function handles events when a gif button is clicked
$("#add-gif").on("click", function (event) {

  //event.preventDefault() can be used to prevent an event's default behavior.
  event.preventDefault();
  // This line grabs the input or value from the textbox and trims space
  var topic = $("#gif-input").val().trim();

  // Adding gif or topic from the textbox to our array
  topics.push(topic);

  // Calling renderButtons which handles the processing of our topics/gifs array
  renderButtons();
});
$(document).on("click",".gif", function() {
  console.log("still");
  
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".topic-btn", displayGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();

//  $(".gif").on("click", function() {
//    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//    var state = $(this).attr("data-state");
//    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//    // Then, set the image's data-state to animate
//    // Else set src to the data-still value
//    if (state === "still") {
//      $(this).attr("src", $(this).attr("data-animate"));
//     $(this).attr("data-state", "animate");
//    } else {
//     $(this).attr("src", $(this).attr("data-still"));
//      $(this).attr("data-state", "still");
//   }
//  });


// // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
// //$("#gifs-appear-here").prepend(gifDiv);