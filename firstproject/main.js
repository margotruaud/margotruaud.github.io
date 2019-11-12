

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

let guardSquad = [];
var huntTime = false; 
let guard = new Guard;
var phase = 1;
var guardN=6;
var covered_body=0;

let antigone = new Antigone;

var h = 213;
var l = 0;

var sunposition = H-80;

// --------------------------------
// --------------------------------
// -------------------------------- Useful functions --------------------------
// --------------------------------
// --------------------------------

//-------------------------------- Sky color --------------------------

function skycolor(){
  l+=0.025;
  if (l>76){
    gameoverCause = 2;
    gameover=true;
    gameOverManager(2);
  }
  return "hsl(" +h.toString()+", 100%," + l.toString() +"%)";
}

function endgame(){
  gameover = true;

  ctx.clearRect(0,0,W,H);

  ctx.beginPath();
  ctx.fillStyle = "rgb(8,8,24)";
  ctx.fillRect(0,0,W,H);
  ctx.font = '30px Antique';
  ctx.fillStyle = "rgb(206,205,255)";
  ctx.fillText('CREON', W/2, H/2-150);
  ctx.fillText(`Si tu avais été une servante, tu n'aurais pas douté que tu allais mourir et tu serais restée à pleurer ton frère `,50, H/2 -70);
  ctx.fillText(`chez toi. Seulement tu as pensé que tu étais de race royale, ma nièce et la fiancée de mon fils, et que,`, 50, H/2-20);
  ctx.fillText(`quoi qu’il arrive, je n'oserais pas te faire mourir. `, 50, H/2 + 30);
  ctx.fillText('ANTIGONE', W/2, H/2 + 100);
  ctx.fillText(`Vous vous trompez. J'étais certaine que vous me feriez mourir au contraire.`, 50, H/2 + 180);
  
  ctx.closePath();

  document.onclick= function(){
    
    ctx.beginPath();
    ctx.fillStyle = "rgb(8,8,24)";
    ctx.fillRect(0,0,W,H);
    ctx.closePath();
    ctx.fillStyle = "rgb(206,205,255)";
    
    ctx.beginPath();
    ctx.shadowColor ='rgb(64,67,234)';
    ctx.shadowBlur = 30;
    ctx.arc(W/2, 50, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2, 100, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2, 150, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2, 200, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2 - 20, 250, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2 + 20, 250, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2 - 70, 300, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2 + 70, 300, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2 - 100, 350, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2 + 100, 350, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2 - 100, 400, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2 + 100, 400, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2 - 100, 450, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2 + 100, 450, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2 - 70, 500, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2 + 70, 500, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2 - 20, 550, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(W/2 + 20, 550, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.font = '30px Antique';
    ctx.fillText("Fin", W/2 - 10, 400);
    ctx.closePath();
    

    
  };
}

//-------------------------------- Gameover Manager  --------------------------

function gameOverManager(n){

  
  if (n===1){
    endgame();
  }

  else if (phase===2){
    endgame();
  }
  
  else if (n===2){
    ctx.clearRect(0,0,W,H);
    ctx.beginPath();
    ctx.fillStyle = "rgb(8,8,24)";
    ctx.fillRect(0,0,W,H);
    ctx.font = '30px Antique';
    ctx.fillStyle = "rgb(206,205,255)";
    ctx.fillText(`LE GARDE`,W/2,H/2-300);
    ctx.fillText(`Le cadavre, chef. Quelqu'un l'avait recouvert. Oh! pas grand-chose.`,100,H/2-250);
    ctx.fillText(`Ils n'avait pas eu le temps, avec nous à côté. Seulement un peu de terre…`,100,H/2-200);
    ctx.fillText(`Mais assez tout de même pour le cacher aux vautours.`,100,H/2-150)
    ctx.fillText(`CRÉON, va à lui. `,W/2,H/2-100);
    ctx.fillText(`Tu es sûr que ce n’est pas une bête en grattant? `,100,H/2-50);
    ctx.fillText(`LE GARDE`,W/2,H/2);
    ctx.fillText(`Non, chef. On a d'abord espéré ça, nous aussi. Mais la terre était jetée sur lui. Selon les rites.`,100,H/2+50);
    ctx.fillText(`C’est quelqu'un qui savait ce qu’il faisait. `,100,H/2+100);
    ctx.fillText(`CRÉON `,W/2,H/2+150);
    ctx.fillText(`Qui a osé? Qui a été assez fou pour braver ma loi?`,100,H/2+200);

    ctx.fillText(`Cliquez pour continuer.`,W/2,H/2+350);
    
    ctx.closePath();
    guardN=10;
    phase = 2;
    
    document.onclick= function(){
      console.log("coucou");
      startGame(1);
    } 
  }
  else{
    return;
  }

}

//-------------------------------- Collision manager --------------------------
function collide(){
  if (!((antigone.x > (guard.x + guard.w)) || ((antigone.x + antigone.w) < (guard.x)) || ((antigone.y+ antigone.h) < guard.y) || (antigone.y > (guard.y + guard.h))) ) {
      gameoverCause = 1;
      gameOverManager(1);
  }

  for (let i=0; i<guardN; i++){
    if (!((antigone.x > (guardSquad[i].x + guardSquad[i].w)) || ((antigone.x + antigone.w) < (guardSquad[i].x)) || ((antigone.y+ antigone.h) < guardSquad[i].y) || (antigone.y > (guardSquad[i].y + guardSquad[i].h))) ) {
      gameoverCause = 1;
      gameOverManager(1); 
    } 
  }
}




//-------------------------------- Draw everything --------------------------
function Gamedraw(){

  if (!gameover){
    ctx.beginPath();
  ctx.fillStyle = "rgb(206,205,255)";
  ctx.fillRect(0,0,W,H);
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.shadowColor ='black';
  ctx.shadowBlur = 30;
  ctx.fillRect(W/2,300,30,80);
  ctx.shadowBlur = 0;
  ctx.closePath();
  
  ctx.beginPath();
  var cov="rgba(206,205,255," + (covered_body/100).toString() +")";
  ctx.fillStyle = cov;
  ctx.fillRect(W/2,300,30,80);
  ctx.closePath();

  ctx.beginPath()

  if ((antigone.x > W-80) ||(antigone.y < 70) || ((antigone.x < 80) && (Math.abs(H/2 - antigone.y) > 50))  || (antigone.y > H-100)) {
    antigone.x=0;
    antigone.y=H/2 - 40;
    huntTime=false;
  }

  antigone.draw();

  if (huntTime){
    guard.hunt(antigone.x, antigone.y); 
  }

  else {
    guard.move();
    guard.draw();
  }

  for (let i = 0; i <guardSquad.length; i++){
    guardSquad[i].line(i,guardN);
    guardSquad[i].draw();
  }
  collide();

  ctx.beginPath();
  ctx.fillStyle = 'rgb(8,8,24)';
  ctx.fillRect(0,0,W,80);
  ctx.fillRect(0,80,80,H/2-130);
  ctx.fillRect(0,H/2+50,80,H/2-50);

  ctx.fillRect(80,H-80,W-80,80);
  ctx.fillStyle = skycolor();
  if (!gameover){
    ctx.fillRect(W-80,80,80,H-160);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle="lightyellow";
    ctx.shadowColor ='red';
    ctx.shadowBlur = 30;
    ctx.arc(W-40, sunposition, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur=0;
    sunposition-=0.2;
    
    
  }
  
  ctx.closePath();

  if (!gameover){
  ctx.beginPath();
  ctx.lineWidth=0.8;
  ctx.strokeStyle = "rgb(206,205,255)";
  ctx.strokeRect(W/2,30,100,20);
  ctx.fillStyle="rgb(206,205,255)";
  ctx.fillRect(W/2,30,covered_body,20);
  ctx.closePath();
  ctx.font = '30px Antique';
  ctx.fillText(covered_body.toString()+'%', W/2 + 150, 50);
  }
  
  ctx.closePath();

  }

  }

  


function animLoop(){
  frames++;
  if (!gameover) {
    Gamedraw();
    requestAnimationFrame(animLoop);
  }
  //else{
   // gameOverManager(gameoverCause);
 // }
}


// -------------------------------- Show the rules --------------------------
function showTheRules(){
  document.getElementById("titre").innerHTML = `<div id="therules"> <p> Déplace toi jusqu'au cadavre de ton frère à l'aide des flêches.  </p> <p> Utilise la touche D pour le recouvrir. </p> 
  <p> Echappe aux gardes en sortant du plateau. </p>
  <p> Finis ta tâche avant le lever du soleil. </p> </div> <button id="start-button"> PLAY </button>` ;
  document.getElementById("start-button").onclick= function(){
    document.querySelector(".introboard").style.display= "none";
    document.querySelector("#titre").style.display="none";
    document.querySelector(".boardgame").style.display = "block";  
    
    startGame(0);
  };
}


function startGame(n){
  huntTime= false;
  gameover = false;
  covered_body = 0;
  sunposition= H-80;
  if (n===0){
    phase = 1;
    guardN = 6;
    for (let i = 0; i < guardN; i++){
      guardSquad.push(new Guard);
    }
  }
  else{

    phase = 2;
    guardN = 16;
    for (let i=0; i<guardSquad.length; i++){
      guardSquad[i]= new Guard;
    }
    antigone = new Antigone;
    guard = new Guard;
    h = 213;
    l = 0;
    for (let i = 0; i < 14; i++){
      guardSquad.push(new Guard);
    }

  }
  
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
      
      startGame(0);
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
          if ((covered_body%10===0) && (covered_body!==0)){
            huntTime=true;
          }
          if (covered_body >100){
            gameover=true;
          }
        
        default:
          break;
        
      }
    }
    
