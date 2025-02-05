import Entity, { entityProps } from "./Entity.js";
import { remainingPercentage } from "./utils.js";

export const BallProps = {
  ...entityProps,
  // extra properties for ball
  velocityX: 0,
  velocityY: 0,
  radius : 5,
};

class Ball extends Entity {
  constructor(PROPS = BallProps) {
    const props = { ...BallProps, ...PROPS };
    super({ ...props });
    this.color = "white";
    this.velocityX = props.velocityX;
    this.velocityY = props.velocityY;
    this.radius = props.radius;
  }

  onFrameUpdate() {
    this.BreakoutGame.context.fillStyle = this.color;
    this.BreakoutGame.context.beginPath();
    this.BreakoutGame.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.BreakoutGame.context.fill();
    this.moveBall(this);
  }

  moveBall(ball) {
    this.checkForOutOfBounds(ball);
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
  }

  checkForOutOfBounds(ball) {
    if (ball.y + ball.height > this.BreakoutGame.gameHeight) {
      this.BreakoutGame.lives--;
      document.getElementById('lives').innerText = " ♥︎ : " + this.BreakoutGame.lives;
      if (this.BreakoutGame.lives === 0) {
        const soundLose = new Audio('/assets/sound/you-lose-game-sound-230514.mp3');
        soundLose.play();
        this.BreakoutGame.lose();
        return;
      }
      ball.x = this.BreakoutGame.gameWidth / 2 - 5;
      ball.y = this.BreakoutGame.gameHeight / 2 - 5;

    }
    if (ball.y < 0 || this.topCollision(ball, this.BreakoutGame.player)) {
      ball.velocityY = -ball.velocityY;
      if (ball.y - ball.radius <= 0 ) ball.y = ball.radius;
      if (this.topCollision(ball, this.BreakoutGame.player)) {
        ball.y -= Math.abs(ball.velocityY);
      }
    }

    else if (ball.x < 0 || ball.x + ball.width > this.BreakoutGame.gameWidth || this.rightCollision(ball, this.BreakoutGame.player) || this.leftCollision(ball, this.BreakoutGame.player)) {
      ball.velocityX = -ball.velocityX;
      if (ball.x - ball.radius <= 0 ) ball.x = ball.radius;
      else if (ball.x + ball.radius  > this.BreakoutGame.gameWidth ) ball.x = this.BreakoutGame.gameWidth - ball.radius;
    }
  }


  detectCollision(a, b) {
    return (
      a.x - a.radius < b.x + b.width && 
      a.x + a.radius > b.x && 
      a.y - a.radius < b.y + b.height && 
      a.y + a.radius > b.y
    );
  }

  topCollision(ball, block) {

    return this.detectCollision(ball, block) && ball.y + ball.radius >= block.y && ball.x - ball.radius >= block.x && ball.x + ball.radius <= block.x + block.width;
  }

  bottomCollision(ball, block) {
    //a is above b (ball is below block)
    return this.detectCollision(ball, block) && block.y + block.height >= ball.y -ball.radius;
  }

  leftCollision(ball, block) {
    //a is left of b (ball is left of block)

    return this.detectCollision(ball, block) && ball.x + ball.radius >= block.x;
  }

  rightCollision(ball, block) {
    //a is right of b (ball is right of block)
    return this.detectCollision(ball, block) && block.x + block.width >= ball.x - ball.radius;
  }

}

export default Ball;