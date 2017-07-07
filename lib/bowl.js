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
    this.countVowels();

    const newLetters = this.letters.map( letter => {
      if (letter === "") {
        if (this.vowels < 2) {
          this.vowels += 1;
          return Bowl.VOWELS[Math.floor(Math.random() * Bowl.VOWELS.length)];
        } else {
          return Bowl.FREQ[Math.floor(Math.random() * Bowl.FREQ.length)];
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
      if (Bowl.VOWELS.indexOf(letter) > -1) {
        this.vowels += 1;
      }
    });
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
  "Y",
  "Z"
];

Bowl.VOWELS = ["A", "E", "I", "O", "U"];

module.exports = Bowl;
