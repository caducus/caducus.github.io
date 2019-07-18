// document on load
$(() => {

  // ===========================
  // Global Variables
  // ===========================

  const apiKey = "AIzaSyDxujG3pEo1LFJPKORWqOb0tto-mDuYm5Q";
  let genre = ["biography", "business", "cooking", "fantasy", "history", "mystery", "religion", "romance", "science fiction", "self-improvement", "teen"]

  // ===========================
  // Functions
  // ===========================

  const generateList = (event) => {
    // prevent reloading
    event.preventDefault();

    // connecting to the googlebooks api
    $.ajax({
      url: "https://www.googleapis.com/books/v1/volumes?q=subject=" + genre[0] + "&orderBy=newest&key=" + apiKey
    }).then(
      (data) => {
        console.log(data);
      },
      () => {
        console.log("This shit did not work, sorry boss.");
      }
    );

  };

  // ===========================
  // Event Listeners / Handlers
  // ===========================

  $("#getInfo").on("click", generateList);

});
