import p5 from 'p5';
import { asciiHorse } from './asciiHorse';
import monoRegular from './fonts/mono.ttf';
import { Character } from './charatcer';

export const floatingAround = (p5: p5) => {
  let normalizedHorse: Character[] = [];
  let font: p5.Font;

  p5.preload = () => {
    font = p5.loadFont(monoRegular);
  };

  let textPoints: Character[];

  p5.setup = () => {
    p5.frameRate(30);
    p5.createCanvas(innerWidth, innerHeight);
    p5.textSize(10);
    p5.textFont(font);
    p5.fill('white');
    p5.textAlign(p5.CENTER, p5.CENTER);
    normalizedHorse = resetHorsePos();
    p5.push();
    p5.textSize(16);
    textPoints = font
      .textToPoints(
        '19 Horses',
        p5.width / 2 - p5.textWidth('19 Horses') / 2,
        150,
        16,
        {
          sampleFactor: 1,
        }
      )
      .map((p) => {
        return new Character(
          p5.random(p5.width),
          p5.random(p5.height),
          p5.random(-1, 1),
          p5.random(-1, 1),
          p.x,
          p.y,
          '.',
          p5
        );
      });
    p5.pop();
  };

  p5.windowResized = () => {
    resetHorsePos();
    p5.resizeCanvas(innerWidth, innerHeight);
  };

  p5.draw = () => {
    p5.background(0);

    const finishedChars = normalizedHorse.filter((c) => c.isInFinalPos);
    normalizedHorse.forEach((c) => {
      if (finishedChars.length === normalizedHorse.length) {
        c.falling = true;
      }
      c.update();
      c.display();
    });
    textPoints.forEach((p) => {
      p.update();
      p.display();
    });
  };

  p5.mousePressed = () => {
    normalizedHorse.forEach((c) => {
      c.moveToFinalPosition();
    });

    textPoints.forEach((c) => {
      c.moveToFinalPosition();
    });
  };

  function resetHorsePos() {
    const charSize = 10;
    const xOffset = p5.width / 2 - (asciiHorse[0].length * charSize) / 2;
    const yOffset = p5.height / 2 - (asciiHorse.length * charSize) / 2;
    normalizedHorse = [];
    for (let y = 0; y < asciiHorse.length; y++) {
      const asciiRow = asciiHorse[y];

      for (let x = 0; x < asciiRow.length; x++) {
        const char = asciiRow[x];
        const finalXPos = x * charSize + xOffset - x;
        const finalYPos = y * charSize + yOffset + y * 2;
        const xPos = p5.random(p5.width);
        const yPos = p5.random(p5.height);
        const xSpd = p5.random(-1, 1);
        const ySpd = p5.random(-1, 1);
        normalizedHorse.push(
          new Character(xPos, yPos, xSpd, ySpd, finalXPos, finalYPos, char, p5)
        );
      }
    }
    return normalizedHorse;
  }
};
