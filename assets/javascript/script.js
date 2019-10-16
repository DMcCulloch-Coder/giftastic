$(document).ready(function() {

    // global variables
    let gifCount = 10

    //API query info
    let search = "fairy tail"; //replace spaces with +!!!!!!!!!!
    let searchOutput = search.split(' ').join('+')

    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchOutput + "&api_key=LvqdLRMeMuzOP8peDBL2nks74S42MJ0F";
    
    //calling API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response)
      for(let i = 0; i < gifCount; i++){
        console.log(response.data[i].images.original.url)
        $('.gifs').append(`<img src=${response.data[i].images.original.url} />`)
        
      }
        
    })
     
})