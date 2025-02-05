import Entity, { entityProps } from "./Entity.js";
import { remainingPercentage } from "./utils.js";

export const playerProps = {
  ...entityProps,
  // extra properties for player
  velocityX: 0,
};

class Player extends Entity {
  constructor(_PROPS_ = playerProps) {
    const props = { ...playerProps, ..._PROPS_ };
    super({ ...props });

    this.velocityX = props.velocityX;
  }

  eventTrigger(e) {
    this.movement(e);
  }
  movement(e) {
    switch (e.code) {
      case "ArrowLeft":
        {
          let nextPlayerX = this.x - this.velocityX;
          if (!this.BreakoutGame.outOfBounds(nextPlayerX)) {
            this.x = nextPlayerX;
          }
        }
        break;
      case "ArrowRight":
        {
          let nextPlayerX = this.x + this.velocityX;
          if (!this.BreakoutGame.outOfBounds(nextPlayerX)) {
            this.x = nextPlayerX;
          }
        }
        break;
    }
  }

  mouseMoveHandler(e,bard) {
    let rect = bard.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    this.x = mouseX - this.width / 2;

    if (this.x < 0) this.x = 0;
    if (this.x + this.width > this.BreakoutGame.gameWidth)
      this.x = this.BreakoutGame.gameWidth - this.width;
  }

  onFrameUpdate() {
    this.BreakoutGame.context.fillStyle = this.color;
    this.BreakoutGame.context.beginPath();
    if (this.BreakoutGame.context.roundRect) {
      this.BreakoutGame.context.roundRect(this.x, this.y, this.width, this.height,20);
    } else {
      this.BreakoutGame.context.rect(this.x, this.y, this.width, this.height);
    }
    this.BreakoutGame.context.fill();
  }
}

export default Player;
