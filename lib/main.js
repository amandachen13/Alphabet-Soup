// const View = require ('./game-view');
//
// $( () => {
//   const root = $('.game');
//   new View(root);
// });

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
  // wordCtx.fillStyle = "black";
  wordCtx.textAlign = "center";
  wordCtx.globalCompositeOperation = "copy";

  const scoreCanvas = document.getElementById('scoreCanvas');
  const scoreCtx = scoreCanvas.getContext('2d');
  scoreCtx.font = "40px Sniglet";
  scoreCtx.textAlign = "center";
  scoreCtx.globalCompositeOperation = "copy";

  const game = {
    bowl: new Bowl(),
    word: new Word(),
    wordCtx,
    scoreCtx,
    score: 0,
    validWords: [],
    currentTime: "1:00",
    timerCtx,
    render: function() {
      this.wordCtx.fillText(game.word.word, wordCanvas.width/2, wordCanvas.height/2 + 20);
      this.scoreCtx.fillText(game.score, scoreCanvas.width/2, scoreCanvas.height/2 + 20);
      this.timerCtx.fillText(game.currentTime, timerCanvas.width/2, timerCanvas.height/2 + 20);
      // game.bowl.fill();
      game.bowl.letters.forEach( (letter, idx) => {
        const bowlCanvas = document.getElementById(idx);
        const bowlCtx = bowlCanvas.getContext('2d');
        bowlCtx.font = "48px Sniglet";
        bowlCtx.fillStyle = "#e8c264";
        bowlCtx.textAlign = "center";
        // bowlCtx.shadowColor = "black";
        // bowlCtx.shadowOffsetX = 1;
        // bowlCtx.shadowOffsetY = 1;
        // bowlCtx.shadowBlur = 10;
        bowlCtx.globalCompositeOperation = "copy";
        // generate new x & y
        if (! (letter === "")) {
          letter.move(1);
          bowlCtx.rotate(letter.rotate * Math.PI / 180);
          bowlCtx.fillText(letter.char, letter.x, letter.y);
        } else {
          bowlCtx.setTransform(1,0,0,1,0,0);
          bowlCtx.fillText("", 100, 90);
          // rotate back to normal if ""
        }
      });
    }
  }

  function step() {
    if (game.currentTime === "0:00") {
      timerCtx.fillText(game.currentTime, timerCanvas.width/2, timerCanvas.height/2 + 20);
      wordCtx.fillText(game.word.word, wordCanvas.width/2, wordCanvas.height/2 + 20);
      game.bowl.letters.forEach( (letter, idx) => {
        const bowlCanvas = document.getElementById(idx);
        const bowlCtx = bowlCanvas.getContext('2d');
        bowlCtx.fillText("", 100, 90);
      });
      // PUT END GAME MODAL LOGIC HERE
      // 1. Show Modal with all valid response words
      // 2. Show Play Again button ... on click closes Modal,
      //    hides timer, shows start button, reset game word,
      //    new bowl, reset score, ??
      return;
    }
    game.render()
    requestAnimationFrame(step)
  }

  function startTimer(duration, game) {
    let timer = duration;
    setInterval( () => {
      let minutes = parseInt(timer / 60, 10);
      let seconds = parseInt(timer % 60, 10);

      seconds = seconds < 10 ? "0" + seconds : seconds;

      game.currentTime = minutes + ":" + seconds;

      if (--timer < 0) {
        game.currentTime = "0:00";
      }
    }, 1000);
  }

  const start = document.getElementById('start');
  start.addEventListener("click", (e) => {
    e.preventDefault();
    start.style.display = "none";
    jQuery.get('https://raw.githubusercontent.com/amandachen13/Alphabet-Soup/master/assets/dictionary.txt',
      (data) => {
        createDictionary(data);
        document.getElementById('timerCanvas').style.display = "block";
        step();
        startTimer(60, game);
      }
    );
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
    if(Word.KEYS[e.keyCode]) {
      if (game.word.word.length < 6) {
        let idx = (game.bowl.chars().indexOf(Word.KEYS[e.keyCode]));
        if (idx > -1) {
          game.bowl.letters[idx] = "";
          game.word.word += Word.KEYS[e.keyCode];
        }
      }
    }

    switch (e.keyCode) {
      case 8:
        let last = game.word.word.substr(-1);
        // PUT LAST LETTER BACK INTO BOWL
        let emptyIdx = game.bowl.letters.indexOf("");
        game.bowl.letters[emptyIdx] = new Letter(last);
        // Letter construct with char
        game.word.word = game.word.word.slice(0, -1);
        break
      case 13:
        if (game.dictionary.isValidWord(game.word.word)) {
          game.validWords.push(game.word.word);
          game.score += Word.SCORE[game.word.word.length];
          game.word.word = "";
          game.bowl.fill();
        } else {
          for(let i = 0; i < game.word.word.length; i++) {
            let emptyIdx = game.bowl.letters.indexOf("");
            game.bowl.letters[emptyIdx] = new Letter(game.word.word[i]);
            // construct new letter
          }
          game.word.word = "";
        }
        break
      case 32:
        game.bowl = new Bowl();
        // MAYBE PENALTY IF PRESSED
        break
      default:
        console.log('this is not the key you are looking for');
    }
  })


  // step()
})
