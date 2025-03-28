import p5 from 'p5';
import { BoundingBox } from './Text';
import { isMobile } from 'react-device-detect';

function isRectOverlap(r1: BoundingBox, r2: BoundingBox) {
  if (
    r1.x + r1.w / 2 > r2.x - r2.w / 2 &&
    r1.x - r1.w / 2 < r2.x + r2.w / 2 &&
    r1.y + r1.h / 2 > r2.y - r2.h / 2 &&
    r1.y - r1.h / 2 < r2.y + r2.h / 2
  ) {
    return true;
  } else {
    return false;
  }
}

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
    const divider = isMobile ? 9 : 5;
    this.w = this.img.width / divider;
    this.h = this.img.height / divider;
  }

  updatePosition(
    existingHorses: Horse[],
    textBounds: BoundingBox,
    form: BoundingBox
  ) {
    const maxAttempts = 50;
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

      const imageBounds = {
        x: this.x,
        y: this.y,
        w: this.w,
        h: this.y,
      };
      if (isRectOverlap(imageBounds, form)) {
        overlapping = true;
      }

      if (isRectOverlap(imageBounds, textBounds)) {
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
