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
      console.log('possible error')

      $('#gifs img').empty();

      searchOutput = search.split(' ').join('+');
      queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchOutput + "&api_key=LvqdLRMeMuzOP8peDBL2nks74S42MJ0F";

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
  
  $('.add-bar-button').on("click", function(event) {
    event.preventDefault();
    let addButton = $('.add-bar').val();
    $('.add-bar').val('')
    topicArray.push(addButton);
    renderButtons();
    

  })

  $('.button').on('click', function(event) {
    search = $(this).attr('data-name')
    console.log(search)
    getGifs();

  })

  $('#extend').on('click', function(event) {
    console.log('working')
    if(gifCount <= 100) {
      console.log('still working')
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