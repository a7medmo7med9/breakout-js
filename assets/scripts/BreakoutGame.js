import Player from "./Player.js";

const BreakoutGameProps = {
  gameWidth: 500,
  gameHeight: 500,
};

const gameSettings = {
  player: {
    playerWidth: 80,
    playerHeight: 10,
    playerVelocityX: 10,
  },
};

class BreakoutGame {
  constructor(props = BreakoutGameProps) {
    this.gameHeight = props.gameWidth;
    this.gameWidth = props.gameHeight;

    // create the player
    this.player = new Player({
      BreakoutGame: this,
      x: props.gameWidth / 2 - gameSettings.player.playerWidth / 2,
      y: props.gameHeight - gameSettings.player.playerHeight - 5,
      width: gameSettings.player.playerWidth,
      height: gameSettings.player.playerHeight,
      velocityX: gameSettings.player.playerVelocityX,
    });

    this.initialize();
  }

  initialize() {
    // drow board
    this.board = document.getElementById("board");
    this.board.width = this.gameWidth;
    this.board.height = this.gameHeight;
    this.context = this.board.getContext("2d");

    // update the game each frame
    this.updateFrame();

    // setup event listeners
    document.addEventListener("keydown", (e) => this.eventsHandler(e));
  }

  eventsHandler(e) {
    this.player.eventTrigger(e);
  }

  updateFrame() {
    requestAnimationFrame(() => this.updateFrame());

    // clear canvas
    this.context.clearRect(0, 0, this.board.width, this.board.height);

    // drow player
    this.player.onFrameUpdate();
  }

  outOfBounds(xPosation) {
    return xPosation < 0 || xPosation + this.player.width > this.gameWidth;
  }
}

export default BreakoutGame;
