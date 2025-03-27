import p5 from 'p5';

export class Character {
  x;
  y;
  xSpd;
  ySpd;
  finalX;
  finalY;
  char;
  movingToFinal;
  isInFinalPos;
  falling;
  isDone;
  gravity;
  yVelocity;
  p5;

  constructor(
    x: number,
    y: number,
    xSpd: number,
    ySpd: number,
    finalX: number,
    finalY: number,
    char: string,
    p5: p5
  ) {
    this.x = x;
    this.y = y;
    this.xSpd = xSpd;
    this.ySpd = ySpd;
    this.finalX = finalX;
    this.finalY = finalY;
    this.char = char;
    this.movingToFinal = false;
    this.isInFinalPos = false;
    this.falling = false;
    this.isDone = false;
    this.gravity = p5.random(0.2, 0.5);
    this.yVelocity = 0;
    this.p5 = p5;
  }

  update() {
    if (this.isDone) {
      return;
    }
    if (this.falling) {
      this.yVelocity += this.gravity;
      this.y += this.yVelocity;

      if (this.y > this.p5.height + 30) {
        this.isDone = true;
      }
    } else if (this.movingToFinal) {
      this.x = this.p5.lerp(this.x, this.finalX, 0.04);
      this.y = this.p5.lerp(this.y, this.finalY, 0.04);

      if (this.p5.dist(this.x, this.y, this.finalX, this.finalY) < 1) {
        this.x = this.finalX;
        this.y = this.finalY;
        this.isInFinalPos = true;
      }
    } else {
      this.x += this.xSpd;
      this.y += this.ySpd;

      if (this.x <= 0 || this.x >= this.p5.width) this.xSpd *= -1;
      if (this.y <= 0 || this.y >= this.p5.height) this.ySpd *= -1;
    }
  }

  moveToFinalPosition() {
    this.movingToFinal = true;
  }

  display() {
    this.p5.text(this.char, this.x, this.y);
  }
}
