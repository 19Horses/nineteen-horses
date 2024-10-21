import * as p from '@p5-wrapper/react';
import { asciiHorse } from './asciiHorse';
import monoRegular from './fonts/mono.ttf';

export const sketch = (p5: p.P5CanvasInstance) => {
  const attract = [true, false][Math.floor(Math.random() * 2)];
  const charSize = 10;

  let isMouseOnCanvas = false;

  type AsciiChar = {
    char: string;
    xPos: number;
    yPos: number;
    shouldDraw: boolean;
  };

  let normalizedHorse: AsciiChar[] = [];
  let font: any;

  p5.preload = () => {
    font = p5.loadFont(monoRegular);
  };

  p5.setup = () => {
    p5.frameRate(30);
    const canvas = p5.createCanvas(innerWidth, innerHeight);

    canvas.mouseOver(overCanvas);
    canvas.mouseOut(outCanvas);

    p5.textFont(font);
    p5.fill('white');

    normalizedHorse = resetHorsePos();
  };

  p5.windowResized = () => {
    console.log('hey');
    resetHorsePos();
    p5.resizeCanvas(innerWidth, innerHeight);
  };

  p5.draw = () => {
    p5.background(0);
    p5.textSize(charSize);

    for (let i = 0; i < normalizedHorse.length; i++) {
      const { char, shouldDraw } = normalizedHorse[i];
      let { xPos, yPos } = normalizedHorse[i];

      if (!shouldDraw) {
        continue;
      }

      if (isMouseOnCanvas) {
        const m = p5.createVector(xPos - p5.mouseX, yPos - p5.mouseY);
        const distance = p5.max(p5.dist(xPos, yPos, p5.mouseX, p5.mouseY), 1);
        m.normalize();

        const s = 250 / distance;
        xPos = attract ? xPos - m.x * s : xPos + m.x * s;
        yPos = attract ? yPos - m.y * s : yPos + m.y * s;

        normalizedHorse[i] = {
          char,
          xPos,
          yPos,
          shouldDraw: distance < 30 ? false : true,
        };
      }

      if (shouldDraw) {
        p5.text(char === ' ' ? '-' : char, xPos, yPos);
      }
    }

    p5.textSize(16);
    p5.text(
      '19 Horses',
      innerWidth / 2 - (asciiHorse[0].length * charSize) / 2,
      innerHeight / 2 - (asciiHorse.length * charSize) / 2 - 20
    );
  };

  function resetHorsePos() {
    const xOffset = innerWidth / 2 - (asciiHorse[0].length * charSize) / 2;
    const yOffset = innerHeight / 2 - (asciiHorse.length * charSize) / 2;
    normalizedHorse = [];
    for (let y = 0; y < asciiHorse.length; y++) {
      const asciiRow = asciiHorse[y];

      for (let x = 0; x < asciiRow.length; x++) {
        const char = asciiRow[x];
        const xPos = x * charSize + xOffset - x;
        const yPos = y * charSize + yOffset + y * 2;
        normalizedHorse.push({
          char,
          xPos,
          yPos,
          shouldDraw: true,
        });
      }
    }
    return normalizedHorse;
  }

  function overCanvas() {
    isMouseOnCanvas = true;
  }

  function outCanvas() {
    isMouseOnCanvas = false;
  }
};
