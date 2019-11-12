const flock = [];

let alignSlider, cohesionSlider, separationSlider;



function preload() {
}

function setup() {
  let can=createCanvas(1280, 800);
  can.addClass("introboard");
  pixelDensity(0.7);
  const ctx = canvas.getContext('2d');
  ctx.shadowColor ='rgb(64,67,234)';
  ctx.shadowBlur = 20;
  
  for (let i = 0; i < 30; i++) {
    flock.push(new Boid());
  }
}

function draw() {

    background("rgb(8,8,24)"); //""

    for (let boid of flock) {
      boid.edges();
      boid.flock(flock);
      boid.update();
      boid.show();
  }
}
  




