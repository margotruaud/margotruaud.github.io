class Antigone{
  constructor(){
    this.y = H/2 - 100;
    this.x = 0;
    this.w=50;
    this.success= 0;
    this.speed = 30;
    const img = document.createElement('img');
    this.imgRatio = 1;

    img.onload = () => {
      this.imgRatio = img.naturalWidth/img.naturalHeight;
      this.h=this.w/this.imgRatio;
      this.img=img;
      
      
    }
    img.src ="./community_image_1422576596-removebg-preview.png";
    
  }

  draw(){
    if (!this.img) return;
    ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
  }

  moveLeft(){
      this.x -= this.speed;
  }

  moveRight(){
      this.x+= this.speed;
  }

  moveUp(){
      this.y-=this.speed;
  }

  moveDown(){
      this.y+=this.speed;
   
  }

  dig(bodyX,bodyY){
    if ((Math.abs(this.x - bodyX) < 40) && (Math.abs(this.y-bodyY) < 40)){
      this.success+=1;
    }
    return this.success;
  }
}