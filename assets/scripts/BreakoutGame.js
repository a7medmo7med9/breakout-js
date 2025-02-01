import Player, { playerProps } from "./Player.js";
import Score, { scoreProps } from "./Score.js";

const BreakoutGameProps = {
  gameWidth: 500,
  gameHeight: 500,
  player: playerProps,
  score: scoreProps,
};

const gameSettings = {
  player: {
    playerWidth: 80,
    playerHeight: 10,
    playerVelocityX: 10,
  },
};

const levels = Object.freeze({
  easy: "easy",
  medium: "medium",
  hard: "hard",
});

const gameState = Object.freeze({
  ready: "ready",
  started: "started",
  stopped: "stopped",
});

class BreakoutGame {
  level = levels.easy;
  gameState = gameState.ready;

  constructor(_PROPS_ = BreakoutGameProps) {
    const props = { ...BreakoutGameProps, ..._PROPS_ };
    this.gameWidth = props.gameWidth;
    this.gameHeight = props.gameHeight;

    // create score
    this.score = new Score({ ...props.score, BreakoutGame: this, x: 10, y: 25 });

    // create the player
    this.player = new Player({
      ...props.player,
      BreakoutGame: this,
      x: props.gameWidth / 2 - gameSettings.player.playerWidth / 2,
      y: props.gameHeight - gameSettings.player.playerHeight - 5,
      width: gameSettings.player.playerWidth,
      height: gameSettings.player.playerHeight,
      velocityX: gameSettings.player.playerVelocityX,
    });

    // stop the game from start automatically
    // this.initialize();
  }

  start() {
    this.gameState = gameState.started;

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

  stop() {
    this.gameState = gameState.stopped;

    // remove all event listeners
    document.removeEventListener("keydown", (e) => this.eventsHandler(e));
    // reset score to 0
    this.score.score = 0;
  }

  eventsHandler(e) {
    this.player.eventTrigger(e);
  }

  updateFrame() {
    // stop requestAnimationFrame loop if game is stopped
    if (this.gameState === gameState.stopped) return;

    requestAnimationFrame(() => this.updateFrame());

    // clear canvas
    this.context.clearRect(0, 0, this.board.width, this.board.height);

    // drow player
    this.player.onFrameUpdate();

    // drow score
    this.score.onFrameUpdate();
  }

  updateScore(score) {
    this.score.score += score;
  }

  outOfBounds(xPosation) {
    return xPosation < 0 || xPosation + this.player.width > this.gameWidth;
  }
}

export default BreakoutGame;
