function calcAngle(x,y) {
  return (Math.atan2(y, x));

}

class Guard {
  constructor(){
    const img = document.createElement('img');

    img.onload = () => {
      const imgRatio= img.naturalWidth/img.naturalHeight;
      this.img = img;

      this.x = Math.floor(W/2);
      this.y = Math.floor(H/2);
      this.speed = 2;
      this.w = 40;
      this.h = this.w/imgRatio;
      this.direction = "N";
      this.headings= 0;
      this.movement = 0;
    }
    img.src = "./casque.png";
  }

  draw(){
    if (!this.img) return;
    ctx.drawImage(this.img, this.x,this.y,this.w,this.h);
  }

  move(){
    if ((this.direction === "S") && (this.y >= H-160)){
      this.direction="E";
    }
    else if ((this.direction === "E") && (this.x >= W-160)){
      this.direction="N";
    }

    else if ((this.direction === "N") && (this.y <= 160)){
      this.direction="W";
    }

    else if ((this.direction ==="W") && (this.x <=160 )){
      this.direction="S";
    }

    switch(this.direction){
      case "S":
        this.y+=this.speed;
        break;
      
      case "E":
        this.x+=this.speed;
        break;
      
      case "N":
        this.y-=this.speed;
        break;
      
      case "W":
        this.x-=this.speed;
        break;
      
      default:
        break;
    }
  }

  line(n,nguard){

    if (this.movement === 0) {
      this.movement=1;
      this.x = Math.floor((W-160)/nguard)*n + 80;
      this.y = Math.floor(Math.random()*H);
    }

    if (this.direction === "N"){
      if (this.y <= 100){
        this.direction ="S";
        this.y+=this.speed;
      }
      else {
        this.y-=this.speed;
      }
    } 

    else if (this.direction === "S"){
      if (this.y >= H-100){
        this.direction ="N";
        this.y-=this.speed;
      }
      else {
        this.y+=this.speed;
      }
    }
      
  }

  hunt(antigoneX,antigoneY){

    var angle=calcAngle(this.x - antigoneX, this.y - antigoneY );

    ctx.save();
    ctx.translate((this.x + 0.5*this.w),(this.y + 0.5*this.h) );
    ctx.rotate(angle + Math.PI/2);
    ctx.translate(-(this.x + 0.5*this.w), -(this.y + 0.5*this.h));


    if (antigoneX >= this.x){
      this.x+=this.speed;
    }

    else if (antigoneX < this.x){
      this.x-=this.speed;
    }

    if (antigoneY >= this.y){
      this.y+=this.speed;
    }
      
    else if (antigoneY < this.y){
      this.y-=this.speed;
    }
    this.draw();
    this.headings=angle;
    ctx.restore();





  }
      
}