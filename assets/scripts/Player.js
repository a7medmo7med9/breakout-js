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
    this.calcPlayerWidth();
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

  calcPlayerWidth() {
    let value = remainingPercentage(this.BreakoutGame.gameWidth, 15).deducted;
    this.width = value < 150 ? 150 : value;
  }

  onResizing() {
    this.calcPlayerWidth();
  }

  onFrameUpdate() {
    this.BreakoutGame.context.fillStyle = this.color;
    this.BreakoutGame.context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Player;
