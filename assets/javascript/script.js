$(document).ready(function() {

    // global variables
    let gifCount = 10

    //API query info
    let search = "wizard"; //replace spaces with +!!!!!!!!!!
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=LvqdLRMeMuzOP8peDBL2nks74S42MJ0F";
    
    //calling API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response)
      for(let i = 0; i < gifCount; i++){
        console.log(response.data[i].images.original.url)
        let imgDiv = $('.gifs').append("<div>")
        imgDiv.html(`<img src=${response.data[i].images.original.url} />`)
      }
      // response.data.forEach(giphy => {
      //   console.log(giphy.url)
      //   $('body').html("<img src=" + response.data[0].images.original.url + " />")
    })
     
})