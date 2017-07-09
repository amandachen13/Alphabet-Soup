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
  "A", "A", "A", "A",
  "B", "B",
  "C", "C",
  "D", "D", "D", "D",
  "E", "E", "E", "E",
  "F", "F",
  "G", "G", "G",
  "H", "H",
  "I", "I", "I", "I",
  "J",
  "K",
  "L", "L", "L", "L",
  "M", "M",
  "N", "N", "N", "N", "N",
  "O", "O", "O",
  "P", "P",
  "Q",
  "R", "R", "R", "R", "R",
  "S", "S", "S", "S",
  "T", "T", "T", "T", "T",
  "U", "U",
  "V", "V",
  "W",
  "X",
  "Y",
  "Z"
];

Letter.VOWELS = ["A", "E", "I", "O", "U"];

module.exports = Letter;
