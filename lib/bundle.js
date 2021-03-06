/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Letter {
  constructor(char) {
    this.char = char
    this.x = (Math.random() * 10) + 100;
    this.y = (Math.random() * 3) + 90;
    this.velX = (Math.random() * 1);
    this.velY = 1;
    this.rotate = 0;
    this.posDir = 1;
    this.rotateDir = 1;
  }

  move(timeDelta) {
    const velocityScale = timeDelta / Letter.NORMAL_FRAME_TIME_DELTA;
    const offsetX = this.velX * velocityScale;
    const offsetY = this.velY * velocityScale;


    this.x += (this.posDir * offsetX);

    this.rotate += (this.rotateDir * 0.005);

    if (this.rotate > .1 || this.rotate < -.1) {
      this.rotateDir = (-1 * this.rotateDir);
    }

    if (this.x > 110 || this.y > 92 || this.x < 90 || this.y < 88) {
      this.posDir = (-1 * this.posDir);
    }
  }

}

Letter.NORMAL_FRAME_TIME_DELTA = 1000/60;

Letter.FREQ = [
  "A", "A", "A",
  "B", "B",
  "C", "C",
  "D", "D", "D", "D",
  "E", "E", "E",
  "F", "F",
  "G", "G", "G",
  "H", "H",
  "I", "I", "I",
  "J",
  "K",
  "L", "L", "L", "L",
  "M", "M", "M",
  "N", "N", "N", "N", "N",
  "O", "O", "O",
  "P", "P",
  "Q",
  "R", "R", "R", "R", "R",
  "S", "S", "S", "S",
  "T", "T", "T", "T", "T",
  "U",
  "V", "V",
  "W",
  "X",
  "Y",
  "Z"
];

Letter.VOWELS = ["A", "E", "I", "O", "U"];

module.exports = Letter;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Letter = __webpack_require__(0);

class Bowl {
  constructor() {
    // make sure there's at least one vowel
    this.letters = [new Letter(Letter.VOWELS[Math.floor(Math.random() * Letter.VOWELS.length)])];
    // add the rest of the letters
    for (let i = 0; i < 5; i++) {
      this.letters.push(new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]))
    }
  }

  chars() {
    const chars = this.letters.map ( letter => {
      return letter.char;
    });

    return chars;
  }

  fill() {
    this.countVowels();

    const newLetters = this.letters.map( letter => {
      if (letter === "") {
        if (this.vowels < 2) {
          this.vowels += 1;
          return new Letter(Letter.VOWELS[Math.floor(Math.random() * Letter.VOWELS.length)]);
        } else {
          return new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]);
        }
      } else {
        return letter;
      }
    });

    this.letters = newLetters;
  }

  countVowels() {
    this.vowels = 0;

    this.letters.forEach( letter => {
      if (Letter.VOWELS.indexOf(letter.char) > -1) {
        this.vowels += 1;
      }
    });
  }

}

module.exports = Bowl;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Trie {
  constructor() {
    this.root = new TrieNode("");
  }

  insert(word) {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i ++) {
      let char = word[i];
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else {
        let newChild = new TrieNode(char);
        currentNode.addChild(newChild);
        currentNode = newChild;
      }
    }

    currentNode.isValidWord = true;
  }

  isValidWord(word) {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i ++) {
      let char = word[i];
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else {
        return false;
      }
    }

    return currentNode.isValidWord;
  }

}

class TrieNode {
  constructor(char) {
    this.char = char;
    this.children = {};
    this.isValidWord = false;
  }

  addChild(node) {
    this.children[node.char] = node;
  }

}

module.exports = Trie;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Word {
  constructor() {
    this.word = "";
  }

}

Word.KEYS = {
  65: "A",
  66: "B",
  67: "C",
  68: "D",
  69: "E",
  70: "F",
  71: "G",
  72: "H",
  73: "I",
  74: "J",
  75: "K",
  76: "L",
  77: "M",
  78: "N",
  79: "O",
  80: "P",
  81: "Q",
  82: "R",
  83: "S",
  84: "T",
  85: "U",
  86: "V",
  87: "W",
  88: "X",
  89: "Y",
  90: "Z"
}

Word.SCORE = {
  1: 1,
  2: 2,
  3: 3,
  4: 5,
  5: 7,
  6: 12
}

module.exports = Word;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Bowl = __webpack_require__(1);
const Word = __webpack_require__(3);
const Letter = __webpack_require__(0);
const Trie = __webpack_require__(2);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map