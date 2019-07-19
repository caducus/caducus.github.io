// document on load
$(() => {

  // ===========================
  // Global Variables
  // ===========================

  // the api key needed to access google books
  const apiKey = "AIzaSyDxujG3pEo1LFJPKORWqOb0tto-mDuYm5Q";

  // counter variable for the current image index of the image carousel
  let currentImgIndex = 0;

  // the array that holds the temporary bookCard data
  let bookCardArray = [];

  // the array to hold the images in the carousel
  const imageCarouselArray = [];

  // the array that holds the corrosponding data for the book images saved in the carousel
  const dataCarouselArray = [];

  // ===========================
  // Functions
  // ===========================

  // an event handler assigned to the buttons generated in the bookCards
  const showDescription = (event) => {
    // prevent reloading
    event.preventDefault();
    // selects the description box
    $description = $(event.currentTarget).parent().siblings(".description");
    // toggles the hidden class on and off the description box
    $description.toggleClass("hidden");
  };

  const generateMyBook = () => {
    console.log("does something");
  };

  // an event handler assigned to the images generate in the bookCards
  const saveBook = (event) => {
    // prevent reloading
    event.preventDefault();
    //get the value from the image, which corrosponds with the data in the bookCardArray
    const selectedCard = $(event.currentTarget).attr("value");
    // select the whole card
    $card = $(event.currentTarget).parent().parent();
    // remove the card from the list of bookCards
    $card.remove();
    // push the information from the card removed to the image/data CarouselArrays
    imageCarouselArray.push(bookCardArray[selectedCard].thumbnail);
    dataCarouselArray.push(bookCardArray[selectedCard]);
    // invoke the generateMyBook function
    generateMyBook();
  };

  // generates a list of 10 books based on the user's input
  const generateList = (event) => {
    // prevent reloading
    event.preventDefault();
    // clear old cards from the #information div
    $("#information").empty();
    // empties the bookCardArray
    bookCardArray = [];
    // get the user's keyword from the input
    const keyword = $("input[type='text']").val();

    // connecting to the googlebooks api
    $.ajax({
      url: "https://www.googleapis.com/books/v1/volumes?q=" + keyword + "&key=" + apiKey
    }).then(
      (data) => {
        // loop creates the list of 10 bookCards and appends them to the #information div
        for (let i = 0; i < 10; i++) {
          // creating the bookObject for the global array starts here
          const bookObject = {
            title: data.items[i].volumeInfo.title || "No title is available.",
            author: data.items[i].volumeInfo.authors || "No author is available.",
            genre: data.items[i].volumeInfo.categories || "No category is available.",
            description: data.items[i].volumeInfo.description || "No description is available.",
            thumbnail: data.items[i].volumeInfo.imageLinks.thumbnail
          };
          bookCardArray.push(bookObject);
          // creating the bookCard on the html starts here
          // create an empty card
          $card = $("<div>").addClass("card");
          // create a div to hold an image
          $imageDiv = $("<div>").addClass("imageDiv");
          // create image
          $image = $("<img>").attr("src", data.items[i].volumeInfo.imageLinks.thumbnail).addClass("bookThumbnail").attr("value", i);
          // add event listener to image
          $image.on("click", saveBook);
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
          //create the div that holds the description, and create the description
          $descriptionDiv = $("<div>").addClass("description").addClass("hidden");
          $description = $("<p>").text(data.items[i].volumeInfo.description || "No description is available.");
          // append the elements to respective parents
          $outerContainer.append($title).append($innerContainer).append($descriptionDiv);
          $innerContainer.append($div).append($button);
          $div.append($author).append($category);
          $descriptionDiv.append($description);
          $imageDiv.append($image);
          // append the completed parent/child elements to the $card
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

  const cycleImages = () => {
    console.log("I have been clicked.");
  };

  // ===========================
  // Event Listeners / Handlers
  // ===========================

  // tied to the "submit" button on the html upon load
  $("#generate").on("click", generateList);

  // tied to the next button for the image carousel
  $("#next").on("click", cycleImages);


});
