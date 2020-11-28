// Initializing Events:

// Button Events:
const restart = document.querySelector(".pos-restart");
const Hold = document.querySelector(".pos-hold");
const Roll = document.querySelector(".pos-roll");

//Current Score:
let currScore0 = document.querySelector(".current--score0");
let currScore1 = document.querySelector(".current--score1");

//Global Score:
let globScore0 = Number(document.querySelector(".global--score0").textContent);
let globScore1 = Number(document.querySelector(".global--score1").textContent);

//Dummy variable or 0 initializing variable:
let totScore = 0;
let active_player = 0;

//Function for the recurring rolling dice:
const recuRoll = function () {
  totScore = 0;
  document.querySelector(`.current--score${active_player}`).textContent = 0;
  active_player = active_player === 0 ? 1 : 0;
  document.querySelector(".box1").classList.toggle("player--active");
  document.querySelector(".box2").classList.toggle("player--active");
};

// Function for closure Resetting values

const reset = function () {
  document.querySelector(".global--score0").textContent = 0;
  document.querySelector(".global--score1").textContent = 0;
  document.querySelector(".current--score0").textContent = 0;
  document.querySelector(".current--score1").textContent = 0;
  document.querySelector(".box1").classList.add("player--active");
  document.querySelector(".box2").classList.remove("player--active");
  totScore = 0;
  active_player = 0;
  globScore0 = 0;
  globScore1 = 0;
};

Roll.addEventListener("click", function () {
  //Random generation of Numbers
  const diceRoll = Math.trunc(Math.random() * 6 + 1);
  document
    .querySelector(".dice")
    .setAttribute("src", `images/dice-${diceRoll}.png`);

  // Additional of value to current score
  totScore += diceRoll;

  if (diceRoll != 1) {
    document.querySelector(
      `.current--score${active_player}`
    ).textContent = totScore;
  } else {
    document.querySelector(`.global--score${active_player}`).textContent = 0;

    active_player === 0 ? (globScore0 = 0) : (globScore1 = 0);

    recuRoll();
  }
});

Hold.addEventListener("click", function () {
  console.log(Number(document.querySelector(".global--score0").textContent));
  console.log(Number(document.querySelector(".global--score1").textContent));

  active_player === 0
    ? (document.querySelector(`.global--score${active_player}`).textContent =
        totScore + globScore0)
    : (globScore1 = document.querySelector(
        `.global--score${active_player}`
      ).textContent = totScore + globScore1);

  //   Winner Announcement:

  if (Number(document.querySelector(".global--score0").textContent) >= 100) {
    reset();
    alert("Player 1 Wins");
  } else if (
    Number(document.querySelector(".global--score1").textContent) >= 100
  ) {
    reset();
    alert("Player 2 Wins");
  }

  active_player === 0
    ? (globScore0 = Number(
        document.querySelector(`.global--score${active_player}`).textContent
      ))
    : (globScore1 = Number(
        document.querySelector(`.global--score${active_player}`).textContent
      ));
  recuRoll();
});

restart.addEventListener("click", function () {
  reset();
});
