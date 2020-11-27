var ball;
var database,position;

function setup(){
    createCanvas(500,500);
    database= firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";


    //ref to the databasefield and track the changes in the value
    var location= database.ref("ball/position");
    location.on("value",readPosition,showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

//write the value to the database
function writePosition(x,y){
    database.ref("ball/position").set({
        x : ball.x + x,
        y : ball.y + y
    })
   
}

//read the value from the database and assign it to ball's x and y position
function readPosition(data){
    position= data.val();
    ball.x = position.x;
    ball.y = position.y;
}

//if the data is not read properly from database call the function showError
function showError(){
    console.log("there is an error"); 
}

