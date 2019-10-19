$(document).ready(function() {

    // global variables
    let gifCount = 10 //set as a variable so that you can increase the gifs on the page, set up 100 max.

    //API query info
    let search = "Dr. Who";
    let searchOutput = search.split(' ').join('+');
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchOutput + "&api_key=LvqdLRMeMuzOP8peDBL2nks74S42MJ0F";
    let topicArray = ["Dr. Who", "Cybermen", "Dalek", "Tardis", "Gallifrey", "Time Lords", "The Doctor", "Clara Oswald", "Amy Pond", 
      "River Song", "Martha Jones", "Weeping Angel", "Sonic Screwdriver", "Rose Tyler"];
    

    //functions
    function renderButtons() {
      //clear out current gifs

      $('.button-div').empty();

      for (let i = 0; i < topicArray.length; i++) {
        let newButton = $('<button>')
        newButton.addClass('button')
        newButton.attr('data-name', topicArray[i])
        newButton.text(topicArray[i])
        $('.button-div').append(newButton)


      }

    }


    //calling API
    function getGifs() {
      console.log(gifCount) //test

      $('.gifs').empty();

      searchOutput = search.split(' ').join('+');
      queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchOutput + "&api_key=LvqdLRMeMuzOP8peDBL2nks74S42MJ0F";

      //get the new gifs
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        
        for(let i = 0; i < gifCount; i++){
          $('.gifs').append(`<img class='gif' src=${response.data[i].images.original.url} />`)
          
        }
          
      })
    }


  //Call functions and onclicks
  

  renderButtons();
  getGifs();
  
  $('.add-bar-button').on("click", function(event) {
    event.preventDefault();
    let addButton = $('.add-bar').val();
    $('.add-bar').val('')
    topicArray.push(addButton);
    renderButtons();
    

  })

  $('.button').on('click', function(event) {
    search = $(this).attr('data-name')
    gifCount = 10;
    getGifs();

  })

  $('#extend').on('click', function(event) {
    console.log('working')  //test
    if(gifCount <= 100) {
      console.log('still working')  //test
      gifCount += 10;
      getGifs();
    }
    if(gifCount === 100) {
      $('#extend').css('display', 'none')
    }
  })
      
})

// when doing onclick for add buttin add:
// event.preventDefault(); // to stop it from refreshing the page after onclick to submit new inputs
// add conditional to not work if it is blank