import Entity, { entityProps } from "./Entity.js";
export const BlockProps = {
    ...entityProps,

  };
  
  class Block extends Entity {
    constructor(_PROPS_ = BlockProps) {
      const props = { ...BlockProps, ..._PROPS_ };
      super({ ...props });
    this.blockArray = [];
    this.levels =[
        // Level 1
        [
          [ 2, 2, 2, 2, 2, 2, 2, 2],
          [ 2, 2, 2, 2, 2, 2, 2, 2],
          [ 2, 2, 2, 2, 2, 2, 2, 2],
          [ 2, 2, 2, 2, 2, 2, 2, 2],
          [ 2, 2, 2, 2, 2, 2, 2, 2],
          [-1,-1,-1,-1,-1,-1,-1,-1],
        ],
        // Level 2
        [
          [-1, -1, -1, -1, -1, -1, -1, -1],
          [-1,  2,  2,  2,  2,  2,  2, -1],
          [-1,  2,  2,  2,  2,  2,  2, -1],
          [-1,  2,  2,  2,  2,  2,  2, -1],
          [-1,  2,  2,  2,  2,  2,  2, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1],
        ],
        // Level 3
        [
          [-1,  2, -1,  2, -1,  2, -1,  2],
          [ 2, -1,  2, -1,  2, -1,  2, -1],
          [-1,  2, -1,  2, -1,  2, -1,  2],
          [ 2, -1,  2, -1,  2, -1,  2, -1],
          [-1,  2, -1,  2, -1,  2, -1,  2],
          [ 2, -1,  2, -1,  2, -1,  2, -1],
        ],
        // Level 4
        [
          [ 2, -1, -1, -1, -1, -1, -1,  2],
          [ 2,  2,  2,  2,  2,  2,  2,  2],
          [-1,  2, -1, -1, -1, -1,  2, -1],
          [-1,  2, -1,  2,  2, -1,  2, -1],
          [-1,  2, -1,  2,  2, -1,  2, -1],
          [-1,  2,  2,  2,  2,  2,  2, -1],
          [-1, -1, -1,  2,  2, -1, -1, -1],
        ],
        // Level 5
        [
            [ 2,  2,  2,  2,  2,  2,  2,  2],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [ 2,  2,  2,  2,  2,  2,  2,  2],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [ 2,  2,  2,  2,  2,  2,  2,  2],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [ 2,  2,  2,  2,  2,  2,  2,  2],
            ],
      ];
      this.live = {
        available : false,
        x : 0,
        y : 0,
        radius : 10,
      };
  }

  onFrameUpdate() {
    for (let i = 0; i < this.blockArray.length; i++) {
        let block = this.blockArray[i];
        if (block.breaker != 0) {
          this.BreakoutGame.context.fillStyle = "skyblue";
          if (block.breaker == -1) this.BreakoutGame.context.fillStyle = "grey";
          if (block.breaker == 1) this.BreakoutGame.context.fillStyle = "rgba(135, 207, 235, 0.4)";
          this.BreakoutGame.context.fillRect(block.x, block.y, block.width, block.height);
          
          if (this.detectCollision(this.BreakoutGame.ball, block)) {
            this.resolveCollision(this.BreakoutGame.ball, block);
            if (block.breaker > 0) {
              block.breaker -= 1;
              if (block.breaker == 0){
                if (Math.random() >= 0 && this.live.available == false){
                  this.live.available = true;
                  this.live.x = block.x + block.width/2;
                  this.live.y = block.y + block.height;
                }
              }
            }
          }
        }
      }


    if (this.live.available == true){
        this.live.y += 2
        this.BreakoutGame.context.fillStyle = "bisque";
        this.BreakoutGame.context.beginPath();
        this.BreakoutGame.context.arc(this.live.x, this.live.y, this.live.radius, 0, Math.PI * 2);
        this.BreakoutGame.context.fill();
        this.BreakoutGame.context.fillStyle = "red";  // Color of the text
        this.BreakoutGame.context.font = "bold 1.8em Arial";  // Font size and type
        this.BreakoutGame.context.textAlign = "center";  // Center the text horizontally
        this.BreakoutGame.context.textBaseline = "middle  ";  // Center the text vertically

        // Draw the text inside the circle
        this.BreakoutGame.context.fillText("♥︎", this.live.x, this.live.y);
        if (this.live.y >= this.BreakoutGame.boardHeight) this.live.available = false;
    }
  }

  createBlocks(level) {
    const layout = this.levels[level-1];
    this.blockArray = [];
    for (let i = 0; i < layout.length; i++) {
      for (let j = 0; j < layout[i].length; j++) {
        if (layout[i][j] !== 0) {
          let block = {
            x: this.x + j * (this.width + 38 ), 
            y: this.y + i * (this.height + 20),
            width: this.width,
            height: this.height,
            breaker: layout[i][j],
          };
          this.blockArray.push(block);
        }
      }
    }
  }

  detectCollision(ball, block) {
    return (
        ball.x < block.x + block.width &&
        ball.x + ball.width > block.x &&
        ball.y < block.y + block.height &&
        ball.y + ball.height > block.y
    );
}

resolveCollision(ball, block) {
    let ballCenterX = ball.x + ball.width / 2;
    let ballCenterY = ball.y + ball.height / 2;
    let blockCenterX = block.x + block.width / 2;
    let blockCenterY = block.y + block.height / 2;

    let dx = ballCenterX - blockCenterX;
    let dy = ballCenterY - blockCenterY;

    let combinedHalfWidth = block.width / 2 + ball.width / 2;
    let combinedHalfHeight = block.height / 2 + ball.height / 2;

    let overlapX = combinedHalfWidth - Math.abs(dx);
    let overlapY = combinedHalfHeight - Math.abs(dy);

    if (overlapX < overlapY) {
        // Horizontal collision
        ball.velocityX *= -1;
        if (dx > 0) {
            ball.x = block.x + block.width;
        } else {
            ball.x = block.x - ball.width;
        }
    } else {
        // Vertical collision
        ball.velocityY *= -1;
        if (dy > 0) {
            ball.y = block.y + block.height;
        } else {
            ball.y = block.y - ball.height;
        }
    }
}
  
}

export default Block;
