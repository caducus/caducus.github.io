// document on load
$(() => {

  // ===========================
  // Global Variables
  // ===========================

  // the api key needed to access google books
  const apiKey = "AIzaSyDxujG3pEo1LFJPKORWqOb0tto-mDuYm5Q";

  // the array that holds the tempCard data
  let bookCardArray = [];

  // the array that holds the more permanent myBookCard data
  const dataCarouselArray = [];

  // the array that holds the suggested search terms for the "spin the wheel" button
  const suggestedSearch = ["cooking", "baking", "barbeque", "sushi", "wine", "whiskey", "cocktail", "fiction", "science fiction", "fantasy", "dragon", "unicorn", "trashy romance", "harlequinn", "bodice ripper", "western", "spy thriller", "juvenille picture book", "disney", "dr suess", "descendants", "rick riordan", "harry potter", "business profile", "economics", "bitcoin", "nature and wildlife", "environment", "musical biography", "historical biography", "world war II", "domestic affairs", "current affairs", "world affairs", "world war I", "civil war", "modern warfare", "weapons of war", "movie trivia", "drama", "poetry", "shakespeare", "parenting help", "self improvement", "new age", "hippy dippy bullshit", "science", "mathematics", "physics", "biology", "chemisty", "computer science", "javascript", "python", "ruby on rails", "computers for dummies", "reference", "atlas", "transportation", "how to write a novel", "religion", "eastern religion", "bible", "james patterson", "danielle steel", "mitch albom", "tom clancy", "clive cussler", "dan brown", "mary higgins clark", "george martin", "robert jordan", "douglass adams", "true crime", "mystery", "comic book", "marvel", "x-men", "daredevil", "deadpool", "iron man", "preacher", "manga", "naruto", "bleach", "graphic novel", "rpg", "mo williems", "evil dead"];

  // ===========================
  // Functions
  // ===========================

  // an event handler assigned to the buttons generated in the tempCards and myBookCards
  // toggles the visibility of the descriptions of the cards
  const showDescription = (event) => {
    // prevent reloading
    event.preventDefault();
    // selects the description box
    $description = $(event.currentTarget).parent().siblings(".description");
    // toggles the hidden class on and off the description box
    $description.toggleClass("hiddenText");
  };

  // an event handler assigned to the images generated in the myBookCards
  // allows the user to remove the current card from their selected items
  const removeCard = (event) => {
    // empty #current-book div
    $("#current-book").empty();
    // find the src of the currentImage
    let srcTag = $(".showImage").children().attr("src");
    // declare currentImageIndex to a default of 0
    let currentImageIndex = 0;
    // loop through the dataCarouselArray
    for (let i = 0; i < dataCarouselArray.length; i++) {
      // determines position of currentImageIndex
      if (dataCarouselArray[i].thumbnail === srcTag) {
        // if the previous button was clicked
        currentImageIndex = i;
        };
    };
    // delete the data from the dataCarouselArray
    dataCarouselArray.splice(currentImageIndex, 1);
    // delete the currentImage
    $(event.currentTarget).parent().remove();
    // put up the first image in the array
    if (dataCarouselArray.length > 0) {
      // select the images in the div, make sure they have a class of "hideImage" and remove any that may "showImage"
      $("#carousel-images").children().removeClass("showImage").addClass("hideImage");
      // select the first item in the array
      $currentImage = $("#carousel-images").children().eq(0);
      // add a class of showImage to only the first image in the array
      $currentImage.removeClass("hideImage").addClass("showImage");
      generateMyCard(0);
    };
  };

  // function that creates myBookCards in the html
  // takes a parameter of currentBook, which is the array position of the object in the dataCarouselArray
  const generateMyCard = (currentBook) => {
    // empty #current-book div
    $("#current-book").empty();
    // create an empty myBookCard
    $myBookCard = $("<div>").addClass("myBookCard");
    // create h2 title
    $title = $("<h2>").text(dataCarouselArray[currentBook].title);
    // create innerContainer div, which holds a div with two h3s, and a button
    $innerContainer = $("<div>").addClass("innerContainer");
    // create the div that holds the two h3s
    $div = $("<div>")
    // create the two h3 elements
    $author = $("<h3>").text(dataCarouselArray[currentBook].author);
    $category = $("<h3>").text(dataCarouselArray[currentBook].genre);
    // create the button
    $button = $("<button>").text("more");
    // add event listener to button
    $button.on("click", showDescription);
    //create the div that holds the description, and create the description
    $descriptionDiv = $("<div>").addClass("description").addClass("hiddenText");
    $description = $("<p>").text(dataCarouselArray[currentBook].description);
    // append the elements to respective parents
    $innerContainer.append($div).append($button);
    $div.append($author).append($category);
    $descriptionDiv.append($description);
    // append the completed parent/child elements to $myBookCard
    $myBookCard.append($title).append($innerContainer).append($descriptionDiv);
    // append the card to the page
    $("#current-book").append($myBookCard);
  };

  // runs when moving a tempCard from the generated list to the .current-book div
  // adds a bookCover image to the image carousel, invokes the generateMyCard function
  const makeBookCover = () => {
    // select the current book
    let currentBook = dataCarouselArray.length - 1
    // create an image element to hold the bookCover
    $bookCover = $("<img>")
      // if there is more than one book covers in the carousel
      if (currentBook > 0) {
        // hide the previous image
        $("#carousel-images").children().removeClass("showImage").addClass("hideImage");
      };
    // create a div to hold the image
    $bookCoverDiv = $("<div>").addClass("bookCoverDiv").addClass("showImage");
    // add the correct source to the image element
    $bookCover.attr("src", (dataCarouselArray[currentBook].thumbnail));
    // add the event listener to delete this card to the image
    $bookCover.on("click", removeCard);
    // append the image to the bookCoverDiv
    $bookCoverDiv.append($bookCover)
    // append the bookCover to the proper place
    $("#carousel-images").append($bookCoverDiv);
    generateMyCard(currentBook);
  };

  // an event handler assigned to the images generated in the tempCards
  // begins the process of removing the tempCard and creating myBookCard
  const saveBook = (event) => {
    // prevent reloading
    event.preventDefault();
    //get the value from the image, which corrosponds with the data in the bookCardArray
    const selectedCard = $(event.currentTarget).attr("value");
    // select the whole tempCard
    $card = $(event.currentTarget).parent().parent();
    // remove the tempCard from the list of bookCards
    $card.remove();
    // push the information from the tempCard removed to the dataCarouselArray
    dataCarouselArray.push(bookCardArray[selectedCard]);
    // invoke the makeBookCover function
    makeBookCover();
  };

  // function that creates tempCards in the html
  // takes a parameter of keyword
  const generateTempCard = (keyword) => {
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
          // pushes the book object into the temporary bookCardArray
          bookCardArray.push(bookObject);
          // creating the tempCard on the html starts here
          // create an empty tempCard
          $tempCard = $("<div>").addClass("tempCard");
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
          $button = $("<button>").text("more");
          // add event listener to button
          $button.on("click", showDescription);
          //create the div that holds the description, and create the description
          $descriptionDiv = $("<div>").addClass("description").addClass("hiddenText");
          $description = $("<p>").text(data.items[i].volumeInfo.description || "No description is available.");
          // append the elements to respective parents
          $outerContainer.append($title).append($innerContainer).append($descriptionDiv);
          $innerContainer.append($div).append($button);
          $div.append($author).append($category);
          $descriptionDiv.append($description);
          $imageDiv.append($image);
          // append the completed parent/child elements to the $tempCard
          $tempCard.append($imageDiv).append($outerContainer);
          // append the tempCard to the page
          $("#generated-list").append($tempCard);
        };
      },
      () => {
        // if something goes wrong:
        console.log("Houston, we have a problem.");
      }
    );
  };

  // generates a list of 10 books based on the user's input
  const generateList = (event) => {
    // prevent reloading
    event.preventDefault();
    // clear old cards from the #information div
    $("#generated-list").empty();
    // empties the bookCardArray
    bookCardArray = [];
    // get the user's keyword from the input
    const keyword = $("input[type='text']").val();
    // call on the api to do the search and generate up to 10 temporary cards
    generateTempCard(keyword);
  };

  // allows the user to move forward and back in the image carousel of saved myBookCards
  const cycleImages = (event) => {
    event.preventDefault();
    // grab the identity of the button clicked
    let direction = $(event.currentTarget).attr("id");
    // find the current image that is selected
    let srcTag = $(".showImage").children().attr("src");
    // declare currentImageIndex to a default of 0
    let currentImageIndex = 0;
    // loop through the dataCarouselArray
    for (let i = 0; i < dataCarouselArray.length; i++) {
      // determines position of currentImageIndex
      if (dataCarouselArray[i].thumbnail === srcTag) {
        // if the previous button was clicked
        if (direction === "previous") {
          // decrement currentImageIndex
          currentImageIndex = i - 1;
        // if the next button was clicked
        } else if (direction === "next") {
          // increment currentImageIndex
          currentImageIndex = i + 1;
        };
      };
    };

    // if the array is at the beginning, reset the number to the end
    if (currentImageIndex === (-1)) {
      currentImageIndex = dataCarouselArray.length - 1;
    // if the array is at the end, reset the number to the beginning
    } else if (currentImageIndex > dataCarouselArray.length - 1) {
      currentImageIndex = 0;
    };

    // if the array.length is 1, do nothing
    if (dataCarouselArray.length === 1) {
      console.log("I am a helpful notice that nothing should be happening right now!");
    // if the array.length is greater than 1
    } else {
      // hide the image that currently has a class of showImage
      $(".showImage").addClass("hideImage").removeClass("showImage");
      // select the image that needs to be show
      $currentImage = $("#carousel-images").children().eq(currentImageIndex);
      // show the new current image
      $currentImage.removeClass("hideImage").addClass("showImage");
      // generate corrosponding myBookCard
      generateMyCard(currentImageIndex);
    };
  };

  // an event handler that opens the "about" modal
  const modal = () => {
    // makes the modal visible on click
    $("#modalAbout").toggleClass("hiddenModal");
  };

  // a function to get a random number between 0 and the maxNumber parameter
  const rollDice = (maxNumber) => {
    return Math.floor(Math.random() * Math.floor(maxNumber))
  };

  // an event handler tied to the "rouletteReader" button
  // selects a random book from the books the user has chosen
  const pickRandomList = () => {
    // prevent reloading
    event.preventDefault();
    // pick a random index number
    let randomIndex = rollDice(suggestedSearch.length);
    // use the random index number to find a random keyword
    let keyword = suggestedSearch[randomIndex];
    // clear old cards from the #information div
    $("#generated-list").empty();
    // empties the bookCardArray
    bookCardArray = [];
    // call on the api to do the search and generate up to 10 temporary cards
    generateTempCard(keyword);
  };

  // ===========================
  // Event Listeners / Handlers
  // ===========================

  // tied to the "submit" button on the html upon load
  $("#generate").on("click", generateList);

  // tied to the next button for the image carousel
  $("#next").on("click", cycleImages);

  // tied to the previous button for the image carousel
  $("#previous").on("click", cycleImages);

  // tied to the about button, opens the modal
  $("#about").on("click", modal);

  // tied to the close button, closes the modal
  $("#closeModal").on("click", modal);

  // tied to the "spin the wheel" button, chooses a random subject to suggest a list of tempCards to the user
  $("#rouletteReader").on("click", pickRandomList)

});
