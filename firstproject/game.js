

// --------------------------------
// --------------------------------
// -------------------------------- Declarations --------------------------
// --------------------------------
// --------------------------------

const myCanvas = document.querySelector('#sketch');
const ctx = myCanvas.getContext('2d');
const W = ctx.canvas.width;
const H = ctx.canvas.height;

var gameover = false;
var gameoverCause=0;

var huntTime = false; 
var huntingGuard = new Guard;
//let guardSquad = [];
var phase = 1;
var covered_body=0;

let antigone = new Antigone;

var h = 242;
var l = 2;
var a = 0.4;

// --------------------------------
// --------------------------------
// -------------------------------- Useful functions --------------------------
// --------------------------------
// --------------------------------

//-------------------------------- Sky color --------------------------

function skycolor(){
  if ((h<250) && (h>241)){
    h+=0.01;
  }

  else if (l < 85){
    l+=0.1;
  }

  else if (((h>=250) && (h<360))||(h<50)){
      if (h>=359){
        h=0;
      }
      h+=0.08;
    }
  else if (a>=0.05){
    a-=0.01;
  }

  if (a <= 0.05){
    gameover = true;
    gameoverCause = 2;
  } 

  return "hsl(" +h.toString()+", 100%," + l.toString() +"%, +1)";
  //return "hsla(" + h.toString() + ", 100%, " + l.toString()+ "%,"+ a.toString()+ ")";
}


//-------------------------------- Collision manager --------------------------
function collide(){
  if (phase===1){
    if (!((antigone.x > (huntingGuard.x + huntingGuard.w)) || ((antigone.x + antigone.w) < (huntingGuard.x)) || ((antigone.y+ antigone.h) < huntingGuard.y) || (antigone.y > (huntingGuard.y + huntingGuard.h))) ) {
      gameover = true;
      gameoverCause = 1;
    }
/*
    for (let i=0; i<4; i++){
      if (!((antigone.x > (guardSquad[i].x + guardSquad[i].w)) || ((antigone.x + antigone.w) < (guardSquad[i].x)) || ((antigone.y+ antigone.h) < guardSquad[i].y) || (antigone.y > (guardSquad[i].y + guardSquad[i].h))) ) {
        gameover = true;
        gameoverCause = 1;
      }
    }*/

  }

  else if (phase===3){
    if (!((antigone.x > (huntingGuard.x + huntingGuard.w)) || ((antigone.x + antigone.w) < (huntingGuard.x)) || ((antigone.y+ antigone.h) < huntingGuard.y) || (antigone.y > (huntingGuard.y + huntingGuard.h))) ) {
      gameover = true;
      gameoverCause = 1;
    }
/*
    for (let i=0; i<guardSquad.length; i++){
      if (!((antigone.x > (guardSquad[i].x + guardSquad[i].w)) || ((antigone.x + antigone.w) < (guardSquad[i].x)) || ((antigone.y+ antigone.h) < guardSquad[i].y) || (antigone.y > (guardSquad[i].y + guardSquad[i].h))) ) {
        gameover = true;
        gameoverCause = 1;
      }
    }*/

  }
}


//-------------------------------- Gameover Manager  --------------------------

function gameOverManager(n){

  if (n===1){
    ctx.beginPath();
    ctx.fillStyle = "rgba(22,255,255,0.2)";
    ctx.fillRect(0,0,W,H);
    ctx.closePath();
  }

  if (n===2){
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(0,0,W,H);
    ctx.closePath();
  }

  else{
    return;
  }

}


//-------------------------------- Draw everything --------------------------
function Gamedraw(){
  if ((covered_body%10===0) && (covered_body!==0)){
    huntTime=true;
  }

  ctx.beginPath();
  ctx.fillStyle = "lightyellow";
  ctx.fillRect(80,80,W-160,H-160);
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = "rgb(255,87,51)"
  ctx.fillRect(W/2,300,30,80);
  ctx.closePath();
  
  ctx.beginPath();
  var cov="rgba(255,255,224," + (covered_body/100).toString() +")";
  ctx.fillStyle = cov;
  ctx.fillRect(W/2,300,30,80);
  ctx.closePath();


  /* 
  var corpse = new Image();
  corpse.onload = function(){
    ctx.drawImage(corpse,W/2,300, 100, 100);
  };
  corpse.src = "../images/antigone.png";
  */
  
  antigone.draw();

  if (phase===1){
    if (huntTime){
      huntingGuard.hunt(antigone.x, antigone.y); 
    }
    else {
      huntingGuard.move();
    }/*
    for (let i = 0; i <4; i++){
      if (guardSquad[i].movement === 0){
        guardSquad[i].move();
      }
      else{
        guardSquad[i].line();
      }
        guardSquad[i].draw();
      }*/
      huntingGuard.draw();
  }

  else if (phase===3) {
    if (huntTime){
      huntingGuard.hunt(antigone.x, antigone.y); 
    }
    else {
      huntingGuard.move();
    }
/*
    for (let i = 0; i <guardSquad.length; i++){
      if (guardSquad[i].movement === 0){
        guardSquad[i].move();
      }
      else{
        guardSquad[i].line();
      }
        guardSquad[i].draw();
      }*/
      huntingGuard.draw();
    }
   
  collide();

  ctx.beginPath();
  ctx.fillStyle = skycolor();
  ctx.fillRect(0,0,W,80);
  ctx.fillRect(0,80,80,H);
  ctx.fillRect(W-80,80,80,H-80);
  ctx.fillRect(80,H-80,W-80,80);

  ctx.closePath();

  ctx.beginPath();
  ctx.lineWidth=0.5;
  ctx.strokeStyle = "rgb(8,8,24)";
  ctx.strokeRect(W/2,30,100,20);
  ctx.fillStyle="rgb(206,205,255)";
  ctx.fillRect(W/2,30,covered_body,20);
  ctx.closePath();
  ctx.font = '30px Antique';
  ctx.fillText(covered_body.toString()+'%', W/2 + 150, 50);

}


function animLoop(){
  frames++;
  if (!gameover) {
    Gamedraw();
    requestAnimationFrame(animLoop);
  }
  else{
    gameOverManager(gameoverCause);
  }
}


// -------------------------------- Show the rules --------------------------
function showTheRules(){
  document.getElementById("titre").innerHTML = `<div id="therules"> <p> Use the arrows to go near your brother
  corpse. </p> <p> Use D to dig and cover up his body. </p> 
  <p> Escape the guards. </p>
  <p> Finish your task before the sunrise. </p> </div> <button id="start-button"> NOW PLAY</button>` ;
}


function startGame(){
  huntTime= false;
  gameover = false;
  gameoverCause = 0;/*
  for (let i = 0; i < 10; i++){
    guardSquad.push(new Guard);
    guardSquad[i].movement = Math.floor(Math.random()*10)%2;
    console.log(guardSquad[i].movement);
    console.log("phase=" + phase.toString());
  }*/
  requestAnimationFrame(animLoop);
}

// --------------------------------
// --------------------------------
// -------------------------------- Calls --------------------------
// --------------------------------
// --------------------------------

//-------------------------------------- INTRODUCTION ---------------------------------------------------------



    //var player = document.querySelector('#audioPlayer');
    //player.play();

    document.getElementById("rules").onclick= function(){
      showTheRules();
    };

    document.getElementById("start-button").onclick= function(){
      document.querySelector(".introboard").style.display= "none";
      document.querySelector("#titre").style.display="none";
      document.querySelector(".boardgame").style.display = "block";  
      
      startGame();
    };
    
  
    document.onkeydown = function(e){
      if(!antigone) return;
      switch (e.which){
        case 39:
          antigone.moveRight();
          break;
        
        case 37:
          antigone.moveLeft();
          break;
        
        case 38:
          antigone.moveUp();
          break;
    
        case 40:
          antigone.moveDown();
          break;

        case 68:
          covered_body=antigone.dig(W/2,300);
          if (covered_body >100){
            gameover=true;
          }
        
        default:
          break;
        
      }
    }
    








