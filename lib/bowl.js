const Letter = require('./letter');

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
    const num_vowels = this.countVowels();

    const newLetters = this.letters.map( letter => {
      if (letter === "") {
        if (num_vowels < 2) {
          return new Letter(Letter.VOWELS[Math.floor(Math.random() * Letter.VOWELS.length)]);
          num_vowels += 1;
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
    const num_vowels = 0;

    this.letters.forEach( letter => {
      if (Letter.VOWELS.indexOf(letter.char) > -1) {
        num_vowels += 1;
      }
    });

    return num_vowels;
  }

}

module.exports = Bowl;
