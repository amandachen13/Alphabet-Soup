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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// const View = require ('./game-view');
//
// $( () => {
//   const root = $('.game');
//   new View(root);
// });

const Bowl = __webpack_require__(1);
const Word = __webpack_require__(2);
const Letter = __webpack_require__(3);
const Trie = __webpack_require__(4);

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

  const steamCanvas = document.getElementById('steamCanvas');
  const steamCtx = steamCanvas.getContext('2d');
  steamCtx.font = "48px Sniglet";
  // steamCtx.shadowOffsetX = 1;
  // steamCtx.shadowOffsetY = 1;
  // steamCtx.shadowColor = "white";
  // steamCtx.shadowBlur = 10;
  var gradient = steamCtx.createLinearGradient(0, 100, 0, 0);
  gradient.addColorStop(0, "black");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0.5)");
  steamCtx.fillStyle = gradient;

  // steamCtx.fillStyle = "black";
  steamCtx.textAlign = "center";
  steamCtx.globalCompositeOperation = "copy";

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
    steamCtx,
    score: 0,
    // validWords: [],
    float: -21,
    currentTime: "1:00",
    timerCtx,
    render: function() {
      this.wordCtx.fillText(game.word.word, wordCanvas.width/2, wordCanvas.height/2 + 20);
      this.scoreCtx.fillText(game.score, scoreCanvas.width/2, scoreCanvas.height/2 + 20);
      this.timerCtx.fillText(game.currentTime, timerCanvas.width/2, timerCanvas.height/2 + 20);
      if (game.float > -20) {
        this.steamCtx.fillText(game.feedback, steamCanvas.width/2, steamCanvas.height/2 + game.float);
        game.float--;
      } else {
        this.steamCtx.fillText("", steamCanvas.width/2, steamCanvas.height/2 + game.float);
      }

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

  const endGame = document.getElementById('end-game-modal');
  function step() {
    if (game.currentTime === "0:00") {
      timerCtx.fillText(game.currentTime, timerCanvas.width/2, timerCanvas.height/2 + 20);
      clearInterval(game.interval);
      wordCtx.fillText("", wordCanvas.width/2, wordCanvas.height/2 + 20);
      game.bowl.letters.forEach( (letter, idx) => {
        const bowlCanvas = document.getElementById(idx);
        const bowlCtx = bowlCanvas.getContext('2d');
        bowlCtx.fillText("", 100, 90);
      });
      game.word = new Word();
      game.bowl = new Bowl();
      gameView.style.display = "none";
      endGame.style.display = "block";
      submitScore.style.visibility = "visible";
      username.style.visibility = "visible";
      $('.end-score').text(`Your Score: ${game.score}`);
      // PUT END GAME MODAL LOGIC HERE
      // 1. Show Modal with all valid response words
      // 2. Show Play Again button ... on click closes Modal,
      //    hides timer, shows start button, reset game word,
      //    new bowl, reset score, ??

      // let newScore = firebase.database().ref("scores").push();
      // window.newScore = newScore;
      // newScore.set({score: game.score});
      //
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
          // $(".scores").append($li.text(`${highscores[i].score}`));
          $(".usernames").append($li.text(`${highscores[i].username}`));
        }
        for (let i = 0; i < highscores.length; i++) {
          let $li = $('<li>');
          $(".scores").append($li.text(`${highscores[i].score}`));
          // $(".usernames").append($li.text(`${highscores[i].username}: `));
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
      }

      let minutes = parseInt(timer / 60, 10);
      let seconds = parseInt(timer % 60, 10);

      seconds = seconds < 10 ? "0" + seconds : seconds;

      game.currentTime = minutes + ":" + seconds;
    }, 1000);
  }

  const start = document.getElementById('start');
  const scoreWords = document.getElementById('score-words');
  start.addEventListener("click", (e) => {
    e.preventDefault();
    // start.style.display = "none";
    game.username = $(".username").val();
    instructions.style.display = "none";
    gameView.style.display = "block";
    scoreWords.style.display = "block";
    // document.getElementById('steam1').style.display = "block";
    // document.getElementById('steam2').style.display = "block";
    // document.getElementById('steam3').style.display = "block";
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
  // const play = document.getElementById('play');
  // play.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   instructions.style.display = "none";
  //   document.getElementById('timerCanvas').style.display = "none";
  //   start.style.display = "block";
  //   gameView.style.display = "block";
  // });

  const playAgain = document.getElementById('play-again');
  playAgain.addEventListener("click", (e) => {
    e.preventDefault();
    endGame.style.display = "none";
    $(".words-found li").remove();
    // document.getElementById('timerCanvas').style.display = "none";
    game.score = 0;
    scoreCtx.fillText(game.score, scoreCanvas.width/2, scoreCanvas.height/2 + 20);
    // game.validWords = [];
    game.currentTime = "1:00";
    start.style.display = "block";
    // document.getElementById('steam1').style.display = "none";
    // document.getElementById('steam2').style.display = "none";
    // document.getElementById('steam3').style.display = "none";
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
          game.float = 50;
          const feedback = ["GREAT", "AWESOME", "NICE", "SUPER"];
          game.feedback = feedback[Math.floor(Math.random() * 4)];
          let $li = $('<li>');
          $(".words-found").prepend($li.text(`${game.word.word}`));
          game.score += Word.SCORE[game.word.word.length];
          game.word.word = "";
          game.bowl.fill();
        } else {
          game.float = 50;
          game.feedback = "TRY AGAIN";
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

  const username = document.getElementById('username');
  const submitScore = document.getElementById('submit');
  submitScore.addEventListener("click", (e) => {
    e.preventDefault();
    // game.username = $("#submit").val();

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
        // $(".scores").append($li.text(`${highscores[i].score}`));
        $(".usernames").append($li.text(`${highscores[i].username}`));
      }
      for (let i = 0; i < highscores.length; i++) {
        let $li = $('<li>');
        $(".scores").append($li.text(`${highscores[i].score}`));
        // $(".usernames").append($li.text(`${highscores[i].username}: `));
      }
    });

    submitScore.style.visibility = "hidden";
    username.style.visibility = "hidden";

  });

  // let newScore = firebase.database().ref("scores").push();
  // window.newScore = newScore;
  // newScore.set({score: game.score});



  // step()
})


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Letter = __webpack_require__(3);

class Bowl {
  constructor() {
    this.letters = [
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      new Letter(Letter.VOWELS[Math.floor(Math.random() * Letter.VOWELS.length)])
    ];

    // this.letters = [Bowl.FREQ[Math.floor(Math.random() * Bowl.FREQ.length)],
    //   Bowl.FREQ[Math.floor(Math.random() * Bowl.FREQ.length)],
    //   Bowl.FREQ[Math.floor(Math.random() * Bowl.FREQ.length)],
    //   Bowl.FREQ[Math.floor(Math.random() * Bowl.FREQ.length)],
    //   Bowl.FREQ[Math.floor(Math.random() * Bowl.FREQ.length)],
    //   Bowl.VOWELS[Math.floor(Math.random() * Bowl.VOWELS.length)]
    // ];
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
          // return new Letter(true);
        } else {
          return new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]);
          // return new Letter(false);
        }
      } else {
        return letter;
      }
    });

    this.letters = newLetters;
  }

  // countVowels() {
  //   this.vowels = 0;
  //
  //   this.letters.forEach( letter => {
  //     if (Bowl.VOWELS.indexOf(letter) > -1) {
  //       this.vowels += 1;
  //     }
  //   });
  // }

  countVowels() {
    this.vowels = 0;

    this.letters.forEach( letter => {
      if (Letter.VOWELS.indexOf(letter.char) > -1) {
        this.vowels += 1;
      }
    });
  }

}
//
// Bowl.FREQ = [
//   "A", "A", "A", "A", "A",
//   "B", "B",
//   "C", "C",
//   "D", "D", "D", "D",
//   "E", "E", "E", "E", "E",
//   "F", "F",
//   "G", "G", "G",
//   "H", "H",
//   "I", "I", "I", "I",
//   "J",
//   "K",
//   "L", "L", "L", "L",
//   "M", "M",
//   "N", "N", "N", "N", "N", "N",
//   "O", "O", "O",
//   "P", "P",
//   "Q",
//   "R", "R", "R", "R", "R",
//   "S", "S", "S", "S",
//   "T", "T", "T", "T", "T",
//   "U", "U",
//   "V", "V",
//   "W", "W",
//   "X",
//   "Y",
//   "Z"
// ];
//
// Bowl.VOWELS = ["A", "E", "I", "O", "U"];

module.exports = Bowl;


/***/ }),
/* 2 */
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
  6: 10
}

module.exports = Word;


/***/ }),
/* 3 */
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
    // this.y += (this.posDir * offsetY);

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
/* 4 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map