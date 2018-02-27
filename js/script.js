$(document).ready(function(){
    console.log("ready");
    var URL = "https://api.giphy.com/v1/gifs/search?q=";
    var KEY = "&api_key=dc6zaTOxFJmzC&limit=11";
    var TOPICS = [
        "Audi",
        "Ferrari",
        "Lamborghini",
        "Bentley",
        "BMW",
    ];
    //Diplay Topics
    for(var index = 0; index<TOPICS.length; index++){
        $(".section").append(`<input type ='button' class = 'request-btn' value = '${TOPICS[index]}'></input>`);
    }
    //Display Input Element and Button to add more topics
    $(".aside").append("<input type = 'text' placeholder = 'add your own!' id = 'user-input'></input>");
    $(".aside").append("<input type = 'button' value = 'add topic' class = 'add-btn'></input>");
    // $(".aside").append("<input type = 'button' value = 'clear gifs' class = 'clear-btn'></input>");

    // on click events
    //=============================================================================================================

    $(document).on("click", ".request-btn", function(){
        $(".article *").remove();
        //forming url
        var queryURL = URL + $(this).val() + KEY;
        //ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            for(var index = 1; index<response.data.length; index++){
                var idSelector = "#"+response.data[index].id;
                $(".article").append(`<div class = 'display-card' id = '${response.data[index].id}'></div>`);
                $(idSelector).append(`<div>Rating: ${response.data[index].rating}</div>`);
                //image tag with data to switch between animated and still states
                $(idSelector).append(`<img
                src = '${response.data[index].images.fixed_height_still.url}' 
                data-still = '${response.data[index].images.fixed_height_still.url}'
                data-animate = '${response.data[index].images.fixed_height.url}'
                data-state = 'still'
                alt = 'still-gif' 
                class = 'display-gif'>`);
            }
        });
    });

    $(document).on("click", ".display-gif", function(){
        var state = $(this).attr("data-state");
        if(state == "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }else{
            if(state =="animate"){
              $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            }
          }
    });

    $(document).on("click", ".add-btn", function(){
        console.log("adding..");
        var text = $('#user-input').val();
        if(text.length!=0){
            $(".section").append(`<input type ='button' class = 'request-btn' value = '${text}'></input>`);
            $("#user-input").val("");
        }
    });

    // $(document).on("click", ".clear-btn", function(){
        
    // });
})