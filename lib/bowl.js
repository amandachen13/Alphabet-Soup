const Letter = require('./letter');

class Bowl {
  constructor() {
    this.letters = [
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      new Letter(Letter.FREQ[Math.floor(Math.random() * Letter.FREQ.length)]),
      new Letter(Letter.VOWELS[Math.floor(Math.random() * Letter.VOWELS.length)])
      // new Letter("A")
    ];

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
