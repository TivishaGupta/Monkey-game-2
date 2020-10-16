
var monkey , monkey_running;
var ground,  groundImage;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var survivalTime=0;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  

}



function setup() {
  createCanvas(600,300);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  //creating monkey
  monkey=createSprite(80,250,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  //creating ground
  ground = createSprite(400,280,1500,10);
  ground.velocityX=-(4+score*1.5/100);
  ground.x=ground.width/2
  


  
}


function draw() {
background("skyblue");
 stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("white");
  survivalTime=Math.ceil(frameCount/frameRate());
  console.log(survivalTime);
  text("SURVIVAL TIME:"+survivalTime,50,50);
  
  if(gameState===PLAY){
    obstacle();
    banana();
    score = score + Math.round(getFrameRate()/60);
  
   if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
     ground.velocityX = -(4+score*1.5/100);
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     if (bananaGroup.isTouching(monkey)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  }
   if (gameState === END){
    ground.velocityX = 0;
    monkey.velocityY=0;
    monkey.y = 235; 
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
     
      if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
   }
  
  monkey.collide(ground);
  drawSprites();
}

function banana(){
  if (frameCount%80 === 0){
    
var banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);         
    banana.lifetime = 220;
    bananaGroup.add(banana);
  }
}
function obstacle(){
  if (frameCount%300 === 0){
var obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
}




