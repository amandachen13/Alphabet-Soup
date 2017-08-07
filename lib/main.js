const Bowl = require('./bowl');
const Word = require('./word');
const Letter = require('./letter');
const Trie = require("./trie.js");

document.addEventListener("DOMContentLoaded", () => {
  const timerCanvas = document.getElementById('timerCanvas');
  const timerCtx = timerCanvas.getContext('2d');
  timerCtx.font = "40px Sniglet";
  timerCtx.textAlign = "center";
  timerCtx.globalCompositeOperation = "copy";

  const wordCanvas = document.getElementById('wordCanvas');
  const wordCtx = wordCanvas.getContext('2d');
  wordCtx.font = "48px Sniglet";
  wordCtx.fillStyle = "#e8c264";
  wordCtx.textAlign = "center";
  wordCtx.globalCompositeOperation = "copy";

  const steamCanvas = document.getElementById('steamCanvas');
  const steamCtx = steamCanvas.getContext('2d');
  steamCtx.font = "56px Sniglet";

  var gradient = steamCtx.createLinearGradient(0, 100, 0, 0);
  gradient.addColorStop(0, "black");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  steamCtx.fillStyle = gradient;
  steamCtx.textAlign = "center";
  steamCtx.globalCompositeOperation = "copy";

  const multiplierCanvas = document.getElementById('multiplierCanvas');
  const multiplierCtx = multiplierCanvas.getContext('2d');
  multiplierCtx.font = "36px Sniglet";

  var gradient = multiplierCtx.createLinearGradient(0, 100, 0, 0);
  gradient.addColorStop(0, "black");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  multiplierCtx.fillStyle = gradient;
  multiplierCtx.textAlign = "center";
  multiplierCtx.globalCompositeOperation = "copy";

  const scoreCanvas = document.getElementById('scoreCanvas');
  const scoreCtx = scoreCanvas.getContext('2d');
  scoreCtx.font = "40px Sniglet";
  scoreCtx.textAlign = "center";
  scoreCtx.globalCompositeOperation = "copy";

  const timerSound = new Audio("./assets/sounds/timer.wav");
  timerSound.volume = 0;

  const game = {
    bowl: new Bowl(),
    word: new Word(),
    wordCtx,
    scoreCtx,
    steamCtx,
    multiplierCtx,
    score: 0,
    float: -21,
    currentTime: "1:00",
    streak: "",
    timerCtx,
    multiplier: 1,
    render: function() {
      this.wordCtx.fillText(game.word.word, wordCanvas.width/2, wordCanvas.height/2 + 20);
      this.scoreCtx.fillText(game.score, scoreCanvas.width/2, scoreCanvas.height/2 + 20);
      this.timerCtx.fillText(game.currentTime, timerCanvas.width/2, timerCanvas.height/2 + 20);
      if (game.float > -20 && game.feedback === "TRY AGAIN") {
        this.steamCtx.fillText(game.feedback, steamCanvas.width/2, steamCanvas.height/2 + game.float);
        game.float--;
      } else if (game.float > -20) {
        this.steamCtx.fillText(game.feedback, steamCanvas.width/2, steamCanvas.height/2 + game.float);
        this.multiplierCtx.fillText(`+${game.adder}`, steamCanvas.width/2, steamCanvas.height/2 + 15 + game.float);
        debugger
        game.float--;
      } else {
        this.steamCtx.fillText("", steamCanvas.width/2, steamCanvas.height/2 + game.float);
        this.multiplierCtx.fillText("", steamCanvas.width/2, steamCanvas.height/2 + 20 + game.float);
      }

      game.bowl.letters.forEach( (letter, idx) => {
        const bowlCanvas = document.getElementById(idx);
        const bowlCtx = bowlCanvas.getContext('2d');
        bowlCtx.font = "48px Sniglet";
        bowlCtx.fillStyle = "#e8c264";
        bowlCtx.textAlign = "center";
        bowlCtx.globalCompositeOperation = "copy";
        if (! (letter === "")) {
          letter.move(1);
          bowlCtx.rotate(letter.rotate * Math.PI / 180);
          bowlCtx.fillText(letter.char, letter.x, letter.y);
        } else {
          bowlCtx.setTransform(1,0,0,1,0,0);
          bowlCtx.fillText("", 100, 90);
        }
      });
    }
  }

  const endGame = document.getElementById('end-game-modal');
  function step() {
    if (game.currentTime === "0:00") {
      game.bowl.letters.forEach( (letter, idx) => {
        const bowlCanvas = document.getElementById(idx);
        const bowlCtx = bowlCanvas.getContext('2d');
      });

      timerSound.play();

      timerCtx.fillText(game.currentTime, timerCanvas.width/2, timerCanvas.height/2 + 20);
      clearInterval(game.interval);
      wordCtx.fillText("", wordCanvas.width/2, wordCanvas.height/2 + 20);
      game.bowl.letters.forEach( (letter, idx) => {
        const bowlCanvas = document.getElementById(idx);
        const bowlCtx = bowlCanvas.getContext('2d');
        bowlCtx.fillText("", 100, 90);
        game.bowl.letters[idx] = "";
      });
      game.word = new Word();
      // game.bowl.fill();
      game.float = -21;
      game.feedback = "";
      game.multiplier = 1;
      game.streak = "";
      gameView.style.display = "none";
      endGame.style.display = "block";
      submitScore.style.visibility = "visible";
      username.style.visibility = "visible";
      $('.end-score').text(`Your Score: ${game.score}`);

      var scoresTable = firebase.database().ref("scores");
      scoresTable.orderByChild("score").limitToLast(10).on('value', (snapshot, highscores) => {
        $(".usernames li").remove();
        $(".scores li").remove();
        highscores = [];
        snapshot.forEach(childSnapshot => {
          highscores.push((childSnapshot.val()));
        });
        highscores.reverse();
        for (let i = 0; i < highscores.length; i++) {
          let $li = $('<li>');
          $(".usernames").append($li.text(`${highscores[i].username}`));
        }
        for (let i = 0; i < highscores.length; i++) {
          let $li = $('<li>');
          $(".scores").append($li.text(`${highscores[i].score}`));
        }

      });
      return;
    }
    game.render()
    requestAnimationFrame(step)
  }

  function startTimer(duration, game) {
    let timer = duration;
    game.interval = setInterval( () => {
      if (--timer < 0) {
        game.currentTime = "0:00";
        // clearInterval(game.interval);
      } else {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        game.currentTime = minutes + ":" + seconds;
      }

    }, 1000);
  }

  function handleMute() {
    if(timerSound.volume) {
      $(".timer-sound").removeClass('fa-volume-up');
      $(".timer-sound").addClass('fa-volume-off');
      timerSound.volume = 0;
    } else {
      timerSound.volume = 0.1;
      $(".timer-sound").removeClass('fa-volume-off');
      $(".timer-sound").addClass('fa-volume-up');
    }
  }
  $(".timer-sound").on("click", handleMute);

  const start = document.getElementById('start');
  const scoreWords = document.getElementById('score-words');
  start.addEventListener("click", (e) => {
    e.preventDefault();
    game.username = $(".username").val();
    instructions.style.display = "none";
    gameView.style.display = "block";
    scoreWords.style.display = "block";
    jQuery.get('https://raw.githubusercontent.com/amandachen13/Alphabet-Soup/master/assets/dictionary.txt',
      (data) => {
        createDictionary(data);
        document.getElementById('timerCanvas').style.display = "block";
        startTimer(60, game);
        step();
      }
    );
  });

  const gameView = document.getElementById('game-view');
  const instructions = document.getElementById('instructions-modal');

  const playAgain = document.getElementById('play-again');
  playAgain.addEventListener("click", (e) => {
    e.preventDefault();
    game.bowl.fill();
    endGame.style.display = "none";
    $(".words-found li").remove();
    game.score = 0;
    scoreCtx.fillText(game.score, scoreCanvas.width/2, scoreCanvas.height/2 + 20);
    game.currentTime = "1:00";
    start.style.display = "block";
    gameView.style.display = "block";
    startTimer(60, game);
    step();
  });

  function createDictionary(data) {
    const dictionaryWords = data.split("\n");
    dictionaryWords.pop();
    game.dictionary = new Trie();
    dictionaryWords.forEach( word => {
      game.dictionary.insert(word);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (Word.KEYS[e.keyCode]) {
      if (game.word.word.length < 6) {
        let idx = (game.bowl.chars().indexOf(Word.KEYS[e.keyCode]));
        if (idx > -1) {
          game.bowl.letters[idx] = "";
          game.word.word += Word.KEYS[e.keyCode];
        }
      }
      return;
    }

    switch (e.keyCode) {
      case 8:  // backspace
        if (game.word.word.length === 0) {
          break;
        }
        let last = game.word.word.substr(-1);
        let emptyIdx = game.bowl.letters.indexOf("");
        game.bowl.letters[emptyIdx] = new Letter(last);
        game.word.word = game.word.word.slice(0, -1);
        break;
      case 13:  // enter
        if (game.dictionary.isValidWord(game.word.word)) {
          game.float = 50;
          const feedback = ["GREAT", "AWESOME", "NICE", "SUPER"];
          game.feedback = feedback[Math.floor(Math.random() * 4)];
          let $li = $('<li>');
          $(".words-found").prepend($li.text(`${game.word.word}`));
          game.adder = (Word.SCORE[game.word.word.length] * game.multiplier);
          game.score += (Word.SCORE[game.word.word.length] * game.multiplier);
          if (game.multiplier < 6) {
            game.multiplier += 1;
            game.streak = `Streak: ${game.multiplier}`;
          }
          game.word.word = "";
          game.bowl.fill();
        } else {
          game.multiplier = 1;
          game.streak = "";
          game.float = 50;
          game.feedback = "TRY AGAIN";
          for(let i = 0; i < game.word.word.length; i++) {
            let emptyIdx = game.bowl.letters.indexOf("");
            if (emptyIdx === -1) {
              throw new Error("Couldn't put back letter from failed word");
            }
            game.bowl.letters[emptyIdx] = new Letter(game.word.word[i]);
          }
          game.word.word = "";
        }
        break;
      case 32:  // space
        game.multiplier = 1;
        game.streak = "";
        game.bowl.letters.forEach( (letter, idx) => {
          game.bowl.letters[idx] = "";
        });
        game.render();
        game.bowl.fill();
        game.word.word = "";
        break;
      default:
        console.log('this is not the key you are looking for');
    }
  })

  const username = document.getElementById('username');
  const submitScore = document.getElementById('submit');
  submitScore.addEventListener("click", (e) => {
    e.preventDefault();

    let newScore = firebase.database().ref("scores").push();
    window.newScore = newScore;
    game.username = $("#username").val();
    if (game.username) {
      newScore.set({username: game.username, score: game.score});
    } else {
      newScore.set({username: "User", score: game.score});
    }

    var scoresTable = firebase.database().ref("scores");
    scoresTable.orderByChild("score").limitToLast(10).on('value', (snapshot, highscores) => {
      $(".usernames li").remove();
      $(".scores li").remove();
      highscores = [];
      snapshot.forEach(childSnapshot => {
        highscores.push((childSnapshot.val()));
      });
      highscores.reverse();
      for (let i = 0; i < highscores.length; i++) {
        let $li = $('<li>');
        $(".usernames").append($li.text(`${highscores[i].username}`));
      }
      for (let i = 0; i < highscores.length; i++) {
        let $li = $('<li>');
        $(".scores").append($li.text(`${highscores[i].score}`));
      }
    });

    submitScore.style.visibility = "hidden";
    username.style.visibility = "hidden";

  });

})
