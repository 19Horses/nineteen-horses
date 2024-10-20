import * as p from '@p5-wrapper/react';
import { asciiHorse } from './asciiHorse';

export const reveal = (p5: p.P5CanvasInstance) => {
  const charSize = 10;

  type AsciiChar = {
    char: string;
    xPos: number;
    yPos: number;
    fill: string;
  };

  let normalizedHorse: AsciiChar[] = [];

  p5.setup = () => {
    p5.frameRate(30);
    p5.createCanvas(innerWidth, innerHeight);
    p5.fill('black');

    normalizedHorse = resetHorsePos();
  };

  p5.windowResized = () => {
    resetHorsePos();
    p5.resizeCanvas(innerWidth, innerHeight);
  };

  p5.draw = () => {
    p5.fill('black');
    p5.background(0);
    p5.textSize(charSize);

    for (let i = 0; i < normalizedHorse.length; i++) {
      const { char, xPos, yPos, fill } = normalizedHorse[i];
      const d = p5.dist(xPos, yPos, p5.mouseX, p5.mouseY);
      if (d < 50) {
        normalizedHorse[i] = {
          char,
          xPos,
          yPos,
          fill: 'white',
        };
      }
      p5.fill(fill);
      p5.text(char === ' ' ? '-' : char, xPos, yPos);
    }
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
          fill: 'black',
        });
      }
    }
    return normalizedHorse;
  }
};
