var userClickedPattern = [];

var started = false;

var level = 0;

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
   
});


function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor((Math.random() * 4))
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    //console.log(gamePattern);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}


$(".btn").on("click", pickedColor)

function pickedColor(){
    
    var userChosenColor = $(this).attr("id");
    
    //console.log("This id is " + userChosenColor)
    
    userClickedPattern.push(userChosenColor)
    //console.log(userClickedPattern)
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1)
    
    //return userChosenColor;
}




function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(()=>{
        $("."+currentColour).removeClass("pressed"); 
    },100);
    
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
       // console.log("success");

        if(gamePattern.length === userClickedPattern.length){

            setTimeout(()=>{
                nextSequence();
            },1000);
        }

    }else{
        var audio = new Audio(`sounds/wrong.mp3`);
        audio.play();
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        //console.log("wrong");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
};