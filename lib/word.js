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