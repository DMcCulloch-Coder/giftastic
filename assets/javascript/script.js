$(document).ready(function() {

    // global variables
    let offsetValue = 0 //set as a variable so that you can increase the gifs on the page, set up 100 max.
    
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
      console.log(offsetValue) //test
      
      searchOutput = search.split(' ').join('+');
      queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchOutput}&api_key=LvqdLRMeMuzOP8peDBL2nks74S42MJ0F&limit=10&offset=${offsetValue}`;

      //get the new gifs
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response) //test
        for(let i = 0; i < (offsetValue+10); i++){
          $('.gifs').append(`<div class='divDisplay'><img class='gif' data-gif=${response.data[i].images.original.url} src=${response.data[i].images.original_still.url} />
            <p>Title: ${response.data[i].title}</p><p>Rating: ${response.data[i].rating}</p></div`)
          
        }
          
      })
    }


  //Call functions and onclicks
  

  renderButtons();
  getGifs();
  
  // onclick for adding new buttons for topics
  $('.add-bar-button').on("click", function(event) {
    event.preventDefault();
    let addButton = $('.add-bar').val();
    $('.add-bar').val('')
    topicArray.push(addButton);
    renderButtons();
    

  })

  $(document).on('click', '.button', function() {
    search = $(this).attr('data-name')
    offsetValue = 10;
    $('#extend').css('display', 'block')
    $('.gifs').empty();
    getGifs();

  })

  $(document).on('click', '#extend', function() {
    if(offsetValue <= 90) {
      offsetValue += 10;
      getGifs();
    }
    if(offsetValue === 90) {
      $('#extend').css('display', 'none')
    }

  })

  $(document).on('click', 'img', function() {
    let tempData = $(this).attr('src')
    $(this).attr('src', $(this).attr('data-gif'))
    $(this).attr('data-gif', tempData)

  })
      
})
