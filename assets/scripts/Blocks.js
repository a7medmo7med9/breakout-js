import Entity, { entityProps } from "./Entity.js";
import { remainingPercentage } from "./utils.js";

export const BlockProps = {
  ...entityProps,

};

class Block extends Entity {
  constructor(_PROPS_ = BlockProps) {
    const props = { ...BlockProps, ..._PROPS_ };
    super({ ...props });
    this.blockArray = [];
    this.live = {
      available: false,
      x: 0,
      y: 0,
      radius: 10,
    };
  }

  onFrameUpdate() {
    let flag = false;
    for (let i = 0; i < this.blockArray.length; i++) {
      let block = this.blockArray[i];
      if (block.breaker != 0) {
        this.BreakoutGame.context.fillStyle = "skyblue";
        if (block.breaker == -1) this.BreakoutGame.context.fillStyle = "rgb(179, 131, 58)";
        if (block.breaker == 1) this.BreakoutGame.context.fillStyle = "rgb(176, 166, 141)";
        this.BreakoutGame.context.fillRect(block.x, block.y, this.width, block.height);

        if (this.detectCollision(this.BreakoutGame.ball, block)) {

          this.resolveCollision(this.BreakoutGame.ball, block);
          if (block.breaker > 0) {
            const sound = new Audio('/assets/sound/bricks-104933.mp3');
            sound.play();
            block.breaker -= 1;
            if (block.breaker == 0) {
              this.BreakoutGame.updateScore(10);
              if (Math.random() >= 0.9 && this.live.available == false) {
                this.live.available = true;
                this.live.x = block.x + block.width / 2;
                this.live.y = block.y + block.height;
              }
            }
          }
        }
      }
      if (block.breaker > 0) {
        flag = true;
      }
    }
    if (flag === false) {

      this.BreakoutGame.nextLevel++;
      this.createBlocks();
      this.live.available = false;

    }


    if (this.live.available == true) {
      this.live.y += 2
      this.BreakoutGame.context.fillStyle = "bisque";
      this.BreakoutGame.context.beginPath();
      this.BreakoutGame.context.arc(this.live.x, this.live.y, this.live.radius, 0, Math.PI * 2);
      this.BreakoutGame.context.fill();
      this.BreakoutGame.context.fillStyle = "red";  
      this.BreakoutGame.context.font = "bold 1.8em Arial";  
      this.BreakoutGame.context.textAlign = "center";  
      this.BreakoutGame.context.textBaseline = "middle  ";  
      this.BreakoutGame.context.fillText("♥︎", this.live.x, this.live.y);

      if (this.live.y >= this.BreakoutGame.gameHeight - 2 ) this.live.available = false;
        if (this.detectCollision( this.live, this.BreakoutGame.player )) {
          this.live.available = false;
          this.BreakoutGame.lives += 1;
          document.getElementById('lives').innerText = " ♥︎ : " + this.BreakoutGame.lives;
        }
    }
  }


  createBlocks() {
    this.blockArray = [];  
    let choices = [-1,1,2] 
    let unbreakable = 0;    
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 8; j++) {
          let random = choices[Math.floor(Math.random()*choices.length)]

          if ( random === -1 ){
            if ( unbreakable >= 12 ){
              Math.random() > 0.7 ? random = 2: random = 1;
            }else unbreakable++;
          } 

          let block = {
            x: this.x + j * (this.width + 38 ), 
            y: this.y + i * (this.height + 20),
            width: this.width,
            height: this.height,
            breaker: random,
          };

          this.blockArray.push(block);
      }
    }
  }

  detectCollision(ball, block) {
    return (
      ball.x - ball.radius < block.x + block.width &&
      ball.x + ball.radius > block.x &&
      ball.y - ball.radius < block.y + block.height &&
      ball.y + ball.radius > block.y
    );
  }

  
  resolveCollision(ball, block) {
    let ballCenterX = ball.x;
    let ballCenterY = ball.y;
    let blockCenterX = block.x + block.width / 2;
    let blockCenterY = block.y + block.height / 2;
  
    let dx = ballCenterX - blockCenterX;
    let dy = ballCenterY - blockCenterY;
  
    let combinedHalfWidth = block.width / 2 + ball.radius;
    let combinedHalfHeight = block.height / 2 + ball.radius;
  
    let overlapX = combinedHalfWidth - Math.abs(dx);
    let overlapY = combinedHalfHeight - Math.abs(dy);
  
    if (overlapX < overlapY) {
      ball.velocityX *= -1;
      if (dx > 0) {
        ball.x = block.x + block.width + ball.radius; 
      } else {
        ball.x = block.x - ball.radius; 
      }
    } else {
      ball.velocityY *= -1;
      if (dy > 0) {
        ball.y = block.y + block.height + ball.radius; 
      } else {
        ball.y = block.y - ball.radius; 
      }
    }
  }




}

export default Block;
