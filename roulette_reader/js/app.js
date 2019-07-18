// document on load
$(() => {

  // ===========================
  // Global Variables
  // ===========================

  const apiKey = "AIzaSyDxujG3pEo1LFJPKORWqOb0tto-mDuYm5Q";

  // ===========================
  // Functions
  // ===========================

  const showDescription = (event) => {
    event.preventDefault();
    $description = $(event.currentTarget).parent().siblings(".description");
    $description.toggleClass("hidden");
  };

  const generateList = (event) => {
    // prevent reloading
    event.preventDefault();
    // clear old cards from the #information div
    $("#information").empty();
    // get the user's keyword from the input
    const keyword = $("input[type='text']").val();

    // connecting to the googlebooks api
    $.ajax({
      url: "https://www.googleapis.com/books/v1/volumes?q=" + keyword + "&key=" + apiKey
    }).then(
      (data) => {
        // loops through the 10 results
        for (let i = 0; i < 10; i++) {
          // create an empty card
          $card = $("<div>").addClass("card");
          // create a div to hold an image
          $imageDiv = $("<div>").addClass("imageDiv");
          // create image
          $image = $("<img>").attr("src", data.items[i].volumeInfo.imageLinks.thumbnail).addClass("bookThumbnail");
          // create outerContainer div, which holds all other information
          $outerContainer = $("<div>").addClass("outerContainer");
          // create h2 title
          $title = $("<h2>").text(data.items[i].volumeInfo.title || "No title is available.");
          // create innerContainer div, which holds a div with two h3s, and a button
          $innerContainer = $("<div>").addClass("innerContainer");
          // create the div that holds the two h3s
          $div = $("<div>")
          // create the two h3 elements
          $author = $("<h3>").text(data.items[i].volumeInfo.authors || "No author is available.");
          $category = $("<h3>").text(data.items[i].volumeInfo.categories || "No category is available.");
          // create the button
          $button = $("<button>").text("show description");
          // add event listener to button
          $button.on("click", showDescription);
          //create the div that holds the description
          $descriptionDiv = $("<div>").addClass("description").addClass("hidden");
          $description = $("<p>").text(data.items[i].volumeInfo.description || "No description is available.");
          // append the elements to respective parents
          $outerContainer.append($title).append($innerContainer).append($descriptionDiv);
          $innerContainer.append($div).append($button);
          $div.append($author).append($category);
          $descriptionDiv.append($description);
          $imageDiv.append($image);
          // append the created elements to the $card
          $card.append($imageDiv).append($outerContainer);
          // append the card to the page
          $("#information").append($card);
        };
      },
      () => {
        // if something goes wrong:
        console.log("Houston, we have a problem.");
      }
    );

  };

  // ===========================
  // Event Listeners / Handlers
  // ===========================

  $("#generate").on("click", generateList);

});
