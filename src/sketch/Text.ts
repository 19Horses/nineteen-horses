import p5 from 'p5';

export type TextBounds = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export class Text {
  pos: { x: number; y: number };
  p5: p5;

  textBounds: TextBounds;

  constructor(p5: p5) {
    this.p5 = p5;
    this.pos = this.#getPosition();
    this.textBounds = this.#getBoundingBox();
  }

  draw(num: number) {
    this.p5.push();
    this.p5.fill('white');
    const content = `${num} Horses`;

    this.p5.text(content, this.pos.x, this.pos.y);
    this.p5.pop();
  }

  #getPosition() {
    const content = '19 Horses';
    const margin = 10;

    const x = this.p5.width - this.p5.textWidth(content) / 2 - margin;
    const y = this.p5.textSize() / 2 + margin;

    return { x, y };
  }

  #getBoundingBox() {
    const currentFont = this.p5.textFont() as p5.Font;
    return currentFont.textBounds(
      '19 Horses',
      this.pos.x,
      this.pos.y
    ) as TextBounds;
  }
}
