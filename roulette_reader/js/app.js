// document on load
$(() => {

  // ===========================
  // Global Variables
  // ===========================

  const apiKey = "AIzaSyDxujG3pEo1LFJPKORWqOb0tto-mDuYm5Q";

  // ===========================
  // Functions
  // ===========================

  const generateList = (event) => {
    // prevent reloading
    event.preventDefault();
    // clear old cards from the #information div
    $("#information").empty();
    // get the user's keyword from the input
    const keyword = $("input[type='text']").val();

    // // connecting to the googlebooks api
    // $.ajax({
    //   url: "https://www.googleapis.com/books/v1/volumes?q=subject=" + keyword + "&key=" + apiKey
    // }).then(
    //   (data) => {
    //     // loops through the 10 results
    //     for (let i = 0; i < 10; i++) {
    //       // create an empty card
    //       $card = $("<div>");
    //       // create each card element, adding the information from the googlebooks object
    //       $title = $("<p>").text(data.items[i].volumeInfo.title || "No title is available.");
    //       $author = $("<p>").text(data.items[i].volumeInfo.authors || "No author is available.");
    //       $category = $("<p>").text(data.items[i].volumeInfo.categories || "No category is available.");
    //       $descriptionDiv = $("<div>");
    //       $description = $("<p>").text(data.items[i].volumeInfo.description || "No description is available.");
    //       $image = $("<img>").attr("src", data.items[i].volumeInfo.imageLinks.thumbnail)
    //       // append the created elements to the $card
    //       $descriptionDiv.append($description);
    //       $card.append($image).append($title).append($author).append($category).append($descriptionDiv);
    //       // append the card to the page
    //       $("#information").append($card);
    //     };
    //   },
    //   () => {
    //     // if something goes wrong:
    //     console.log("Houston, we have a problem.");
    //   }
    // );

  };

  // ===========================
  // Event Listeners / Handlers
  // ===========================

  $("#generate").on("click", generateList);

});
