import BreakoutGame from "./BreakoutGame.js";

// start the game
const game = new BreakoutGame();

document.querySelector("#startTheGame").addEventListener("click", () => {
  document.querySelector(".menu").classList.add("hide");
  document.querySelector(".game").classList.remove("hide");
  game.level = document.querySelector("#level").value;
  game.start();

  // you can update the score like this
  game.updateScore(10);
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
