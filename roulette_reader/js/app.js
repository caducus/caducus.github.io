// document on load
$(() => {

  // ===========================
  // Global Variables
  // ===========================

  //key=API_KEY
  //AIzaSyDxujG3pEo1LFJPKORWqOb0tto-mDuYm5Q

  // ===========================
  // Functions
  // ===========================

  const generateList = (event) => {
    // prevent reloading
    event.preventDefault();

    console.log("oh hai~");
  };

  // ===========================
  // Event Listeners / Handlers
  // ===========================

  $("#getInfo").on("click", generateList);

});
