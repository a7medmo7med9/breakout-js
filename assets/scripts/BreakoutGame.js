import Player, { playerProps } from "./Player.js";
import Score, { scoreProps } from "./Score.js";
import Ball, { BallProps } from "./Ball.js";
import Block, { BlockProps } from "./Blocks.js";

const BreakoutGameProps = {
  gameWidth: 800,
  gameHeight: 500,
  player: playerProps,
  score: scoreProps,
  ball: BallProps,
  block: BlockProps,
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
  lives;
  constructor(_PROPS_ = BreakoutGameProps) {
    const props = { ...BreakoutGameProps, ..._PROPS_ };
    this.gameWidth = props.gameWidth;
    this.gameHeight = props.gameHeight;
    this.lives = 3;
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

    // create the ball
    let velX;
    let velY;
    if (this.level == levels.easy) {
      velX = 1;
      velY = 1;
    } else if (this.level === levels.medium) {
      velX = 2;
      velY = 1;
    } else if (this.level === levels.hard) {
      velX = 3;
      velY = 2;
    }
    this.ball = new Ball({
      ...props.ball,
      BreakoutGame: this,
      x: props.gameWidth / 2 - 5,
      y: props.gameHeight / 2 - 5,
      width: 10,
      height: 10,
      velocityX: velX,
      velocityY: velY,
    });

    //blocks
    this.block = new Block({
      ...props.ball,
      BreakoutGame: this,
      x: 25,
      y: 35,
      width: 60,
      height: 15,
    });

    this.block.createBlocks(1); // 1 for level

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
    window.addEventListener("resize", (e) => this.eventsHandler(e));
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
    this.resizeGame(e);
  }

  resizeGame(e) {
    console.log("HHH");

    this.gameHeight = document.documentElement.clientHeight - 15;
    this.gameWidth = document.documentElement.clientWidth - 15;
    // this.board.width = this.gameWidth;
    // this.board.height = this.gameHeight;

    this.board.width = this.gameWidth;
    this.board.height = this.gameHeight;
  }

  updateFrame() {
    // stop requestAnimationFrame loop if game is stopped
    if (this.gameState === gameState.stopped) return;

    requestAnimationFrame(() => this.updateFrame());

    // clear canvas
    this.context.clearRect(0, 0, this.board.width, this.board.height);

    // drow player
    this.player.onFrameUpdate();

    // draw ball
    this.ball.onFrameUpdate();

    // drow score
    this.score.onFrameUpdate();

    // draw blocks
    this.block.onFrameUpdate();

    this.context.font = "20px sans-serif";
    this.context.fillStyle = "red";
    this.context.fillText("Lives: " + this.lives, 720, 25);
  }

  updateScore(score) {
    this.score.score += score;
  }

  outOfBounds(xPosation) {
    return xPosation < 0 || xPosation + this.player.width > this.gameWidth;
  }
  lose() {
    this.stop();
    alert("You lose");
  }
}

export default BreakoutGame;
