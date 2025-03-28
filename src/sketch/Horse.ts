import p5 from 'p5';
import { TextBounds } from './Text';

export class Horse {
  src: string;
  p5: p5;
  img: p5.Image;
  index: number;

  isDone = false;
  x = 0;
  y = 0;
  w = 0;
  h = 0;

  constructor(src: string, p5: p5, i: number) {
    this.src = src;
    this.p5 = p5;
    this.img = this.#loadImage();
    this.index = i;
  }

  updateSize() {
    this.w = this.img.width / 5;
    this.h = this.img.height / 5;
  }

  updatePosition(existingHorses: Horse[], textBounds: TextBounds) {
    const maxAttempts = 20;
    let attempt = 0;
    let overlapping = true;

    while (overlapping && attempt < maxAttempts) {
      this.x = this.p5.random(this.w / 2, this.p5.width - this.w / 2);
      this.y = this.p5.random(this.h / 2, this.p5.height - this.h / 2);
      overlapping = existingHorses.some(
        (other) =>
          other !== this &&
          this.p5.dist(this.x, this.y, other.x, other.y) <
            (this.w + other.w) / 2
      );

      const inTextBounds =
        this.x + this.w / 2 > textBounds.x &&
        this.x - this.w / 2 < textBounds.x + textBounds.w &&
        this.y + this.h / 2 > textBounds.y &&
        this.y - this.h / 2 < textBounds.y + textBounds.h;

      if (inTextBounds) {
        overlapping = true;
      }

      attempt++;
    }
  }

  #loadImage() {
    return this.p5.loadImage(this.src);
  }

  draw() {
    if (this.p5.millis() > 75 * this.index) {
      this.p5.image(this.img, this.x, this.y, this.w, this.h);
      this.isDone = true;
    }
  }
}
