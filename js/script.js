$(document).ready(function(){
    console.log("ready");
    var URL = "https://api.giphy.com/v1/gifs/search?q=";
    var KEY = "&api_key=dc6zaTOxFJmzC&limit=5";
    var TOPICS = [
        "Audi",
        "Ferrari",
        "Lamborghini",
        "Bentley",
        "BMW",
        "Mersedes-Benz"
    ];
    //Diplay Topics
    for(var index = 0; index<TOPICS.length; index++){
        $(".section").append(`<input type ='button' class = 'request-btn' value = '${TOPICS[index]}'></input>`);
    }
    //Display Input Element and Button to add more topics
    $(".aside").append("<input type = 'text' placeholder = 'add your own!' id = 'user-input'></input>");
    $(".aside").append("<input type = 'button' value = 'add' class = 'add-btn'></input>");
    $(".aside").append("<input type = 'button' value = 'clear' class = 'clear-btn'></input>");
    $(document).on("click", ".request-btn", function(){
        //forming url
        var queryURL = URL + $(this).val() + KEY;
        //ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            for(var index = 1; index<response.data.length; index++){
                $(".article").append(`<img 
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
        // var text = $('#user-input').val();
        $(".section").append(`<input type ='button' class = 'request-btn' value = '${$('#user-input').val()}'></input>`);
        $("#user-input").val("");
    });

    $(document).on("click", ".clear-btn", function(){
        $(".article *").remove();
    });
})