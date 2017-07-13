const Letter = require('./letter');

class Bowl {
  constructor() {
    this.letters = [
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      // new Letter(Letter.VOWELS[Math.floor(Math.random() * Letter.VOWELS.length)])
      new Letter("A")
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
