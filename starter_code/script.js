window.onload = function() {
  document.getElementById("start-button").onclick = function() {
   

      startGame();
    
    
  };
//
};

var obstacles= [];
var flappy;
var points=0;
  function startGame() {
    clearInterval(myFlappyArea.interval);
    obstacles=[]
    
    myFlappyArea.start();
    points=0;
    myFlappyArea.frames=0;

    flappy = new Flappy();
  }



var background = new Image();
background.src = "images/bg.png";
var x = 0;


var myFlappyArea ={
  canvas: document.getElementById("canvas"),
  frames: 0,
  start : function(){
    this.ctx =this.canvas.getContext("2d");
    this.interval = setInterval(updateFlappy, 20)
 },

  stop: function() {
    clearInterval(this.interval)
    myFlappyArea.ctx.clearRect(0, 0, 900, 504);
     myFlappyArea.ctx.drawImage(background, x, 0, 900, 504);

     myFlappyArea.ctx.drawImage(background, x+900, 0, 900, 504);

     for (var i = 0; i< obstacles.length; i++){
       obstacles[i].update();
     }
      //flappy game over
      myFlappyArea.ctx.drawImage(flappy.imgGO, flappy.x-20, flappy.y-30, 100, 120);
      myFlappyArea.score();
  },

  score: function(){
    this.ctx.font = "18px serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score: "+ points, 30, 30);
  }

}

function updateFlappy() {

  for (var p = 0 ; p< obstacles.length; p++){
  
    if (flappy.crashWith(obstacles[p]) || flappy.y > 459) {
      myFlappyArea.stop();
      return;
    }
    
  }

  myFlappyArea.frames++;


  //si la primera imagen se sale del canvas se reinicia la imagen
  if(x<-900){ // menos el width
    x=0
  }
  flappy.y += (flappy.gravity * flappy.speedY)
  myFlappyArea.ctx.drawImage(background, x,0,900, 504);
  myFlappyArea.ctx.drawImage(background, x +900,0,900, 504);// para crear una segunda imagen en x es x más el width
  x--;

  myFlappyArea.ctx.drawImage(flappy.img, flappy.x, flappy.y, flappy.width, flappy.height)

  if(myFlappyArea.frames> 500 && myFlappyArea.frames % 150 === 0){
    points++;
  }

  if (myFlappyArea.frames%150 ===0){
    minHeight=50;
    maxHeight=250;
    minGap=150;
    maxGap=200;
    height = Math.floor(Math.random()*(maxHeight-minHeight+1))+minHeight;
    gap = Math.floor(Math.random()*(maxGap-minGap+1))+minGap;
    width=60;
    obstacles.push(new Obstacles(width, height, 900, 0, 0));
    obstacles.push(new Obstacles(width, 504-height-gap, 900,height+gap, 1));
  }

  for (var i = 0; i< obstacles.length; i++){
    obstacles[i].x--;
    obstacles[i].update();
  }

  myFlappyArea.score();


}



function Flappy () {
  this.width = 50;
  this.height = 45;
  this.y=250;
  this.x=425;
  this.speedX=1,
  this.speedY=1;
  this.gravity= 0; 
  this.gravitySpeed= 0;

  this.img = new Image()
  this.img.src = "images/flappy.png"
  this.imgGO = new Image()
  this.imgGO.src = "images/flappy-bird-game-over.png"

}

//

Flappy.prototype.move = function() {

  if (this.y < 50) {
    this.y;
  } else {
    this.y -= 70;
  }
}



Flappy.prototype.left = function(){
  return this.x;
}
Flappy.prototype.right = function(){
    return this.x + 50;
}
Flappy.prototype.top = function(){
    return this.y;
}
Flappy.prototype.bottom = function(){
    return this.y + 45;
}

Flappy.prototype.crashWith = function(obstacle){
  return !((this.bottom() < obstacle.top()) ||
  (this.top() > obstacle.bottom()) ||
  (this.right() < obstacle.left()) ||
  (this.left() > obstacle.right()))
}


document.onkeydown= function(e) {
  if(e.keyCode === 32) {
    flappy.move();
    flappy.gravity =3;
  }
}

function Obstacles(width, height, x, y, side) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.img = new Image()
  if(side === 0) {
    this.img.src = "images/obstacle_top.png"
  } else {
    this.img.src = "images/obstacle_bottom.png"
  }

  //crash

  Obstacles.prototype.left = function(){
    return this.x;
  }
  Obstacles.prototype.right = function(){
      return this.x + this.width;
  }
  Obstacles.prototype.top = function(){
      return this.y;
  }
  Obstacles.prototype.bottom = function(){
      return this.y + this.height;
  }

 

  this.update = function() {
    myFlappyArea.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  
}