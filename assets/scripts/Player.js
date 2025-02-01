import Entity, { entityProps } from "./Entity.js";

const playerProps = {
  ...entityProps,
  // extra properties for player
  velocityX: 0,
};

class Player extends Entity {
  constructor(data = playerProps) {
    super({ ...data });

    this.velocityX = data.velocityX;
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

  onFrameUpdate() {
    this.BreakoutGame.context.fillStyle = "lightgreen";
    this.BreakoutGame.context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Player;
