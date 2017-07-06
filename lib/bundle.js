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

document.addEventListener("DOMContentLoaded", () => {
  // const bowlCanvas = document.getElementById('bowlCanvas');
  // const bowlCtx = bowlCanvas.getContext('2d');
  // bowlCtx.font = "40px Arial";
  // bowlCtx.textAlign = "center";
  // bowlCtx.globalCompositeOperation = "copy";

  const wordCanvas = document.getElementById('wordCanvas');
  const wordCtx = wordCanvas.getContext('2d');
  wordCtx.font = "30px Arial";
  wordCtx.textAlign = "center";
  wordCtx.globalCompositeOperation = "copy";

  const scoreCanvas = document.getElementById('scoreCanvas');
  const scoreCtx = scoreCanvas.getContext('2d');
  scoreCtx.font = "20px Arial";
  scoreCtx.textAlign = "center";
  scoreCtx.globalCompositeOperation = "copy";

  const game = {
    bowl: new Bowl(),
    word: new Word(),
    wordCtx,
    scoreCtx,
    score: 0,
    validWords: [],
    render: function() {
      this.wordCtx.strokeText(game.word.word, wordCanvas.width/2, wordCanvas.height/2);
      this.scoreCtx.fillText(game.score, scoreCanvas.width/2, scoreCanvas.height/2)
      // game.bowl.fill();
      game.bowl.letters.forEach( (letter, idx) => {
        const bowlCanvas = document.getElementById(idx);
        const bowlCtx = bowlCanvas.getContext('2d');
        bowlCtx.font = "40px Arial";
        bowlCtx.textAlign = "center";
        bowlCtx.globalCompositeOperation = "copy";
        bowlCtx.strokeText(letter, 100, 90);
      });
    }
  }
  function step() {
    game.render()
    requestAnimationFrame(step)
  }
  document.addEventListener("keydown", (e) => {
    if(Word.KEYS[e.keyCode]) {
      if (game.word.word.length < 6) {
        let idx = (game.bowl.letters.indexOf(Word.KEYS[e.keyCode]));
        if (idx > -1) {
          game.bowl.letters[idx] = "";
          game.word.word += Word.KEYS[e.keyCode];
        }
      }
    }
    // }
    switch (e.keyCode) {
      case 8:
        let last = game.word.word.substr(-1);
        // PUT LAST LETTER BACK INTO BOWL
        let emptyIdx = game.bowl.letters.indexOf("");
        game.bowl.letters[emptyIdx] = last;
        game.word.word = game.word.word.slice(0, -1);
        break
      case 13:
        if (game.word.isValid()) {
          game.validWords.push(game.word.word);
          game.score += Word.SCORE[game.word.word.length];
          game.word.word = "";
          game.bowl.fill();
        } else {
          for(let i = 0; i < game.word.word.length; i++) {
            let emptyIdx = game.bowl.letters.indexOf("");
            game.bowl.letters[emptyIdx] = game.word.word[i];
          }
          game.word.word = "";
        }
        break
    //   //   if (_____.indexOf(' ' + game.word + ' ') > -1) {
    //   //     alert("valid");
    //   //   } else {
    //   //     alert("not valid");
    //   //   }
    //   //   break
      default:
        console.log('this is not the key you are looking for')
    }
  })
 step()
})


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Bowl {
  constructor() {
    this.letters = [Bowl.FREQ[Math.floor(Math.random() * Bowl.FREQ.length)],
      Bowl.FREQ[Math.floor(Math.random() * Bowl.FREQ.length)],
      Bowl.FREQ[Math.floor(Math.random() * Bowl.FREQ.length)],
      Bowl.FREQ[Math.floor(Math.random() * Bowl.FREQ.length)],
      Bowl.FREQ[Math.floor(Math.random() * Bowl.FREQ.length)],
      Bowl.VOWELS[Math.floor(Math.random() * Bowl.VOWELS.length)]
    ];
  }

  fill() {
    // CHECK IF ALL OTHER LETTERS ARE CONSONANTS?
    const newLetters = this.letters.map( letter => {
      if (letter === "") {
        let randomIdx = Math.floor(Math.random() * Bowl.FREQ.length);
        return Bowl.FREQ[randomIdx];
      } else {
        return letter;
      }""
    });

    this.letters = newLetters;
  }




}

Bowl.FREQ = [
  "A", "A", "A", "A", "A",
  "B", "B",
  "C", "C",
  "D", "D", "D", "D",
  "E", "E", "E", "E", "E",
  "F", "F",
  "G", "G", "G",
  "H", "H",
  "I", "I", "I", "I",
  "J",
  "K",
  "L", "L", "L", "L",
  "M", "M",
  "N", "N", "N", "N", "N", "N",
  "O", "O", "O",
  "P", "P",
  "Q",
  "R", "R", "R", "R", "R",
  "S", "S", "S", "S",
  "T", "T", "T", "T", "T",
  "U", "U",
  "V", "V",
  "W", "W",
  "X",
  "Y", "Y",
  "Z"
];

Bowl.VOWELS = ["A", "E", "I", "O", "U"];

module.exports = Bowl;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Word {
  constructor() {
    this.word = "";
  }

  isValid() {
    // if word is in dictionary return true
    // otherwise return false
    return true;
    //
    // fs.readFile('./../assets/dictionary.text', function(err, data) {
    //   if(err) throw err;
    //   if(data.indexOf(" " + this.word + " ") > -1) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map