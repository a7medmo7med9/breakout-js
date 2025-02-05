import BreakoutGame from "./BreakoutGame.js";

// start the game
const game = new BreakoutGame({ gameHeight: 500, gameWidth: 800 });

document.querySelector("#startTheGame").addEventListener("click", () => {
  document.querySelector(".menu").classList.add("hide");
  document.querySelector(".game").classList.remove("hide");
  game.level = document.querySelector("#level").value;
  game.start();
  game.ball.velocityX
  // you can update the score like this
  // game.updateScore(10);

  // you can use stop to stop the game if player lose
  // game.stop();
});
document.getElementById('newTheGame').addEventListener('click',function () {
  document.querySelector(".menu").classList.remove("hide");
  document.querySelector(".game").classList.add("hide");
  game.lives=4;
  game.nextLevel=1;
  game.block.createBlocks(game.nextLevel);
        
})

function myFunction(x) {
  if (x.matches) { 
    document.querySelector('.container').classList.add('hide');
    document.querySelector('.mq').classList.replace('hide','flex');
  } else {
    document.querySelector('.container').classList.remove('hide');
    document.querySelector('.mq').classList.replace('flex','hide');
  }
}

var x = window.matchMedia("(max-width: 1024px)")

myFunction(x);

x.addEventListener("change", function() {
  myFunction(x);
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
