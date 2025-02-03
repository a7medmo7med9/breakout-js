import BreakoutGame from "./BreakoutGame.js";

// start the game
const game = new BreakoutGame({ gameHeight: document.documentElement.clientHeight - 15, gameWidth: document.documentElement.clientWidth - 15 });

document.querySelector("#startTheGame").addEventListener("click", () => {
  document.querySelector(".menu").classList.add("hide");
  document.querySelector(".game").classList.remove("hide");
  game.level = document.querySelector("#level").value;
  game.start();

  // you can update the score like this
  game.updateScore(10);

  // you can use stop to stop the game if player lose
  // game.stop();
});

// **************************
// start the game with custom props
// const game = new BreakoutGame({ gameWidth: 500, gameHeight: 500 });

// **************************
// start the game with custom props and custom player props
// const game = new BreakoutGame({ gameWidth: 500, gameHeight: 500, player: { color: "red",  } });

// **************************
// start the game then change the player color
// const game = new BreakoutGame();
// game.player.color = "blue";
