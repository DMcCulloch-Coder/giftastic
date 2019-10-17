$(document).ready(function() {

    // global variables
    let gifCount = 10

    //API query info
    let search = "The Doctor";
    let searchOutput = search.split(' ').join('+');
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchOutput + "&api_key=LvqdLRMeMuzOP8peDBL2nks74S42MJ0F";
    let topicArray = ["Dr. Who", "Cybermen", "Dalek", "Tardis", "Gallifrey", "Time Lords", "The Doctor"];
    

    //functions
    function renderButtons() {
      //clear out current gifs

      $('#gifs').empty();


    }


    //calling API
    function getGifs() {

      //get the new gifs
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response) //test
        for(let i = 0; i < gifCount; i++){
          $('.gifs').append(`<img src=${response.data[i].images.original.url} />`)
          
        }
          
      })
    }


  //Call functions and onclicks
  renderButtons();
  getGifs();
      
})

//when doing onclick for add buttin add:
// event.preventDefault(); // to stop it from refreshing the page
// add conditional to not work if it is blank