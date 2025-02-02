import Entity, { entityProps } from "./Entity.js";

export const BallProps = {
  ...entityProps,
  // extra properties for ball
  velocityX: 0,
  velocityY: 0,
};

class Ball extends Entity {
  constructor(_PROPS_ = BallProps) {
    const props = { ...BallProps, ..._PROPS_ };
    super({ ...props });
    this.color = "white";
    this.velocityX = props.velocityX;
    this.velocityY = props.velocityY;
  }

  onFrameUpdate() {
    this.BreakoutGame.context.fillStyle = this.color;
    this.BreakoutGame.context.fillRect(this.x, this.y, this.width, this.height);
    this.moveBall(this);
  }

  moveBall(ball) {
    this.checkForOutOfBounds(ball);
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
  }

    checkForOutOfBounds(ball) {
      if (ball.y + ball.height > this.BreakoutGame.gameHeight) {
          this.BreakoutGame.lose();
        }
    if (ball.x < 0 || ball.x + ball.width > this.BreakoutGame.gameWidth) {
      ball.velocityX = -ball.velocityX;
    }
    if (ball.y < 0 || this.topCollision(ball, this.BreakoutGame.player)) {
      ball.velocityY = -ball.velocityY;
    }
  }

  detectCollision(a, b) {
    return (
      a.x < b.x + b.width && 
      a.x + a.width > b.x && 
      a.y < b.y + b.height && 
      a.y + a.height > b.y
    ); 
  }

  topCollision(ball, block) {
    //a is above b (ball is above block)
    return this.detectCollision(ball, block) && ball.y + ball.height >= block.y;
  }

  bottomCollision(ball, block) {
    //a is above b (ball is below block)
    return this.detectCollision(ball, block) && block.y + block.height >= ball.y;
  }

  leftCollision(ball, block) {
    //a is left of b (ball is left of block)
    return this.detectCollision(ball, block) && ball.x + ball.width >= block.x;
  }

  rightCollision(ball, block) {
    //a is right of b (ball is right of block)
    return this.detectCollision(ball, block) && block.x + block.width >= ball.x;
  }
}

export default Ball;
