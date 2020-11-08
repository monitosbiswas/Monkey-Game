var PLAY=1;
var END=0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1
  
  ground=createSprite(400,350,900,10)
  ground.x=ground.width/2;
  
  obstaclesGroup = new Group();
  FoodGroup = new Group();
  
}


function draw() {
 background(220);
  if(ground.x<0){
  ground.x=ground.width/2;
  ground.velocityX=-7;
  }
  
   
  if(gameState === PLAY){
     bananas();
     obstacles();
    
    if(keyDown("space")&& monkey.y >= 310) {
        monkey.velocityY = -17;
        
    }
     
     }
  
  if(gameState === END){
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
  monkey.velocityY=monkey.velocityY+0.8
  
  monkey.collide(ground);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,500,50)
  
   stroke("black");
  textSize(20);
  fill("balck");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survival Time:"+survivalTime,100,50)
  
  if(obstaclesGroup.isTouching(monkey)){
    
    gameState = END;  
  }
  
  drawSprites();   
}

function bananas(){
  if (frameCount % 80 === 0) {
 var banana=createSprite(400,200,10,10);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.lifetime=60
  banana.velocityX=-7
    
  banana.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
    FoodGroup.add(banana);
  
  }
}

function obstacles(){
  if (frameCount % 300 === 0) {
  var obstacle=createSprite(400,327,40,40);
  obstacle.x = Math.round(random(450,450));
  obstacle.addImage(obstaceImage);
  obstacle.velocityX=-7;
  obstacle.scale=0.1;
    obstaclesGroup.add(obstacle)
  }
  
}



